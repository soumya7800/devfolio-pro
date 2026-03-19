import { useState, useEffect, useRef } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// useLeetCodeStats — Permanent, bullet-proof LeetCode stats fetcher
//
// The API (alfa-leetcode-api on Render free tier) can take 50-60 seconds to
// wake up from sleep. This hook handles that gracefully:
//  1. Serves from localStorage cache INSTANTLY (< 1ms) if data is fresh
//  2. Fetches fresh data in the background (shows "Waking up..." if slow)
//  3. 60-second timeout to handle Render cold starts
//  4. Caches successful response for 30 minutes
//  5. Falls back to last known cache if fetch fails
//  6. Never shows stale "Loading data..." permanently
// ─────────────────────────────────────────────────────────────────────────────

const CACHE_KEY_PREFIX = 'lc_v3_';
const CACHE_TTL = 30 * 60 * 1000;      // 30 minutes
const FETCH_TIMEOUT = 65_000;           // 65 seconds — covers Render cold start

export interface LCStats {
  solved: number;
  easy:   number;
  medium: number;
  hard:   number;
  ts:     number;         // when fetched
}

// ── localStorage helpers ──────────────────────────────────────────────────
function readCache(username: string): LCStats | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY_PREFIX + username);
    if (!raw) return null;
    const s = JSON.parse(raw) as LCStats;
    return Date.now() - s.ts < CACHE_TTL ? s : null;  // null = stale
  } catch { return null; }
}

function readStaleCache(username: string): LCStats | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY_PREFIX + username);
    return raw ? (JSON.parse(raw) as LCStats) : null;
  } catch { return null; }
}

function writeCache(username: string, s: LCStats) {
  try { localStorage.setItem(CACHE_KEY_PREFIX + username, JSON.stringify(s)); }
  catch { /* quota exceeded — no-op */ }
}

// ── fetch with timeout ────────────────────────────────────────────────────
async function fetchWithTimeout(url: string, ms: number): Promise<Response> {
  const ctrl = new AbortController();
  const tid = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(url, { signal: ctrl.signal });
    return res;
  } finally {
    clearTimeout(tid);
  }
}

// ── actual fetch from alfa-leetcode-api ───────────────────────────────────
async function fetchLCStats(username: string): Promise<LCStats | null> {
  try {
    const res = await fetchWithTimeout(
      `https://alfa-leetcode-api.onrender.com/${username}/solved`,
      FETCH_TIMEOUT
    );
    if (!res.ok) return null;
    const data = await res.json();

    const solved = data?.solvedProblem ?? data?.acSubmissionNum?.[0]?.count;
    if (solved == null) return null;

    // Try to parse easy/medium/hard from acSubmissionNum array
    const ac: Array<{ difficulty: string; count: number }> = data.acSubmissionNum ?? [];
    const get = (d: string) => ac.find(x => x.difficulty === d)?.count ?? 0;

    return {
      solved,
      easy:   data.easySolved   ?? get('Easy'),
      medium: data.mediumSolved ?? get('Medium'),
      hard:   data.hardSolved   ?? get('Hard'),
      ts:     Date.now(),
    };
  } catch {
    return null;
  }
}

// ── hook ──────────────────────────────────────────────────────────────────
export type LoadState = 'fresh' | 'fetching' | 'waking' | 'done' | 'error';

export interface UseLCResult {
  stats:    LCStats | null;
  state:    LoadState;
}

export function useLeetCodeStats(username: string): UseLCResult {
  const [stats, setStats] = useState<LCStats | null>(() => readCache(username) ?? readStaleCache(username));
  const [state, setState] = useState<LoadState>(() => readCache(username) ? 'fresh' : 'fetching');
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (!username) return;

    const fresh = readCache(username);
    if (fresh) {
      setStats(fresh);
      setState('fresh');
      // Still refresh silently in background after 2s
      const t = setTimeout(() => {
        fetchLCStats(username).then(result => {
          if (result) { writeCache(username, result); setStats(result); }
        });
      }, 2000);
      return () => clearTimeout(t);
    }

    // No fresh cache — fetch now
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    setStats(readStaleCache(username));  // show stale immediately if available
    setState('fetching');

    // After 8 seconds without a response, warn user it's waking up
    const wakeTimer = setTimeout(() => setState('waking'), 8000);

    fetchLCStats(username).then(result => {
      clearTimeout(wakeTimer);
      if (result) {
        writeCache(username, result);
        setStats(result);
        setState('done');
      } else {
        setState('error');
      }
    });

    return () => clearTimeout(wakeTimer);
  }, [username]);

  return { stats, state };
}
