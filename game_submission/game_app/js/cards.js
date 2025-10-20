/**
 * cards.js - Vietnam Sidewalk Policy Cards
 * 24 cards, 50% have budget generation
 * Increased frequency of cards with negative trade-offs
 * High enforcement (Order+) always comes with Livelihood/Trust penalties
 */

const POLICY_CARDS = [
    // ENFORCEMENT CARDS - Very High Frequency (Order+ but Livelihood/Trust-)
    { name: "Sidewalk Clearance Operation", description: "Launch official campaign to clear sidewalks", cost: 15, effects: { publicOrder: 15, livelihood: -10, trust: -8 } },
    { name: "Sidewalk Clearance Operation", description: "Launch official campaign to clear sidewalks", cost: 15, effects: { publicOrder: 15, livelihood: -10, trust: -8 } },
    { name: "Sidewalk Clearance Operation", description: "Launch official campaign to clear sidewalks", cost: 15, effects: { publicOrder: 15, livelihood: -10, trust: -8 } },

    { name: "Install Barriers & Bollards", description: "Physical barriers to prevent vendor encroachment", cost: 20, effects: { publicOrder: 20, livelihood: -15, trust: -5, budget: 10 } },
    { name: "Install Barriers & Bollards", description: "Physical barriers to prevent vendor encroachment", cost: 20, effects: { publicOrder: 20, livelihood: -15, trust: -5, budget: 10 } },
    { name: "Install Barriers & Bollards", description: "Physical barriers to prevent vendor encroachment", cost: 20, effects: { publicOrder: 20, livelihood: -15, trust: -5, budget: 10 } },

    { name: "24/7 Police Patrols", description: "Increase police presence on sidewalks", cost: 25, effects: { publicOrder: 18, livelihood: -12, trust: -10 } },
    { name: "24/7 Police Patrols", description: "Increase police presence on sidewalks", cost: 25, effects: { publicOrder: 18, livelihood: -12, trust: -10 } },
    { name: "24/7 Police Patrols", description: "Increase police presence on sidewalks", cost: 25, effects: { publicOrder: 18, livelihood: -12, trust: -10 } },

    { name: "Fine Illegal Vendors", description: "Issue fines to unlicensed vendors", cost: 10, effects: { publicOrder: 12, livelihood: -15, trust: -12, budget: 10 } },
    { name: "Fine Illegal Vendors", description: "Issue fines to unlicensed vendors", cost: 10, effects: { publicOrder: 12, livelihood: -15, trust: -12, budget: 10 } },
    { name: "Fine Illegal Vendors", description: "Issue fines to unlicensed vendors", cost: 10, effects: { publicOrder: 12, livelihood: -15, trust: -12, budget: 10 } },

    // NEW ENFORCEMENT CARDS - More trade-offs
    { name: "Demolish Vendor Stalls", description: "Remove all permanent vendor structures", cost: 18, effects: { publicOrder: 25, livelihood: -20, trust: -15 } },
    { name: "Demolish Vendor Stalls", description: "Remove all permanent vendor structures", cost: 18, effects: { publicOrder: 25, livelihood: -20, trust: -15 } },

    { name: "Confiscate Goods", description: "Seize merchandise from illegal vendors", cost: 12, effects: { publicOrder: 15, livelihood: -18, trust: -14, budget: 10 } },
    { name: "Confiscate Goods", description: "Seize merchandise from illegal vendors", cost: 12, effects: { publicOrder: 15, livelihood: -18, trust: -14, budget: 10 } },

    { name: "Mandatory Vendor Registration", description: "Force all vendors to register or leave", cost: 20, effects: { publicOrder: 18, livelihood: -12, trust: -10 } },
    { name: "Mandatory Vendor Registration", description: "Force all vendors to register or leave", cost: 20, effects: { publicOrder: 18, livelihood: -12, trust: -10 } },

    { name: "Security Camera Installation", description: "Monitor sidewalks 24/7 to catch violations", cost: 22, effects: { publicOrder: 20, livelihood: -10, trust: -8, budget: 10 } },
    { name: "Security Camera Installation", description: "Monitor sidewalks 24/7 to catch violations", cost: 22, effects: { publicOrder: 20, livelihood: -10, trust: -8, budget: 10 } },

    { name: "Restrict Operating Hours", description: "Limit vendor hours to specific times only", cost: 15, effects: { publicOrder: 16, livelihood: -14, trust: -8 } },
    { name: "Restrict Operating Hours", description: "Limit vendor hours to specific times only", cost: 15, effects: { publicOrder: 16, livelihood: -14, trust: -8 } },

    // LIVELIHOOD SUPPORT CARDS - Now with Order penalties
    { name: "Designated Vendor Zones", description: "Create legal areas for vendors", cost: 20, effects: { publicOrder: -5, livelihood: 20, trust: 15 } },

    { name: "Vendor License Program", description: "Issue permits to qualified vendors", cost: 15, effects: { publicOrder: 8, livelihood: 15, trust: 10, budget: 10 } },

    { name: "Microfinance for Vendors", description: "Provide small loans to improve businesses", cost: 25, effects: { publicOrder: -8, livelihood: 25, trust: 18 } },
    { name: "Microfinance for Vendors", description: "Provide small loans to improve businesses", cost: 25, effects: { publicOrder: -8, livelihood: 25, trust: 18 } },

    { name: "Street Food Market Development", description: "Build organized street food markets", cost: 30, effects: { publicOrder: 5, livelihood: 22, trust: 15, budget: 10 } },

    // COMMUNITY ENGAGEMENT CARDS
    { name: "Public Forum & Dialogue", description: "Host meetings with all stakeholders", cost: 10, effects: { publicOrder: 5, livelihood: 8, trust: 20 } },

    { name: "Community Volunteer Program", description: "Recruit locals to maintain sidewalks", cost: 12, effects: { publicOrder: 10, livelihood: 5, trust: 18, budget: 10 } },

    { name: "Media Campaign", description: "Promote cooperation and shared responsibility", cost: 15, effects: { publicOrder: 8, livelihood: 8, trust: 15 } },

    { name: "Celebrate Vendors Day", description: "Honor street vendors' cultural contribution", cost: 18, effects: { publicOrder: -5, livelihood: 15, trust: 20, budget: 10 } },
    { name: "Celebrate Vendors Day", description: "Honor street vendors' cultural contribution", cost: 18, effects: { publicOrder: -5, livelihood: 15, trust: 20, budget: 10 } },

    // INFRASTRUCTURE CARDS
    { name: "Widen Sidewalks", description: "Expand space for pedestrians and vendors", cost: 35, effects: { publicOrder: 15, livelihood: 15, trust: 12 } },

    { name: "Install Street Lighting", description: "Improve safety and vendor visibility", cost: 20, effects: { publicOrder: 12, livelihood: 8, trust: 10, budget: 10 } },

    { name: "Sidewalk Repair", description: "Fix broken tiles and improve quality", cost: 25, effects: { publicOrder: 18, livelihood: 5, trust: 12 } },

    { name: "Public Restroom Facilities", description: "Build toilets for vendors and pedestrians", cost: 30, effects: { publicOrder: 15, livelihood: 10, trust: 18, budget: 10 } },

    // ECONOMIC INCENTIVE CARDS
    { name: "Tax Break for Compliant Vendors", description: "Reduce fees for rule-following vendors", cost: 15, effects: { publicOrder: 8, livelihood: 18, trust: 15 } },

    { name: "Tourism Promotion", description: "Market local street food to tourists", cost: 20, effects: { publicOrder: 5, livelihood: 20, trust: 12, budget: 10 } },

    { name: "Small Business Training", description: "Teach hygiene and customer service", cost: 18, effects: { publicOrder: 12, livelihood: 15, trust: 10 } },

    // TECHNOLOGY & INNOVATION CARDS
    { name: "Mobile Vendor Tracking App", description: "Digital system to manage vendors", cost: 25, effects: { publicOrder: 15, livelihood: 10, trust: 8, budget: 10 } },

    { name: "Smart Payment System", description: "QR code payments for transparency", cost: 22, effects: { publicOrder: 10, livelihood: 12, trust: 10, budget: 10 } },

    // BALANCED APPROACH CARDS
    { name: "Phased Relocation Plan", description: "Gradually move vendors with support", cost: 28, effects: { publicOrder: 12, livelihood: 12, trust: 15 } },

    { name: "Hybrid Sidewalk Model", description: "Time-based vendor system", cost: 20, effects: { publicOrder: 15, livelihood: 15, trust: 12, budget: 10 } },

    { name: "Sidewalk Heritage Protection", description: "Recognize vending as cultural heritage", cost: 18, effects: { publicOrder: 8, livelihood: 15, trust: 20, budget: 10 } }
];

const cardManager = {
    drawCards(count) {
        const drawn = [];
        for (let i = 0; i < count; i++) {
            drawn.push({ ...POLICY_CARDS[Math.floor(Math.random() * POLICY_CARDS.length)] });
        }
        return drawn;
    },

    renderCards(cards) {
        const container = document.getElementById('cards-hand');
        container.innerHTML = '';
        cards.forEach((card, index) => {
            container.appendChild(this.createCardElement(card, index));
        });
    },

    createCardElement(card, index) {
        const div = document.createElement('div');
        div.className = 'card';
        div.dataset.index = index;

        const canAfford = gameState.canAffordCard(card.cost);
        if (!canAfford) div.classList.add('unaffordable');
        if (gameState.selectedCards.includes(index)) div.classList.add('selected');

        let effectsHTML = '';
        if (card.effects.publicOrder !== 0) {
            effectsHTML += `<div style="color: ${card.effects.publicOrder > 0 ? '#4CAF50' : '#f44336'}">🏛️ Order: ${card.effects.publicOrder > 0 ? '+' : ''}${card.effects.publicOrder}</div>`;
        }
        if (card.effects.livelihood !== 0) {
            effectsHTML += `<div style="color: ${card.effects.livelihood > 0 ? '#4CAF50' : '#f44336'}">🛒 Livelihood: ${card.effects.livelihood > 0 ? '+' : ''}${card.effects.livelihood}</div>`;
        }
        if (card.effects.trust !== 0) {
            effectsHTML += `<div style="color: ${card.effects.trust > 0 ? '#4CAF50' : '#f44336'}">❤️ Trust: ${card.effects.trust > 0 ? '+' : ''}${card.effects.trust}</div>`;
        }
        if (card.effects.budget) {
            effectsHTML += `<div style="color: #FFD700">💰 Budget: +${card.effects.budget}</div>`;
        }

        div.innerHTML = `
            <div class="card-header">
                <h4>${card.name}</h4>
                <span class="card-cost">💰 ${card.cost}</span>
            </div>
            <p class="card-description">${card.description}</p>
            <div class="card-effects">${effectsHTML}</div>
        `;

        div.addEventListener('click', () => {
            if (canAfford && gameState.canPlayMoreCards()) {
                this.toggleCardSelection(index);
            }
        });

        return div;
    },

    toggleCardSelection(index) {
        const selectedIndex = gameState.selectedCards.indexOf(index);
        if (selectedIndex > -1) {
            gameState.selectedCards.splice(selectedIndex, 1);
        } else {
            if (gameState.selectedCards.length < CONFIG.MAX_CARDS_PLAYABLE) {
                gameState.selectedCards.push(index);
            }
        }
        this.renderCards(gameState.currentHand);
        uiManager.updateCardsPlayedCounter();
    }
};
