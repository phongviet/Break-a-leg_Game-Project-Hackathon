# Sidewalk Policy - Urban Management Game

An educational browser-based card game that simulates the challenges of urban sidewalk management in Vietnamese cities.

## Overview

**Sidewalk Policy** is a strategic card game where players take on the role of an Urban Policy Officer managing sidewalks in a crowded Vietnamese city. The game teaches players about policy trade-offs and the delicate balance between public order, local livelihoods, and community trust.

Players must make difficult decisions using policy cards while managing a limited budget and dealing with random events. Every decision has consequences - enforcement actions that improve order may devastate vendor livelihoods, while supporting vendors may lead to sidewalk congestion.

## Features

### Core Gameplay
- **52 Policy Cards** - Diverse cards inspired by real Vietnamese urban policies
- **4 Indicators** - Public Order, Local Livelihood, Community Trust, and Budget
- **Random Events** - Decision events (30% per turn) and objective events (every 3 turns)
- **Strategic Depth** - 70% of cards have negative trade-offs, requiring careful planning

### Game Mechanics
- Draw 3 cards per turn, play 1-2 cards
- Win by reaching 100 in ALL three indicators simultaneously
- Lose if ANY indicator drops to 0 or budget runs out
- Dynamic scoring system with achievements
- Top 10 high score leaderboard with result images

### Visual Design
- Modern glass morphism UI with backdrop blur effects
- 50+ CSS animations (gradient backgrounds, card effects, progress bars)
- Dynamic particle effects and smooth transitions
- Responsive design for desktop, tablet, and mobile

### Educational Value
- Learn about policy trade-offs in urban governance
- Understand stakeholder perspectives (vendors, residents, government)
- Experience resource constraints in public policy
- Build empathy for different community groups

## Instructions to Run the Game

### Method 1: Direct Browser (Recommended)
1. Navigate to `game_app/` folder
2. Double-click `index.html` to open in your default browser
3. No server or installation required!

### Method 2: Using a Local Server
```bash
cd game_app
python -m http.server 8000
# Open browser to http://localhost:8000
```

### Method 3: Live Server (VS Code)
1. Install "Live Server" extension in VS Code
2. Right-click `index.html` → "Open with Live Server"

## Game Controls

- **Click cards** to select (up to 2 per turn)
- **Click again** to deselect
- **End Turn** button to play selected cards
- **View Details** button on result screen for game statistics
- All interactions are mouse/touch-based (no keyboard required)

## Project Structure

```
game_app/
├── index.html              # Main game file
├── css/                    # Stylesheets
│   ├── style.css          # Core styles (700+ lines)
│   ├── animations.css     # Dynamic effects (500+ lines)
│   └── result-*.css       # Result screen styles
├── js/                     # Game logic
│   ├── config.js          # Game configuration
│   ├── gameState.js       # State management
│   ├── cards.js           # 52 policy cards
│   ├── indicators.js      # Indicator system
│   ├── events.js          # Random events
│   ├── ui.js              # UI management
│   ├── gameLogic.js       # Core mechanics
│   └── main.js            # Entry point
└── assets/images/          # Result images
    ├── suffering.png       # Lose screen
    ├── megacity.png        # Top 5 winner
    └── cantwalk.png        # Win but not top 5
```

## Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Technologies Used

- **HTML5** - Semantic structure
- **CSS3** - Modern styling with animations, glass morphism
- **Vanilla JavaScript** - ES6+, no frameworks
- **LocalStorage** - Save high scores and achievements

## Key Features Detail

### Policy Cards (52 total in pool)
- **Enforcement Cards** (70% frequency) - Increase order, reduce livelihood/trust
- **Livelihood Support** (15%) - Help vendors, may reduce order
- **Community Engagement** (10%) - Build trust
- **Balanced Approaches** (5%) - Win-win solutions (rare)

### Random Events
- **Decision Events** - 8 types, require immediate choice
- **Objective Events** - 10 types, occur every 3 turns

### Scoring System
- Base: Indicator changes × 10 = points
- Bonuses: Speed, efficiency, high indicators
- Perfect balance: 1.5× multiplier

### Result Images
- 😢 **Suffering** - Shown when you lose
- 🌟 **Megacity** - Top 5 high score winner
- 🚶 **Can't Walk** - Win but not in top 5

## Educational Context

This game is designed to teach:
- Urban governance complexity
- Policy trade-offs and consequences
- Stakeholder management
- Resource allocation under constraints
- Cultural sensitivity in policy implementation

Perfect for:
- Urban planning courses
- Government training
- Civic education
- Public awareness campaigns

## Contributing

This is an educational project showcasing:
- Card-based game design
- Complex state management in vanilla JS
- Modern CSS animations and effects
- Serious games for social impact

Feel free to study the code, learn from it, and adapt it for your own educational projects!

## Credits

- **Game Design** - Based on real Vietnamese urban challenges
- **Development** - Pure HTML/CSS/JavaScript
- **Inspiration** - Street vendors and urban life in Hanoi & HCMC
- **Demo Video** - https://youtu.be/UNLhxJSxtrw

## License

Educational use only. Created for RMIT Hackathon 2025.

---

**Total Code:** ~4,750 lines  
**Development Time:** ~13 hours  
**Last Updated:** October 2025

For detailed documentation, see `project_report.md`
