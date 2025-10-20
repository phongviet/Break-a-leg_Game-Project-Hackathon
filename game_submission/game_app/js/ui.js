/**
 * ui.js - UI Management
 */

const uiManager = {
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        const target = document.getElementById(screenId);
        if (target) target.classList.add('active');
    },

    updateCardsPlayedCounter() {
        const counter = document.getElementById('cards-played-count');
        if (counter) counter.textContent = gameState.selectedCards.length;
    },

    showResults(status) {
        const snapshot = gameState.getSnapshot();

        if (status === 'win') {
            gameState.checkWinAchievements();
            snapshot.score = gameState.calculateFinalScore();
        } else {
            snapshot.score = 0;
        }

        if (status === 'win' && snapshot.score > 0) {
            this.checkAndSaveHighScore(snapshot.score);
        }

        const resultImage = document.getElementById('result-image');
        const resultSubtitle = document.getElementById('result-subtitle');
        const highScores = this.getHighScores();

        let currentRank = -1;
        if (status === 'win' && snapshot.score > 0) {
            currentRank = highScores.findIndex(hs => hs.score === snapshot.score) + 1;
        }
        const isTop5 = currentRank > 0 && currentRank <= 5;

        if (status === 'win') {
            if (isTop5) {
                resultImage.src = 'assets/images/megacity.png';
                resultSubtitle.textContent = `🌟 Mega City - Rank #${currentRank} in Top 5!`;
                resultSubtitle.style.color = '#FFD700';
            } else {
                resultImage.src = 'assets/images/cantwalk.png';
                resultSubtitle.textContent = '🚶 Victory But Not Perfect - Keep Improving!';
                resultSubtitle.style.color = '#4CAF50';
            }
        } else {
            resultImage.src = 'assets/images/suffering.png';
            if (gameState.publicOrder <= 0) resultSubtitle.textContent = '😢 Crisis - Public Order Collapsed!';
            else if (gameState.livelihood <= 0) resultSubtitle.textContent = '😢 Crisis - Livelihood Destroyed!';
            else if (gameState.trust <= 0) resultSubtitle.textContent = '😢 Crisis - Trust Lost!';
            else if (gameState.budget <= 0) resultSubtitle.textContent = '😢 Crisis - Budget Exhausted!';
            else resultSubtitle.textContent = '😢 Crisis - City Suffering';
            resultSubtitle.style.color = '#f44336';
        }

        const title = document.getElementById('result-title');
        const message = document.getElementById('result-message');
        title.classList.remove('win', 'lose');

        if (status === 'win') {
            title.textContent = isTop5 ? `🏆 Victory - Rank #${currentRank}!` : '🎉 Victory!';
            title.classList.add('win');
            let winMessage = 'Congratulations! All three indicators reached 100!';
            if (isTop5) winMessage += `\n\n🏆 TOP ${currentRank} HIGH SCORE!`;
            winMessage += `\n\n🏆 Final Score: ${snapshot.score}`;
            message.textContent = winMessage;
        } else {
            title.textContent = '😔 Game Over';
            title.classList.add('lose');
            if (gameState.publicOrder <= 0) message.textContent = 'Public order collapsed!';
            else if (gameState.livelihood <= 0) message.textContent = 'Livelihood destroyed!';
            else if (gameState.trust <= 0) message.textContent = 'Trust lost!';
            else if (gameState.budget <= 0) message.textContent = 'Budget exhausted!';
            else message.textContent = 'City failed.';
        }

        document.getElementById('final-public-order-modal').textContent = Math.round(snapshot.publicOrder);
        document.getElementById('final-livelihood-modal').textContent = Math.round(snapshot.livelihood);
        document.getElementById('final-trust-modal').textContent = Math.round(snapshot.trust);
        document.getElementById('final-budget-modal').textContent = Math.round(snapshot.budget);
        document.getElementById('final-turns-modal').textContent = snapshot.turn;

        const scoreRowModal = document.getElementById('final-score-row-modal');
        if (status === 'win' && scoreRowModal) {
            scoreRowModal.style.display = 'flex';
            document.getElementById('final-score-modal').textContent = snapshot.score;
        } else if (scoreRowModal) {
            scoreRowModal.style.display = 'none';
        }

        this.renderDecisionSummary(snapshot.decisions);
        this.renderAchievements();
        this.renderHighScores();
        this.showScreen('result-screen');
    },

    renderAchievements() {
        let section = document.getElementById('achievements-section');
        if (!section) {
            const rightColumn = document.querySelector('.result-right-column');
            section = document.createElement('div');
            section.id = 'achievements-section';
            section.className = 'achievements-section';
            section.innerHTML = '<h3>🏆 Achievements</h3><div id="achievements-list"></div>';
            rightColumn.insertBefore(section, rightColumn.firstChild);
        }

        const list = document.getElementById('achievements-list');
        list.innerHTML = '';
        if (gameState.achievements.length === 0) {
            list.innerHTML = '<p style="text-align:center;color:#999">No achievements yet</p>';
        } else {
            gameState.achievements.forEach(key => {
                const ach = CONFIG.ACHIEVEMENTS[key];
                if (ach) {
                    const item = document.createElement('div');
                    item.className = 'achievement-item';
                    item.innerHTML = `<span class="achievement-icon">${ach.name}</span><span class="achievement-desc">${ach.description}</span>`;
                    list.appendChild(item);
                }
            });
        }
    },

    checkAndSaveHighScore(score) {
        if (score <= 0) return;
        const highScores = this.getHighScores();
        highScores.push({ score, date: new Date().toLocaleDateString(), turn: gameState.turn });
        highScores.sort((a, b) => b.score - a.score);
        highScores.splice(10);
        localStorage.setItem('sidewalkPolicy_highScores', JSON.stringify(highScores));
    },

    getHighScores() {
        const saved = localStorage.getItem('sidewalkPolicy_highScores');
        return saved ? JSON.parse(saved) : [];
    },

    renderHighScores() {
        let section = document.getElementById('high-scores-section');
        if (!section) {
            const rightColumn = document.querySelector('.result-right-column');
            section = document.createElement('div');
            section.id = 'high-scores-section';
            section.className = 'high-scores-section';
            section.innerHTML = '<h3>📊 High Scores (Top 10)</h3><div id="high-scores-list"></div>';
            const achievements = document.getElementById('achievements-section');
            if (achievements && achievements.nextSibling) {
                rightColumn.insertBefore(section, achievements.nextSibling);
            } else {
                rightColumn.insertBefore(section, rightColumn.children[1]);
            }
        }

        const list = document.getElementById('high-scores-list');
        list.innerHTML = '';
        const highScores = this.getHighScores();

        if (highScores.length === 0) {
            list.innerHTML = '<p style="text-align:center;color:#999">No high scores yet</p>';
        } else {
            highScores.forEach((score, i) => {
                const item = document.createElement('div');
                item.className = 'high-score-item';
                const isMegaCity = i < 5;
                const rankStyle = isMegaCity ? 'color:#FFD700;font-weight:bold;' : '';
                item.innerHTML = `
                    <span class="rank" style="${rankStyle}">#${i + 1}</span>
                    <span class="score" style="${rankStyle}">${score.score} pts</span>
                    <span class="info">${score.turn} turns - ${score.date}</span>
                `;
                list.appendChild(item);
            });
        }
    },

    renderDecisionSummary(decisions) {
        const modalList = document.getElementById('decisions-list-modal');
        if (!modalList) return;
        modalList.innerHTML = '';
        modalList.style.background = '#f5f5f5';
        modalList.style.padding = '15px';
        modalList.style.borderRadius = '8px';
        modalList.style.maxHeight = '400px';
        modalList.style.overflowY = 'auto';

        if (decisions.length === 0) {
            modalList.innerHTML = '<p style="text-align:center;color:#999">No decisions made</p>';
            return;
        }

        decisions.forEach(d => {
            const item = document.createElement('div');
            item.style.padding = '8px 0';
            item.style.borderBottom = '1px solid #ddd';
            item.style.fontSize = '14px';
            item.innerHTML = `<strong>Turn ${d.turn}:</strong> ${d.card} <span style="color:#FF9800">(Cost: ${d.cost})</span>`;
            modalList.appendChild(item);
        });
    },

    initEventListeners() {
        document.getElementById('start-btn').addEventListener('click', () => gameLogic.startGame());
        document.getElementById('how-to-play-btn').addEventListener('click', () => this.showScreen('how-to-play-screen'));
        document.getElementById('back-to-menu-btn').addEventListener('click', () => this.showScreen('menu-screen'));
        document.getElementById('end-turn-btn').addEventListener('click', () => gameLogic.endTurn());
        document.getElementById('play-again-btn').addEventListener('click', () => gameLogic.startGame());
        document.getElementById('view-details-btn').addEventListener('click', () => {
            document.getElementById('decision-details-modal').classList.add('active');
        });
        document.getElementById('close-details-btn').addEventListener('click', () => {
            document.getElementById('decision-details-modal').classList.remove('active');
        });
    },

    showLoading(show) {
        const btn = document.getElementById('end-turn-btn');
        if (btn) {
            btn.disabled = show;
            btn.textContent = show ? 'Processing...' : 'End Turn';
        }
    }
};

