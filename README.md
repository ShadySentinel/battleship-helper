# 🚢 Battleship Helper

An AI-powered battleship game assistant that helps you predict the most probable ship locations based on your hit/miss pattern. The app uses probability calculations to suggest the best next moves. PLEASE note that I specifically tailored this to work on the mobile app Plato. Change your fleet and grid size accordingly.

![chooser28](https://github.com/user-attachments/assets/41cc9bca-24ad-46d2-9977-c5b7a56e2b8f)

<img width="297" height="292" alt="image" src="https://github.com/user-attachments/assets/bd9d1106-880b-454f-b166-fbc96481ed01" />

## ✨ Features

- **10×10 Game Board**: Standard battleship grid with coordinate system
- **6 Ships**: 5×2, 5×1, 4×1, 3×1, and two 2×2 ships
- **AI Probability Engine**: Calculates ship placement probabilities in real-time
- **Interactive Interface**: Click to mark hits/misses, right-click for alternative actions
- **Smart Suggestions**: Top 5 recommended next moves with probability percentages
- **Real-time Updates**: Instant probability recalculation after each move

## 🏗️ Architecture

- **Backend**: Python Flask API with probability calculation engine
- **Frontend**: React.js
- **Algorithm**: Ship placement probability analysis based on hit/miss patterns

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Start the Flask server:
   ```bash
   python app.py
   ```

   The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

   The frontend will run on `http://localhost:3000`

## 🎮 How to Use

### Basic Gameplay

1. **Mark Hits**: Left-click on cells where you've hit enemy ships
2. **Mark Misses**: Right-click on cells where you've missed
3. **View Probabilities**: The board shows probability percentages for each cell
4. **Get Suggestions**: Check the right panel for top 5 recommended next moves
5. **Update Board**: Click "Update Board" to recalculate probabilities

### Controls

- **Left Click**: Mark as hit (💥)
- **Right Click**: Mark as miss (💧)
- **Click Again**: Remove hit/miss marker
- **Update Board**: Recalculate AI probabilities
- **Reset Game**: Clear all hits/misses and start over

### Understanding the Display

- **Red Cells (💥)**: Confirmed hits
- **Dark Gray Cells (💧)**: Confirmed misses
- **Green Cells**: Probability indicators (darker = higher probability)
- **Percentage Numbers**: Probability of ship presence in each cell

## 🧠 How the AI Works

The probability engine analyzes your hit/miss pattern and:

1. **Ship Placement Analysis**: Considers all possible ship orientations
2. **Constraint Satisfaction**: Ensures ships don't overlap with misses
3. **Hit Pattern Recognition**: Identifies likely ship locations based on hits
4. **Probability Calculation**: Assigns scores to each cell based on valid ship placements
5. **Real-time Updates**: Recalculates after each new hit/miss

## 📁 Project Structure

```
battleship-helper/
├── backend/
│   ├── app.py              # Flask API server
│   └── requirements.txt    # Python dependencies
├── frontend/
│   ├── public/
│   │   └── index.html     # Main HTML file
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── GameBoard.js
│   │   │   ├── ShipInfo.js
│   │   │   ├── Suggestions.js
│   │   │   └── Controls.js
│   │   ├── App.js         # Main React app
│   │   └── index.js       # React entry point
│   └── package.json       # Node.js dependencies
└── README.md
```

## 🔧 API Endpoints

- `POST /api/update-board`: Update board with hits/misses
- `GET /api/get-probabilities`: Get current probability grid and suggestions
- `POST /api/reset-board`: Reset board to initial state
- `GET /api/board-info`: Get board configuration and status

## 🎯 Strategy Tips

1. **Start with High-Probability Areas**: Target cells with the highest percentages first
2. **Look for Patterns**: Multiple hits in a line suggest ship orientation
3. **Consider Ship Sizes**: Remember you're looking for ships of different dimensions
4. **Update Frequently**: Recalculate after each shot for better predictions
5. **Use the Suggestions**: The AI's top 5 recommendations are statistically optimal


## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is open source and available under the MIT License.

**Happy ship hunting! 🎯🚢**
