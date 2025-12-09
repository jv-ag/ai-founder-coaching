// Fake AI Performance Data (MVP - will be replaced with real Supabase data)
const AI_PERFORMANCE_DATA = {
    claude: {
        personalityRead: 4.5,
        strategicInsight: 4.2,
        harshHonesty: 4.1,
        actionability: 4.6,
        totalSessions: 342
    },
    chatgpt: {
        personalityRead: 4.0,
        strategicInsight: 4.4,
        harshHonesty: 3.8,
        actionability: 4.2,
        totalSessions: 389
    },
    gemini: {
        personalityRead: 3.9,
        strategicInsight: 4.0,
        harshHonesty: 3.5,
        actionability: 4.1,
        totalSessions: 116
    }
};

function getAIPerformance(aiName) {
    return AI_PERFORMANCE_DATA[aiName] || null;
}

function renderStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    let stars = '';

    for (let i = 0; i < fullStars; i++) {
        stars += '⭐';
    }
    if (hasHalf) {
        stars += '⭐'; // Using full star for simplicity
    }
    while (stars.length < 10) { // 5 stars * 2 chars
        stars += '☆';
    }

    return stars;
}
