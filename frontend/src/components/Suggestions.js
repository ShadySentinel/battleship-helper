import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const Title = styled.h3`
  margin: 0 0 20px 0;
  text-align: center;
  color: white;
`;

const SuggestionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SuggestionItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(5px);
  }
`;

const Position = styled.div`
  font-weight: bold;
  color: white;
  font-size: 16px;
`;

const Probability = styled.div`
  background: linear-gradient(45deg, #2ed573, #1e90ff);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 14px;
  min-width: 60px;
  text-align: center;
`;

const Rank = styled.div`
  width: 30px;
  height: 30px;
  background: ${props => {
    switch (props.rank) {
      case 1: return '#ffd700'; // Gold
      case 2: return '#c0c0c0'; // Silver
      case 3: return '#cd7f32'; // Bronze
      default: return '#4a90e2';
    }
  }};
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
  flex-shrink: 0;
`;

const EmptyState = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  padding: 40px 20px;
  font-style: italic;
`;

const InfoBox = styled.div`
  margin-top: 20px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border-left: 4px solid #2ed573;
`;

const InfoTitle = styled.div`
  font-weight: bold;
  color: white;
  margin-bottom: 8px;
`;

const InfoText = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.4;
`;

const Suggestions = ({ suggestions }) => {
  const formatPosition = (row, col) => {
    return `${row + 1}${String.fromCharCode(65 + col)}`;
  };

  const formatProbability = (probability) => {
    return `${Math.round(probability * 100)}%`;
  };

  if (!suggestions || suggestions.length === 0) {
    return (
      <Container>
        <Title>🎯 Next Move Suggestions</Title>
        <EmptyState>
          Start marking hits and misses on the board to see AI-powered suggestions!
        </EmptyState>
        <InfoBox>
          <InfoTitle>💡 How it works:</InfoTitle>
          <InfoText>
            The AI analyzes your hit/miss pattern and calculates the probability of ships being in each position. 
            Higher percentages indicate more likely ship locations.
          </InfoText>
        </InfoBox>
      </Container>
    );
  }

  return (
    <Container>
      <Title>🎯 Next Move Suggestions</Title>
      <SuggestionList>
        {suggestions.map((suggestion, index) => (
          <SuggestionItem key={index}>
            <Rank rank={index + 1}>{index + 1}</Rank>
            <Position>{formatPosition(suggestion.row, suggestion.col)}</Position>
            <Probability>{formatProbability(suggestion.probability)}</Probability>
          </SuggestionItem>
        ))}
      </SuggestionList>
      
      <InfoBox>
        <InfoTitle>🎯 Strategy Tips:</InfoTitle>
        <InfoText>
          • Target the highest probability cells first<br/>
          • Look for patterns in your hits<br/>
          • Consider ship orientations (horizontal/vertical)<br/>
          • Update after each shot for better predictions
        </InfoText>
      </InfoBox>
    </Container>
  );
};

export default Suggestions;
