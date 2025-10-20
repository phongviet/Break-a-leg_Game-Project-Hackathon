/**
 * gameLogic.js - Core Game Logic
 */

const gameLogic = {
    startGame() {
        gameState.init();
        uiManager.showLoading(false);
        uiManager.showScreen('play-screen');
        this.startTurn();
    },

    async startTurn() {
        indicatorManager.updateAll();

        const decisionEvent = eventManager.checkForDecisionEvent();
        if (decisionEvent) {
            await eventManager.showDecisionEvent(decisionEvent);
            indicatorManager.updateAll();
        }

        gameState.currentHand = cardManager.drawCards(CONFIG.CARDS_PER_TURN);
        const canAffordAnyCard = gameState.currentHand.some(card => gameState.canAffordCard(card.cost));

        if (!canAffordAnyCard && !gameState.checkWin()) {
            await eventManager.showNotification('💸 BANKRUPTCY!', 'Cannot afford any cards. Game Over!');
            uiManager.showResults('lose');
            return;
        }

        cardManager.renderCards(gameState.currentHand);
        gameState.selectedCards = [];
        uiManager.updateCardsPlayedCounter();
    },

    async endTurn() {
        uiManager.showLoading(true);

        const cardsToPlay = gameState.selectedCards.map(index => gameState.currentHand[index]);

        for (const card of cardsToPlay) {
            gameState.playCard(card);

            const status = gameState.getStatus();
            if (status === 'win') {
                indicatorManager.updateAll();
                await this.delay(500);
                await eventManager.showNotification('🎉 ULTIMATE VICTORY!', 'All three indicators reached 100!');
                uiManager.showResults('win');
                return;
            }
            if (status === 'lose') {
                indicatorManager.updateAll();
                await this.delay(500);
                uiManager.showResults('lose');
                return;
            }
        }

        indicatorManager.updateAll();
        await this.delay(500);
        await eventManager.processPendingEvents();

        let status = gameState.getStatus();
        if (status === 'win') {
            await eventManager.showNotification('🎉 ULTIMATE VICTORY!', 'All three indicators reached 100!');
            uiManager.showResults('win');
            return;
        }
        if (status === 'lose') {
            uiManager.showResults('lose');
            return;
        }

        const objectiveEvent = eventManager.checkForObjectiveEvent();
        if (objectiveEvent) {
            await eventManager.showObjectiveEvent(objectiveEvent);
            indicatorManager.updateAll();
        }

        indicatorManager.updateAll();
        status = gameState.getStatus();

        if (status === 'win') {
            await eventManager.showNotification('🎉 ULTIMATE VICTORY!', 'All three indicators reached 100!');
            uiManager.showResults('win');
            return;
        }
        if (status === 'lose') {
            uiManager.showResults('lose');
            return;
        }

        const warnings = indicatorManager.getWarnings();
        if (warnings.length > 0) {
            await eventManager.showNotification('⚠️ Warning', warnings.join('\n'));
        }

        gameState.nextTurn();
        this.startTurn();
        uiManager.showLoading(false);
    },

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
};

