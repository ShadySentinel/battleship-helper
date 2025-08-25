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

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
`;

const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 120px;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          background: linear-gradient(45deg, #2ed573, #1e90ff);
          color: white;
          &:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(46, 213, 115, 0.4);
          }
        `;
      case 'secondary':
        return `
          background: linear-gradient(45deg, #ff6b6b, #ee5a24);
          color: white;
          &:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
          }
        `;
      default:
        return `
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
          &:hover:not(:disabled) {
            background: rgba(255, 255, 255, 0.2);
          }
        `;
    }
  }}
`;

const ErrorMessage = styled.div`
  background: rgba(255, 107, 107, 0.2);
  border: 1px solid rgba(255, 107, 107, 0.5);
  color: #ff6b6b;
  padding: 12px;
  border-radius: 8px;
  margin-top: 15px;
  text-align: center;
  font-size: 14px;
`;

const SuccessMessage = styled.div`
  background: rgba(46, 213, 115, 0.2);
  border: 1px solid rgba(46, 213, 115, 0.5);
  color: #2ed573;
  padding: 12px;
  border-radius: 8px;
  margin-top: 15px;
  text-align: center;
  font-size: 14px;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: white;
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 4px;
`;

const Controls = ({ onUpdate, onReset, loading, error }) => {
  const [successMessage, setSuccessMessage] = React.useState('');

  const handleUpdate = async () => {
    try {
      await onUpdate();
      setSuccessMessage('Board updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      // Error is handled by parent component
    }
  };

  const handleReset = async () => {
    try {
      await onReset();
      setSuccessMessage('Board reset successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      // Error is handled by parent component
    }
  };

  return (
    <Container>
      <Title>🎮 Game Controls</Title>
      
      <ButtonGroup>
        <Button
          variant="primary"
          onClick={handleUpdate}
          disabled={loading}
        >
          {loading ? '🔄 Updating...' : '📊 Update Board'}
        </Button>
        
        <Button
          variant="secondary"
          onClick={handleReset}
          disabled={loading}
        >
          {loading ? '🔄 Resetting...' : '🔄 Reset Game'}
        </Button>
      </ButtonGroup>
      
      {error && (
        <ErrorMessage>
          ❌ {error}
        </ErrorMessage>
      )}
      
      {successMessage && (
        <SuccessMessage>
          ✅ {successMessage}
        </SuccessMessage>
      )}
      
      <StatsContainer>
        <StatItem>
          <StatValue>🚢</StatValue>
          <StatLabel>6 Ships</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>10×10</StatValue>
          <StatLabel>Board Size</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>🎯</StatValue>
          <StatLabel>AI Powered</StatLabel>
        </StatItem>
      </StatsContainer>
    </Container>
  );
};

export default Controls;
