export interface LeetCodeStats {
    totalSolved: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    ranking?: number;
}

export const fetchLeetCodeStats = async (username: string): Promise<LeetCodeStats | null> => {
    // 1. Try Local Serverless Function first (Optimized for Vercel deployment)
    try {
        const localResponse = await fetch(`/api/leetcode?username=${username}`);
        if (localResponse.ok) {
            const data = await localResponse.json();
            if (data.status === 'success') {
                return {
                    totalSolved: data.totalSolved,
                    easySolved: data.easySolved,
                    mediumSolved: data.mediumSolved,
                    hardSolved: data.hardSolved,
                    ranking: 0
                };
            }
        }
    } catch (e) {
        // Fall through to public proxies if local API isn't available (e.g. local dev)
    }

    // 2. Fallback: Array of Public LeetCode API endpoints
    const endpoints = [
        `https://alfa-leetcode-api.onrender.com/${username}/solved`,
        `https://leetcode-api-faisalshohag.vercel.app/${username}`,
        `https://leetcode-stats-api.herokuapp.com/${username}`
    ];

    const fetchEndpoint = async (url: string): Promise<LeetCodeStats> => {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed with status: ${response.status}`);
        }
        const data = await response.json();

        // Check if data is from alfa-leetcode-api (/solved)
        if (data.solvedProblem !== undefined) {
            return {
                totalSolved: data.solvedProblem,
                easySolved: data.easySolved,
                mediumSolved: data.mediumSolved,
                hardSolved: data.hardSolved,
                ranking: 0
            };
        }

        // Check if data is from leetcode-stats-api or leetcode-api-faisalshohag
        if (data.status === 'success' || data.totalSolved !== undefined) {
            return {
                totalSolved: data.totalSolved,
                easySolved: data.easySolved,
                mediumSolved: data.mediumSolved,
                hardSolved: data.hardSolved,
                ranking: data.ranking || 0
            };
        }

        throw new Error('Invalid data format');
    };

    try {
        // Use Promise.any to return the first successful promise
        return await Promise.any(endpoints.map(fetchEndpoint));
    } catch (error) {
        console.error('All LeetCode APIs failed:', error);
        return null;
    }
};
