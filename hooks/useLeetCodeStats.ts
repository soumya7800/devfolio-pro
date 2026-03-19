import { useState, useEffect } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// useLeetCodeStats — Always-fresh LeetCode stats
//
// Strategy:
//  1. Immediately show last cached value (instant UI)
//  2. ALWAYS fetch fresh data on every mount — no "skip if cached"
//  3. When fresh data arrives → update state + cache
//  4. Cache TTL is only 5 minutes (avoid hammering, but stays current)
//  5. On fetch failure → state = 'error' but still shows last known value
//  6. Uses allorigins.win proxy to bypass CORS on alfa-leetcode-api
// ─────────────────────────────────────────────────────────────────────────────

const CACHE_KEY = 'lc_v4_';
const CACHE_TTL = 5 * 60 * 1000;   // 5 minutes — keeps data fresh
const TIMEOUT_MS = 25_000;          // 25s per attempt

export interface LCStats {
  solved: number;
  easy:   number;
  medium: number;
  hard:   number;
  ts:     number;
}

export type LoadState = 'loading' | 'done' | 'error';

export interface UseLCResult {
  stats:  LCStats | null;
  state:  LoadState;
}

// ── cache helpers ─────────────────────────────────────────────────────────
function readCache(username: string): LCStats | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY + username);
    if (!raw) return null;
    return JSON.parse(raw) as LCStats;          // return even if stale — for instant display
  } catch { return null; }
}

function writeCache(username: string, s: LCStats) {
  try { localStorage.setItem(CACHE_KEY + username, JSON.stringify(s)); }
  catch { /* quota — no‑op */ }
}

function clearCache(username: string) {
  try { localStorage.removeItem(CACHE_KEY + username); }
  catch { /* no‑op */ }
}

// ── fetch helpers ─────────────────────────────────────────────────────────
async function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  const ctrl = new AbortController();
  const tid = setTimeout(() => ctrl.abort(), ms);
  try { return await promise; }
  finally { clearTimeout(tid); }
}

async function tryAlfaApi(username: string): Promise<LCStats | null> {
  try {
    const res = await withTimeout(
      fetch(`https://alfa-leetcode-api.onrender.com/${username}/solved`),
      TIMEOUT_MS
    );
    if (!res.ok) return null;
    const d = await res.json();
    const solved = d?.solvedProblem ?? null;
    if (solved == null) return null;
    const ac: { difficulty: string; count: number }[] = d.acSubmissionNum ?? [];
    const g = (diff: string) => ac.find(x => x.difficulty === diff)?.count ?? 0;
    return { solved, easy: d.easySolved ?? g('Easy'), medium: d.mediumSolved ?? g('Medium'), hard: d.hardSolved ?? g('Hard'), ts: Date.now() };
  } catch { return null; }
}

async function tryAllOriginsProxy(username: string): Promise<LCStats | null> {
  try {
    const target = encodeURIComponent(`https://alfa-leetcode-api.onrender.com/${username}/solved`);
    const res = await withTimeout(
      fetch(`https://api.allorigins.win/get?url=${target}`),
      TIMEOUT_MS
    );
    if (!res.ok) return null;
    const wrapper = await res.json();
    const d = JSON.parse(wrapper.contents ?? '{}');
    const solved = d?.solvedProblem ?? null;
    if (solved == null) return null;
    const ac: { difficulty: string; count: number }[] = d.acSubmissionNum ?? [];
    const g = (diff: string) => ac.find(x => x.difficulty === diff)?.count ?? 0;
    return { solved, easy: d.easySolved ?? g('Easy'), medium: d.mediumSolved ?? g('Medium'), hard: d.hardSolved ?? g('Hard'), ts: Date.now() };
  } catch { return null; }
}

async function tryLeetcodeStatsApi(username: string): Promise<LCStats | null> {
  try {
    const res = await withTimeout(
      fetch(`https://leetcode-stats-api.herokuapp.com/${username}`),
      TIMEOUT_MS
    );
    if (!res.ok) return null;
    const d = await res.json();
    if (!d?.totalSolved) return null;
    return { solved: d.totalSolved, easy: d.easySolved ?? 0, medium: d.mediumSolved ?? 0, hard: d.hardSolved ?? 0, ts: Date.now() };
  } catch { return null; }
}

// ── main fetch: race all three sources ───────────────────────────────────
async function fetchFresh(username: string): Promise<LCStats | null> {
  // Race all three — use whichever comes back first with valid data
  return new Promise(resolve => {
    let settled = false;
    const done = (result: LCStats | null) => {
      if (!settled && result) { settled = true; resolve(result); }
    };

    tryAlfaApi(username).then(done);
    tryAllOriginsProxy(username).then(done);
    tryLeetcodeStatsApi(username).then(done);

    // If ALL fail after TIMEOUT_MS + 1s buffer, resolve with null
    setTimeout(() => { if (!settled) { settled = true; resolve(null); } }, TIMEOUT_MS + 1000);
  });
}

// ── hook ──────────────────────────────────────────────────────────────────
export function useLeetCodeStats(username: string): UseLCResult {
  const [stats, setStats] = useState<LCStats | null>(() => readCache(username));
  const [state, setState] = useState<LoadState>('loading');

  useEffect(() => {
    if (!username) return;

    // Show cached value instantly while fetching
    const cached = readCache(username);
    if (cached) setStats(cached);

    // ALWAYS fetch fresh — never skip
    setState('loading');
    let cancelled = false;

    fetchFresh(username).then(result => {
      if (cancelled) return;
      if (result) {
        // Got fresh data — update immediately
        writeCache(username, result);
        setStats(result);
        setState('done');
      } else {
        // All failed — keep showing last cached, mark error
        clearCache(username);   // clear so next reload tries fresh
        setState('error');
      }
    });

    return () => { cancelled = true; };
  }, [username]);

  return { stats, state };
}
