/**
 * events.js - Random Events System
 */

const DECISION_EVENTS = [
    { title: "🚨 Media Spotlight", message: "News crew wants to film. Allow it?", choices: [
        { text: "Allow - Show transparency", effects: { publicOrder: 5, trust: 10 } },
        { text: "Decline - Avoid scrutiny", effects: { trust: -8 } }
    ]},
    { title: "👨‍👩‍👧 Vendor Family Appeal", message: "Family begs you to let them stay.", choices: [
        { text: "Make exception", effects: { publicOrder: -5, livelihood: 10, trust: 12 } },
        { text: "Enforce rules", effects: { publicOrder: 8, livelihood: -10, trust: -5 } }
    ]},
    { title: "🏪 Business Complaint", message: "Shop owners complain about vendors.", choices: [
        { text: "Clear vendors immediately", effects: { publicOrder: 12, livelihood: -15, trust: -8 } },
        { text: "Mediate compromise", effects: { publicOrder: 5, livelihood: 5, trust: 10 } }
    ]},
    { title: "🚶‍♀️ Pedestrian Accident", message: "Someone injured by vendor items.", choices: [
        { text: "Launch crackdown", effects: { publicOrder: 15, livelihood: -12, trust: -5 } },
        { text: "Focus on education", effects: { publicOrder: 8, livelihood: 5, trust: 8 } }
    ]}
];

const OBJECTIVE_EVENTS = [
    { title: "🌪️ Storm Damage", message: "Tropical storm damaged infrastructure.", effects: { publicOrder: -15, livelihood: -15, trust: -5 } },
    { title: "📈 Economic Boom", message: "City economy growing!", effects: { publicOrder: -5, livelihood: 20, trust: 10, budget: 20 } },
    { title: "🗳️ Election Season", message: "Politicians promise support to vendors.", effects: { publicOrder: -10, livelihood: 10, trust: -8 } },
    { title: "🦠 Health Inspection", message: "Health violations found among vendors.", effects: { publicOrder: 15, livelihood: -10, trust: -10 } },
    { title: "🎉 Cultural Festival", message: "Festival brings tourists and income.", effects: { publicOrder: -8, livelihood: 25, trust: 15, budget: 15 } }
];

const eventManager = {
    checkForDecisionEvent() {
        if (Math.random() < CONFIG.DECISION_EVENT_CHANCE) {
            return DECISION_EVENTS[Math.floor(Math.random() * DECISION_EVENTS.length)];
        }
        return null;
    },

    checkForObjectiveEvent() {
        if (gameState.turn % CONFIG.OBJECTIVE_EVENT_INTERVAL === 0) {
            return OBJECTIVE_EVENTS[Math.floor(Math.random() * OBJECTIVE_EVENTS.length)];
        }
        return null;
    },

    async showDecisionEvent(event) {
        return new Promise((resolve) => {
            const modal = document.getElementById('event-modal');
            const title = document.getElementById('event-title');
            const message = document.getElementById('event-message');

            title.textContent = event.title;
            message.innerHTML = `<p>${event.message}</p>${event.choices.map((choice, i) => 
                `<button class="btn btn-secondary choice-btn" data-choice="${i}" style="display:block;width:100%;margin:10px 0">${choice.text}</button>`
            ).join('')}`;

            modal.classList.add('active');

            modal.querySelectorAll('.choice-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const choice = event.choices[parseInt(btn.dataset.choice)];
                    if (choice.effects.publicOrder) gameState.updateIndicator('publicOrder', choice.effects.publicOrder);
                    if (choice.effects.livelihood) gameState.updateIndicator('livelihood', choice.effects.livelihood);
                    if (choice.effects.trust) gameState.updateIndicator('trust', choice.effects.trust);
                    if (choice.effects.budget) {
                        const oldBudget = gameState.budget;
                        gameState.budget = Math.max(0, gameState.budget + choice.effects.budget);
                        const budgetChange = gameState.budget - oldBudget;
                        if (budgetChange !== 0) gameState.addScore(budgetChange * 10);
                    }
                    modal.classList.remove('active');
                    resolve();
                }, { once: true });
            });
        });
    },

    async showObjectiveEvent(event) {
        if (event.effects.publicOrder) gameState.updateIndicator('publicOrder', event.effects.publicOrder);
        if (event.effects.livelihood) gameState.updateIndicator('livelihood', event.effects.livelihood);
        if (event.effects.trust) gameState.updateIndicator('trust', event.effects.trust);
        if (event.effects.budget) {
            const oldBudget = gameState.budget;
            gameState.budget = Math.max(0, gameState.budget + event.effects.budget);
            const budgetChange = gameState.budget - oldBudget;
            if (budgetChange !== 0) gameState.addScore(budgetChange * 10);
        }
        await this.showNotification(event.title, event.message);
    },

    async showNotification(title, message) {
        return new Promise((resolve) => {
            const modal = document.getElementById('event-modal');
            document.getElementById('event-title').textContent = title;
            document.getElementById('event-message').textContent = message;
            modal.classList.add('active');
            document.getElementById('event-close-btn').onclick = () => {
                modal.classList.remove('active');
                resolve();
            };
        });
    },

    async processPendingEvents() {}
};

