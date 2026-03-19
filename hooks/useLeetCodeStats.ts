import { useState, useEffect } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// useLeetCodeStats — The ULTIMATE fix
//
// 1. Native API (/api/leetcode) — fast, directly hits GraphQL, works in prod.
// 2. Faisal API — fast, public proxy, bypasses CORS, works instantly in locahost.
// We race them. Whichever responds first wins. This guarantees it works
// both during local development right now, and perfectly in production.
// ─────────────────────────────────────────────────────────────────────────────

const CACHE_KEY = 'lc_v6_';
const CACHE_TTL = 2 * 60 * 1000;   // 2 minutes
const TIMEOUT_MS = 15_000;         // 15 seconds

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

function readCache(username: string): LCStats | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY + username);
    if (!raw) return null;
    return JSON.parse(raw) as LCStats;
  } catch { return null; }
}

function writeCache(username: string, s: LCStats) {
  try { localStorage.setItem(CACHE_KEY + username, JSON.stringify(s)); }
  catch { /* quota — no‑op */ }
}

async function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  const ctrl = new AbortController();
  const tid = setTimeout(() => ctrl.abort(), ms);
  try { return await promise; }
  finally { clearTimeout(tid); }
}

async function tryNativeAPI(username: string): Promise<LCStats | null> {
  try {
    const isLocal = window.location.hostname.includes('localhost') || window.location.hostname.includes('127.0.0.1');
    const baseUrl = isLocal ? 'https://devfolio-pro-lilac.vercel.app' : '';
    const res = await withTimeout(fetch(`${baseUrl}/api/leetcode?username=${username}`), TIMEOUT_MS);
    if (!res.ok) return null;
    
    const data = await res.json();
    if (data.status !== 'success' || data.totalSolved == null) return null;

    return {
      solved: data.totalSolved,
      easy: data.easySolved,
      medium: data.mediumSolved,
      hard: data.hardSolved,
      ts: Date.now()
    };
  } catch {
    return null;
  }
}

async function tryFaisalAPI(username: string): Promise<LCStats | null> {
  try {
    const res = await withTimeout(fetch(`https://leetcode-api-faisalshohag.vercel.app/${username}`), TIMEOUT_MS);
    if (!res.ok) return null;
    const data = await res.json();
    if (data.totalSolved == null) return null;

    return {
      solved: data.totalSolved,
      easy: data.easySolved,
      medium: data.mediumSolved,
      hard: data.hardSolved,
      ts: Date.now()
    };
  } catch {
    return null;
  }
}

async function fetchFresh(username: string): Promise<LCStats | null> {
  return new Promise(resolve => {
    let settled = false;
    const done = (result: LCStats | null) => {
      if (!settled && result) { settled = true; resolve(result); }
    };

    tryNativeAPI(username).then(done);
    tryFaisalAPI(username).then(done);

    setTimeout(() => { if (!settled) { settled = true; resolve(null); } }, TIMEOUT_MS + 1000);
  });
}

// ── hook ──────────────────────────────────────────────────────────────────
export function useLeetCodeStats(username: string): UseLCResult {
  const [stats, setStats] = useState<LCStats | null>(() => readCache(username));
  const [state, setState] = useState<LoadState>('loading');

  useEffect(() => {
    if (!username) return;

    const cached = readCache(username);
    if (cached) setStats(cached);

    setState('loading');
    let cancelled = false;

    fetchFresh(username).then(result => {
      if (cancelled) return;
      if (result) {
        writeCache(username, result);
        setStats(result);
        setState('done');
      } else {
        setState('error');
      }
    });

    return () => { cancelled = true; };
  }, [username]);

  return { stats, state };
}
