export interface LeetCodeStats {
    totalSolved: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    ranking?: number;
}

export const fetchLeetCodeStats = async (username: string): Promise<LeetCodeStats | null> => {
    try {
        // Try Primary API (alfa-leetcode-api)
        // using the /solved endpoint which is more reliable
        const response = await fetch(`https://alfa-leetcode-api.onrender.com/${username}/solved`);
        const data = await response.json();

        if (response.ok && data.solvedProblem !== undefined) {
            return {
                totalSolved: data.solvedProblem,
                easySolved: data.easySolved,
                mediumSolved: data.mediumSolved,
                hardSolved: data.hardSolved,
                ranking: 0 // Optional, not usually in the /solved endpoint
            };
        }
    } catch (error) {
        console.warn('Primary (Alfa) LeetCode API failed, trying backup...', error);
    }

    // Backup API: leetcode-stats-api.herokuapp.com
    try {
        const backupResponse = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
        const backupData = await backupResponse.json();

        if (backupResponse.ok && backupData.status === 'success') {
            return {
                totalSolved: backupData.totalSolved,
                easySolved: backupData.easySolved,
                mediumSolved: backupData.mediumSolved,
                hardSolved: backupData.hardSolved,
                ranking: backupData.ranking
            };
        }
    } catch (e) {
        console.error('All LeetCode APIs failed', e);
    }

    return null;
};
