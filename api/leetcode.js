export default async function handler(req, res) {
    const { username } = req.query;

    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }

    const query = `
    query userProblemsSolved($username: String!) {
      allQuestionsCount {
        difficulty
        count
      }
      matchedUser(username: $username) {
        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
      }
    }
  `;

    try {
        const response = await fetch('https://leetcode.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Referer': 'https://leetcode.com',
            },
            body: JSON.stringify({
                query,
                variables: { username },
            }),
        });

        const result = await response.json();

        if (result.errors) {
            return res.status(500).json({ error: result.errors[0].message });
        }

        const stats = result.data.matchedUser.submitStatsGlobal.acSubmissionNum;
        const totalSolved = stats.find(s => s.difficulty === 'All').count;
        const easySolved = stats.find(s => s.difficulty === 'Easy').count;
        const mediumSolved = stats.find(s => s.difficulty === 'Medium').count;
        const hardSolved = stats.find(s => s.difficulty === 'Hard').count;

        // Set Cache-Control to ensure real-time data on Vercel
        res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
        
        // Setup CORS so localhost development can access it
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
        res.setHeader(
            'Access-Control-Allow-Headers',
            'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
        );

        if (req.method === 'OPTIONS') {
            return res.status(200).end();
        }

        return res.status(200).json({
            status: 'success',
            totalSolved,
            easySolved,
            mediumSolved,
            hardSolved
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
