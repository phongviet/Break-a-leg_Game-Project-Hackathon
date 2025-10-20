# Sidewalk Policy - Urban Management Game

## 🎮 Game Overview

**Sidewalk Policy** is an educational browser-based game about urban management and social equity in Vietnam. Players act as Urban Policy Officers who must balance public order, local livelihoods, and community trust while managing sidewalk regulations.

## 🎯 Educational Impact

This game teaches players about:
- **Policy Trade-offs**: Understanding that decisions affect multiple stakeholders
- **Inclusive Urban Management**: Balancing enforcement with social support
- **Real-world Challenges**: Experiencing the complexity of Vietnamese urban policy issues
- **Empathy Building**: Seeing perspectives of both authorities and street vendors

## 🕹️ How to Play

### Objective
Achieve **Public Order ≥ 80** AND **Local Livelihood ≥ 60** before running out of budget or losing community trust.

### Gameplay Flow
1. **Draw Phase**: Receive 3 random policy cards each turn
2. **Decision Phase**: Select and play 1-2 cards (costs budget)
3. **Evaluation Phase**: Watch for penalty events if indicators drop too low

### Win Conditions
- Public Order reaches 80 or higher
- Local Livelihood reaches 60 or higher

### Lose Conditions
- Budget drops to 0
- Community Trust falls to 30 or below

### Four Key Indicators
- 🏛️ **Public Order**: Sidewalk safety and clearance
- 🛒 **Local Livelihood**: Vendor income and jobs
- ❤️ **Community Trust**: Public support for policies
- 💰 **Budget**: Available management resources

## 📋 Game Features

### 12 Policy Cards
- **Enforcement Cards**: Increase patrols, strict enforcement
- **Support Cards**: Vendor support, training programs, micro-loans
- **Balanced Cards**: Public awareness, community meetings, negotiation
- **Infrastructure**: Designated zones, infrastructure improvements

### 4 Penalty Events
Triggered when indicators fall below critical thresholds:
- Community Pressure
- Media Backlash
- Traffic Congestion
- Safety Issues

## 🚀 How to Run

1. Open `index.html` in any modern web browser (Chrome, Firefox, Edge, Safari)
2. No installation or server required - runs completely client-side
3. Click "Start Game" to begin playing

## 🏗️ Technical Architecture

### File Structure
```
game_app/
├── index.html          # Main game structure
├── css/
│   └── style.css       # Complete styling with animations
└── js/
    ├── config.js       # Game constants and card definitions
    ├── gameState.js    # State management
    ├── cards.js        # Card drawing and rendering
    ├── indicators.js   # HUD updates and animations
    ├── events.js       # Penalty event system
    ├── ui.js           # Screen transitions
    ├── gameLogic.js    # Core game flow
    └── main.js         # Application initialization
```

### Technologies Used
- **HTML5**: Semantic structure
- **CSS3**: Gradients, animations, flexbox/grid
- **Vanilla JavaScript**: No external dependencies
- **Modular Architecture**: Separated concerns for maintainability

### Code Organization
Following the prompt requirement, code is divided into small modules with single responsibilities:
- **config.js**: Configuration only
- **gameState.js**: State management only
- **cards.js**: Card operations only
- **indicators.js**: Display updates only
- **events.js**: Event handling only
- **ui.js**: UI transitions only
- **gameLogic.js**: Game flow only
- **main.js**: Initialization only

## 🎨 Design Features

- **Responsive Design**: Works on desktop and mobile
- **Smooth Animations**: Visual feedback for all actions
- **Color-coded Indicators**: Easy to see critical thresholds
- **Emoji Icons**: Universal, clear visual language
- **Gradient UI**: Modern, engaging aesthetic

## 🧪 Testing

The game demonstrates at least 3 turns of gameplay with:
- Card selection and playing mechanics
- Budget management
- Indicator updates with visual feedback
- Penalty events triggering
- Win/lose condition detection
- Decision history tracking

## 🎓 AI Generation Notes

This game was generated following the code-generation-prompts.txt specifications:
- All code is front-end only (HTML, CSS, JavaScript)
- No backend or installation required
- Modular code structure for maintainability
- Educational focus on social equity and policy trade-offs
- Reflects real Vietnamese urban management challenges

## 📊 Game Balance

Starting values: All indicators at 50, Budget at 100
- Average card cost: 15-20 budget points
- Expected game length: 5-10 turns
- Multiple strategies are viable (enforcement vs. support vs. balanced)

## 🌟 Learning Outcomes

Players will understand:
1. Why urban policy is complex and requires balance
2. How enforcement-only approaches can harm livelihoods
3. How support-only approaches can compromise order
4. The importance of community trust in policy success
5. Resource constraints force difficult choices

## 🔧 Future Enhancement Ideas

- More policy cards with specialized effects
- Random events (weather, festivals, economic changes)
- Different difficulty levels
- Multiplayer comparison mode
- Vietnamese language localization
- Sound effects and background music

## 📄 License

Created for RMIT Hackathon 2025 - Educational purposes

---

**Game Version**: 1.0.0  
**Created**: 2025  
**Theme**: Urban Management & Social Equity in Vietnam

