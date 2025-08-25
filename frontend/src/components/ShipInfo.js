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

const ShipList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ShipItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const ShipIcon = styled.div`
  width: 40px;
  height: 40px;
  background: ${props => props.color};
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: white;
  flex-shrink: 0;
`;

const ShipDetails = styled.div`
  flex: 1;
`;

const ShipName = styled.div`
  font-weight: bold;
  color: white;
  margin-bottom: 4px;
`;

const ShipSize = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
`;

const ShipStatus = styled.div`
  font-size: 12px;
  color: ${props => props.status === 'sunk' ? '#ff4757' : '#2ed573'};
  font-weight: bold;
`;

const ShipInfo = ({ ships }) => {
  const getShipIcon = (length, width) => {
    if (length === 5 && width === 2) return '🚢'; // Carrier
    if (length === 5 && width === 1) return '⚓'; // Battleship
    if (length === 4 && width === 1) return '🛥️'; // Cruiser
    if (length === 3 && width === 1) return '🚤'; // Submarine
    if (length === 2 && width === 2) return '⛵'; // Destroyer
    return '🚢';
  };

  const getShipColor = (length, width) => {
    if (length === 5 && width === 2) return '#e74c3c'; // Carrier - Red
    if (length === 5 && width === 1) return '#f39c12'; // Battleship - Orange
    if (length === 4 && width === 1) return '#f1c40f'; // Cruiser - Yellow
    if (length === 3 && width === 1) return '#27ae60'; // Submarine - Green
    if (length === 2 && width === 2) return '#3498db'; // Destroyer - Blue
    return '#95a5a6';
  };

  const getShipStatus = (ship) => {
    // This would be calculated based on actual game state
    // For now, showing as active
    return 'active';
  };

  return (
    <Container>
      <Title>🚢 Fleet Information</Title>
      <ShipList>
        {ships.map((ship, index) => (
          <ShipItem key={index}>
            <ShipIcon color={getShipColor(ship.length, ship.width)}>
              {getShipIcon(ship.length, ship.width)}
            </ShipIcon>
            <ShipDetails>
              <ShipName>{ship.name}</ShipName>
              <ShipSize>Size: {ship.size}</ShipSize>
              <ShipStatus status={getShipStatus(ship)}>
                {getShipStatus(ship) === 'sunk' ? 'SUNK' : 'ACTIVE'}
              </ShipStatus>
            </ShipDetails>
          </ShipItem>
        ))}
      </ShipList>
      
      <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px' }}>
        <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.8)', textAlign: 'center' }}>
          <strong>Game Rules:</strong><br />
          • Left click: Mark as hit<br />
          • Right click: Mark as miss<br />
          • Click again to remove
        </div>
      </div>
    </Container>
  );
};

export default ShipInfo;
