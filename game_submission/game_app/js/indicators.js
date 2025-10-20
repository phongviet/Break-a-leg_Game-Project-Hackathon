/**
 * indicators.js - Indicator Display Management
 */

const indicatorManager = {
    updateAll() {
        this.updateIndicator('publicOrder', gameState.publicOrder);
        this.updateIndicator('livelihood', gameState.livelihood);
        this.updateIndicator('trust', gameState.trust);
        this.updateBudget(gameState.budget);
        this.updateTurn(gameState.turn);
    },

    updateIndicator(name, value) {
        const valueElement = document.getElementById(`${name}-value`);
        const barElement = document.getElementById(`${name}-bar`);

        if (valueElement && barElement) {
            valueElement.textContent = Math.round(value);
            const percentage = Math.min(100, Math.max(0, value));
            barElement.style.width = `${percentage}%`;

            if (value <= 30) {
                barElement.style.background = 'linear-gradient(90deg, #f44336, #e57373)';
            } else if (value <= 60) {
                barElement.style.background = 'linear-gradient(90deg, #FF9800, #FFB74D)';
            } else {
                barElement.style.background = 'linear-gradient(90deg, #4CAF50, #81C784)';
            }
        }
    },

    updateBudget(value) {
        const budgetElement = document.getElementById('budget-value');
        if (budgetElement) {
            budgetElement.textContent = Math.round(value);
            if (value <= 30) budgetElement.style.color = '#f44336';
            else if (value <= 60) budgetElement.style.color = '#FF9800';
            else budgetElement.style.color = '#4CAF50';
        }
    },

    updateTurn(turn) {
        const turnElement = document.getElementById('turn-number');
        if (turnElement) turnElement.textContent = turn;
    },

    getWarnings() {
        const warnings = [];
        if (gameState.publicOrder <= 30) warnings.push('⚠️ Public Order critically low!');
        if (gameState.livelihood <= 30) warnings.push('⚠️ Local Livelihood in crisis!');
        if (gameState.trust <= 30) warnings.push('⚠️ Community Trust very low!');
        if (gameState.budget <= 30) warnings.push('⚠️ Budget running out!');
        return warnings;
    }
};

