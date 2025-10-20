/**
 * gameState.js - Game State Management
 */

const gameState = {
    publicOrder: 50,
    livelihood: 50,
    trust: 50,
    budget: 100,
    turn: 1,
    cardsPlayedThisTurn: 0,
    currentHand: [],
    selectedCards: [],
    score: 0,
    maxIndicatorReached: 50,
    achievements: [],
    decisionsHistory: [],

    init() {
        this.publicOrder = CONFIG.INITIAL_PUBLIC_ORDER;
        this.livelihood = CONFIG.INITIAL_LIVELIHOOD;
        this.trust = CONFIG.INITIAL_TRUST;
        this.budget = CONFIG.INITIAL_BUDGET;
        this.turn = 1;
        this.cardsPlayedThisTurn = 0;
        this.currentHand = [];
        this.selectedCards = [];
        this.score = 0;
        this.maxIndicatorReached = 50;
        this.decisionsHistory = [];
    },

    updateIndicator(indicator, change) {
        const oldValue = this[indicator];
        this[indicator] = Math.max(CONFIG.MIN_INDICATOR, this[indicator] + change);
        const actualChange = this[indicator] - oldValue;

        if (actualChange !== 0) {
            this.addScore(actualChange * 10);
        }

        const maxCurrent = Math.max(this.publicOrder, this.livelihood, this.trust);
        if (maxCurrent > this.maxIndicatorReached) {
            this.maxIndicatorReached = maxCurrent;
            this.checkIndicatorAchievements();
        }
    },

    addScore(points) {
        this.score += Math.round(points);
    },

    checkIndicatorAchievements() {
        if (this.maxIndicatorReached >= 150 && !this.hasAchievement('SUPER_CITY')) {
            this.unlockAchievement('SUPER_CITY');
        }
        if (this.maxIndicatorReached >= 200 && !this.hasAchievement('LEGENDARY')) {
            this.unlockAchievement('LEGENDARY');
        }
        if (this.trust >= 90 && !this.hasAchievement('TRUST_MASTER')) {
            this.unlockAchievement('TRUST_MASTER');
        }
    },

    canAffordCard(cost) {
        return this.budget >= cost;
    },

    canPlayMoreCards() {
        return this.cardsPlayedThisTurn < CONFIG.MAX_CARDS_PLAYABLE;
    },

    playCard(card) {
        if (!this.canAffordCard(card.cost) || !this.canPlayMoreCards()) {
            return false;
        }

        this.budget -= card.cost;
        this.updateIndicator('publicOrder', card.effects.publicOrder);
        this.updateIndicator('livelihood', card.effects.livelihood);
        this.updateIndicator('trust', card.effects.trust);

        if (card.effects.budget) {
            const oldBudget = this.budget;
            this.budget = Math.max(0, this.budget + card.effects.budget);
            const budgetChange = this.budget - oldBudget;
            if (budgetChange !== 0) {
                this.addScore(budgetChange * 10);
            }
        }

        this.cardsPlayedThisTurn++;
        this.decisionsHistory.push({
            turn: this.turn,
            card: card.name,
            cost: card.cost
        });

        return true;
    },

    checkWin() {
        return this.publicOrder >= CONFIG.WIN_PUBLIC_ORDER &&
               this.livelihood >= CONFIG.WIN_LIVELIHOOD &&
               this.trust >= CONFIG.WIN_TRUST;
    },

    checkLose() {
        return this.publicOrder <= 0 ||
               this.livelihood <= 0 ||
               this.trust <= 0 ||
               this.budget <= 0;
    },

    getStatus() {
        if (this.checkWin()) return 'win';
        if (this.checkLose()) return 'lose';
        return 'playing';
    },

    calculateFinalScore() {
        let finalScore = this.score;
        if (this.turn <= 5) finalScore += 500;
        finalScore += this.budget * 5;
        if (this.publicOrder > 100) finalScore += (this.publicOrder - 100) * 3;
        if (this.livelihood > 100) finalScore += (this.livelihood - 100) * 3;
        if (this.trust > 100) finalScore += (this.trust - 100) * 3;
        if (this.publicOrder >= 80 && this.livelihood >= 80 && this.trust >= 80) {
            finalScore *= CONFIG.SCORE_MULTIPLIER_PERFECT_BALANCE;
        }
        return Math.round(finalScore);
    },

    checkWinAchievements() {
        if (!this.hasAchievement('FIRST_WIN')) this.unlockAchievement('FIRST_WIN');
        if (this.turn <= 5 && !this.hasAchievement('SPEED_RUN')) this.unlockAchievement('SPEED_RUN');
        if (this.budget >= 80 && !this.hasAchievement('EFFICIENCY')) this.unlockAchievement('EFFICIENCY');
        if (this.publicOrder >= 80 && this.livelihood >= 80 && this.trust >= 80 && !this.hasAchievement('BALANCED')) {
            this.unlockAchievement('BALANCED');
        }
        if (this.budget >= 100 && !this.hasAchievement('ECONOMIC_GENIUS')) this.unlockAchievement('ECONOMIC_GENIUS');
        if (this.score >= 1000 && !this.hasAchievement('HIGH_SCORE')) this.unlockAchievement('HIGH_SCORE');
    },

    hasAchievement(key) {
        return this.achievements.includes(key);
    },

    unlockAchievement(key) {
        if (!this.hasAchievement(key)) {
            this.achievements.push(key);
            this.saveAchievements();
            return true;
        }
        return false;
    },

    saveAchievements() {
        localStorage.setItem('sidewalkPolicy_achievements', JSON.stringify(this.achievements));
    },

    loadAchievements() {
        const saved = localStorage.getItem('sidewalkPolicy_achievements');
        if (saved) this.achievements = JSON.parse(saved);
    },

    nextTurn() {
        this.turn++;
        this.cardsPlayedThisTurn = 0;
        this.selectedCards = [];
        this.addScore(CONFIG.SCORE_PER_TURN);
    },

    getSnapshot() {
        return {
            publicOrder: this.publicOrder,
            livelihood: this.livelihood,
            trust: this.trust,
            budget: this.budget,
            turn: this.turn,
            score: this.calculateFinalScore(),
            maxIndicator: this.maxIndicatorReached,
            decisions: [...this.decisionsHistory],
            newAchievements: []
        };
    }
};
