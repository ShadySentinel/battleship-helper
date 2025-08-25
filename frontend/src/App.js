import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import GameBoard from './components/GameBoard';
import ShipInfo from './components/ShipInfo';
import Suggestions from './components/Suggestions';
import Controls from './components/Controls';

const AppContainer = styled.div`
  min-height: 100vh;
  padding: 20px;
  color: white;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin: 10px 0 0 0;
  opacity: 0.9;
`;

const MainContent = styled.main`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 30px;
  max-width: 1400px;
  margin: 0 auto;
  
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

function App() {
  const [hits, setHits] = useState([]);
  const [misses, setMisses] = useState([]);
  const [probabilities, setProbabilities] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Ship configurations
  const ships = [
    { name: 'Carrier', size: '5x2', length: 5, width: 2 },
    { name: 'Battleship', size: '5x1', length: 5, width: 1 },
    { name: 'Cruiser', size: '4x1', length: 4, width: 1 },
    { name: 'Submarine', size: '3x1', length: 3, width: 1 },
    { name: 'Destroyer 1', size: '2x2', length: 2, width: 2 },
    { name: 'Destroyer 2', size: '2x2', length: 2, width: 2 }
  ];

  const updateBoard = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('/api/update-board', {
        hits: hits,
        misses: misses
      });
      
      if (response.data.success) {
        await fetchProbabilities();
      }
    } catch (err) {
      setError('Failed to update board: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchProbabilities = async () => {
    try {
      const response = await axios.get('/api/get-probabilities');
      if (response.data.success) {
        setProbabilities(response.data.probabilities);
        setSuggestions(response.data.suggestions);
      }
    } catch (err) {
      setError('Failed to fetch probabilities: ' + err.message);
    }
  };

  const resetBoard = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('/api/reset-board');
      if (response.data.success) {
        setHits([]);
        setMisses([]);
        setProbabilities([]);
        setSuggestions([]);
      }
    } catch (err) {
      setError('Failed to reset board: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCellClick = (row, col) => {
    const hitIndex = hits.findIndex(hit => hit.row === row && hit.col === col);
    const missIndex = misses.findIndex(miss => miss.row === row && miss.col === col);
    
    if (hitIndex !== -1) {
      // Remove hit
      setHits(hits.filter((_, index) => index !== hitIndex));
    } else if (missIndex !== -1) {
      // Remove miss
      setMisses(misses.filter((_, index) => index !== missIndex));
    } else {
      // Add as hit
      setHits([...hits, { row, col }]);
    }
  };

  const handleRightClick = (e, row, col) => {
    e.preventDefault();
    const hitIndex = hits.findIndex(hit => hit.row === row && hit.col === col);
    const missIndex = misses.findIndex(miss => miss.row === row && miss.col === col);
    
    if (hitIndex !== -1) {
      // Convert hit to miss
      setHits(hits.filter((_, index) => index !== hitIndex));
      setMisses([...misses, { row, col }]);
    } else if (missIndex !== -1) {
      // Remove miss
      setMisses(misses.filter((_, index) => index !== missIndex));
    } else {
      // Add as miss
      setMisses([...misses, { row, col }]);
    }
  };

  useEffect(() => {
    if (hits.length > 0 || misses.length > 0) {
      updateBoard();
    }
  }, [hits, misses]);

  return (
    <AppContainer>
      <Header>
        <Title>🚢 Battleship Helper</Title>
        <Subtitle>AI-powered ship prediction tool</Subtitle>
      </Header>

      <MainContent>
        <LeftPanel>
          <GameBoard
            hits={hits}
            misses={misses}
            probabilities={probabilities}
            onCellClick={handleCellClick}
            onRightClick={handleRightClick}
            loading={loading}
          />
          <Controls
            onUpdate={updateBoard}
            onReset={resetBoard}
            loading={loading}
            error={error}
          />
        </LeftPanel>

        <RightPanel>
          <ShipInfo ships={ships} />
          <Suggestions suggestions={suggestions} />
        </RightPanel>
      </MainContent>
    </AppContainer>
  );
}

export default App;
