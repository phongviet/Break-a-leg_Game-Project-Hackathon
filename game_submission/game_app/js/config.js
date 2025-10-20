/**
 * config.js - Game Configuration
 */

const CONFIG = {
    INITIAL_PUBLIC_ORDER: 50,
    INITIAL_LIVELIHOOD: 50,
    INITIAL_TRUST: 50,
    INITIAL_BUDGET: 100,

    WIN_PUBLIC_ORDER: 100,
    WIN_LIVELIHOOD: 100,
    WIN_TRUST: 100,
    MIN_INDICATOR: 0,

    CARDS_PER_TURN: 3,
    MAX_CARDS_PLAYABLE: 2,

    SCORE_PER_TURN: 10,
    SCORE_MULTIPLIER_PERFECT_BALANCE: 1.5,

    DECISION_EVENT_CHANCE: 0.3,
    OBJECTIVE_EVENT_INTERVAL: 3,

    ACHIEVEMENTS: {
        'FIRST_WIN': { name: '🎯 First Victory', description: 'Win your first game' },
        'SPEED_RUN': { name: '⚡ Speed Runner', description: 'Win in 5 turns or less' },
        'BALANCED': { name: '⚖️ Perfect Balance', description: 'Win with all indicators ≥ 80' },
        'EFFICIENCY': { name: '💼 Efficient Manager', description: 'Win with budget ≥ 80' },
        'TRUST_MASTER': { name: '❤️ People\'s Champion', description: 'Reach Community Trust ≥ 90' },
        'ECONOMIC_GENIUS': { name: '💰 Economic Genius', description: 'Win with budget ≥ 100' },
        'SUPER_CITY': { name: '🌟 Super City', description: 'Reach any indicator ≥ 150' },
        'LEGENDARY': { name: '👑 Legendary Leader', description: 'Reach any indicator ≥ 200' },
        'HIGH_SCORE': { name: '🏆 High Scorer', description: 'Score 1000+ points' }
    }
};

