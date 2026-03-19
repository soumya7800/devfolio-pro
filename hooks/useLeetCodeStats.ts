import { useState, useEffect } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// useLeetCodeStats — The ULTIMATE fix (Direct GraphQL via Vercel Serverless)
//
// Previous attempts used third-party proxy APIs (alfa-api, leetcode-stats-api).
// These fail due to rate limits (429), cold starts, or aggressive caching.
//
// THIS implementation uses the native Vercel `/api/leetcode.js` function
// already in the project. It talks DIRECTLY to LeetCode's official GraphQL
// endpoint, meaning ZERO rate limits from proxies, and ZERO cache delay.
// ─────────────────────────────────────────────────────────────────────────────

const CACHE_KEY = 'lc_v5_';
const CACHE_TTL = 2 * 60 * 1000;   // 2 minutes — super fresh
const TIMEOUT_MS = 15_000;         // Very fast since it's direct

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
    return JSON.parse(raw) as LCStats; // return even if stale for instant UI
  } catch { return null; }
}

function writeCache(username: string, s: LCStats) {
  try { localStorage.setItem(CACHE_KEY + username, JSON.stringify(s)); }
  catch { /* quota — no‑op */ }
}

// ── native fetch ──────────────────────────────────────────────────────────
async function fetchNativeGraphQL(username: string): Promise<LCStats | null> {
  // Use relative path in prod, but fallback to absolute prod URL for local dev
  const isLocal = window.location.hostname.includes('localhost') || window.location.hostname.includes('127.0.0.1');
  const baseUrl = isLocal ? 'https://devfolio-pro-lilac.vercel.app' : '';
  const url = `${baseUrl}/api/leetcode?username=${username}`;

  const ctrl = new AbortController();
  const tid = setTimeout(() => ctrl.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(url, { signal: ctrl.signal });
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
  } finally {
    clearTimeout(tid);
  }
}

// ── hook ──────────────────────────────────────────────────────────────────
export function useLeetCodeStats(username: string): UseLCResult {
  const [stats, setStats] = useState<LCStats | null>(() => readCache(username));
  const [state, setState] = useState<LoadState>('loading');

  useEffect(() => {
    if (!username) return;

    // Show cached immediately
    const cached = readCache(username);
    if (cached) setStats(cached);

    // ALWAYS fetch fresh bypassing cache logic
    setState('loading');
    let cancelled = false;

    fetchNativeGraphQL(username).then(result => {
      if (cancelled) return;
      if (result) {
        writeCache(username, result);
        setStats(result);
        setState('done');
      } else {
        // Only mark error if we really couldn't get it
        setState('error');
      }
    });

    return () => { cancelled = true; };
  }, [username]);

  return { stats, state };
}
