from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from scipy.spatial.distance import cdist
import json

app = Flask(__name__)
CORS(app)

# Ship configurations: (length, width)
SHIPS = [(5, 2), (5, 1), (4, 1), (3, 1), (2, 2), (2, 2)]
BOARD_SIZE = 10

class BattleshipProbabilityCalculator:
    def __init__(self):
        self.board_size = BOARD_SIZE
        self.ships = SHIPS
        self.hits = set()
        self.misses = set()
        self.probability_grid = np.ones((BOARD_SIZE, BOARD_SIZE))
        
    def update_board(self, hits, misses):
        """Update the board with new hit/miss information"""
        self.hits = set(hits)
        self.misses = set(misses)
        self._recalculate_probabilities()
        
    def _recalculate_probabilities(self):
        """Recalculate probability grid based on current hits/misses"""
        # Reset probability grid
        self.probability_grid = np.ones((BOARD_SIZE, BOARD_SIZE))
        
        # Set hits and misses to 0 probability
        for hit in self.hits:
            row, col = hit
            self.probability_grid[row][col] = 0
            
        for miss in self.misses:
            row, col = miss
            self.probability_grid[row][col] = 0
            
        # Calculate probabilities for each ship
        for ship_length, ship_width in self.ships:
            self._calculate_ship_probabilities(ship_length, ship_width)
            
    def _calculate_ship_probabilities(self, length, width):
        """Calculate probabilities for a specific ship size"""
        for row in range(BOARD_SIZE):
            for col in range(BOARD_SIZE):
                # Check horizontal placement
                if col + length <= BOARD_SIZE and row + width <= BOARD_SIZE:
                    self._evaluate_placement(row, col, length, width, horizontal=True)
                    
                # Check vertical placement
                if row + length <= BOARD_SIZE and col + width <= BOARD_SIZE:
                    self._evaluate_placement(row, col, length, width, horizontal=False)
                    
    def _evaluate_placement(self, row, col, length, width, horizontal=True):
        """Evaluate if a ship placement is valid and update probabilities"""
        if horizontal:
            # Check if placement overlaps with misses
            for r in range(row, row + width):
                for c in range(col, col + length):
                    if (r, c) in self.misses:
                        return False
                    
            # Check if placement has at least one hit
            has_hit = False
            for r in range(row, row + width):
                for c in range(col, col + length):
                    if (r, c) in self.hits:
                        has_hit = True
                        break
                if has_hit:
                    break
                    
            # If no hits, this placement is less likely
            if not has_hit:
                return False
                
            # Update probabilities for this placement
            for r in range(row, row + width):
                for c in range(col, col + length):
                    if (r, c) not in self.hits:
                        self.probability_grid[r][c] += 1
                        
        else:  # vertical
            # Check if placement overlaps with misses
            for r in range(row, row + length):
                for c in range(col, col + width):
                    if (r, c) in self.misses:
                        return False
                    
            # Check if placement has at least one hit
            has_hit = False
            for r in range(row, row + length):
                for c in range(col, col + width):
                    if (r, c) in self.hits:
                        has_hit = True
                        break
                if has_hit:
                    break
                    
            # If no hits, this placement is less likely
            if not has_hit:
                return False
                
            # Update probabilities for this placement
            for r in range(row, row + length):
                for c in range(col, col + width):
                    if (r, c) not in self.hits:
                        self.probability_grid[r][c] += 1
                        
        return True
        
    def get_probabilities(self):
        """Get the current probability grid"""
        # Normalize probabilities
        max_prob = np.max(self.probability_grid)
        if max_prob > 0:
            normalized = self.probability_grid / max_prob
        else:
            normalized = self.probability_grid
            
        # Convert to list format for JSON
        result = []
        for row in range(BOARD_SIZE):
            row_data = []
            for col in range(BOARD_SIZE):
                if (row, col) in self.hits:
                    row_data.append(-1)  # Hit
                elif (row, col) in self.misses:
                    row_data.append(-2)  # Miss
                else:
                    row_data.append(float(normalized[row][col]))
            result.append(row_data)
            
        return result
        
    def get_next_move_suggestions(self):
        """Get the top 5 suggested next moves based on probabilities"""
        probabilities = self.probability_grid.copy()
        
        # Set hits and misses to 0
        for hit in self.hits:
            row, col = hit
            probabilities[row][col] = 0
            
        for miss in self.misses:
            row, col = miss
            probabilities[row][col] = 0
            
        # Get top 5 positions
        flat_probs = probabilities.flatten()
        top_indices = np.argsort(flat_probs)[-5:][::-1]
        
        suggestions = []
        for idx in top_indices:
            row = idx // BOARD_SIZE
            col = idx % BOARD_SIZE
            prob = float(probabilities[row][col])
            suggestions.append({
                'row': int(row),
                'col': int(col),
                'probability': prob
            })
            
        return suggestions

# Global calculator instance
calculator = BattleshipProbabilityCalculator()

@app.route('/api/update-board', methods=['POST'])
def update_board():
    """Update the board with new hit/miss information"""
    try:
        data = request.get_json()
        hits = data.get('hits', [])
        misses = data.get('misses', [])
        
        # Convert to tuples for set operations
        hits = [(int(hit['row']), int(hit['col'])) for hit in hits]
        misses = [(int(miss['row']), int(miss['col'])) for miss in misses]
        
        calculator.update_board(hits, misses)
        
        return jsonify({
            'success': True,
            'message': 'Board updated successfully'
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400

@app.route('/api/get-probabilities', methods=['GET'])
def get_probabilities():
    """Get the current probability grid"""
    try:
        probabilities = calculator.get_probabilities()
        suggestions = calculator.get_next_move_suggestions()
        
        return jsonify({
            'success': True,
            'probabilities': probabilities,
            'suggestions': suggestions
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400

@app.route('/api/reset-board', methods=['POST'])
def reset_board():
    """Reset the board to initial state"""
    try:
        global calculator
        calculator = BattleshipProbabilityCalculator()
        
        return jsonify({
            'success': True,
            'message': 'Board reset successfully'
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400

@app.route('/api/board-info', methods=['GET'])
def get_board_info():
    """Get information about the current board state"""
    try:
        return jsonify({
            'success': True,
            'board_size': BOARD_SIZE,
            'ships': SHIPS,
            'total_hits': len(calculator.hits),
            'total_misses': len(calculator.misses)
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)
