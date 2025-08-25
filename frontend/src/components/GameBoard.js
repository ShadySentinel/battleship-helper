import React from 'react';
import styled from 'styled-components';

const BoardContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const BoardTitle = styled.h2`
  margin: 0 0 20px 0;
  text-align: center;
  color: white;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 2px;
  max-width: 500px;
  margin: 0 auto;
`;

const Cell = styled.div`
  width: 45px;
  height: 45px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  transition: all 0.2s ease;
  position: relative;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  }
  
  ${props => {
    if (props.isHit) {
      return `
        background: #ff4757;
        color: white;
        border-color: #ff4757;
      `;
    }
    if (props.isMiss) {
      return `
        background: #2f3542;
        color: white;
        border-color: #2f3542;
      `;
    }
    if (props.probability > 0) {
      const intensity = Math.min(props.probability * 0.8, 0.8);
      return `
        background: rgba(46, 213, 115, ${intensity});
        color: ${intensity > 0.5 ? 'white' : '#2ed573'};
        border-color: #2ed573;
      `;
    }
    return `
      background: rgba(255, 255, 255, 0.1);
      color: rgba(255, 255, 255, 0.7);
    `;
  }}
`;

const Coordinates = styled.div`
  display: grid;
  grid-template-columns: 50px repeat(10, 45px);
  gap: 2px;
  max-width: 500px;
  margin: 0 auto 10px auto;
`;

const CoordLabel = styled.div`
  width: 45px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: bold;
`;

const RowLabel = styled.div`
  width: 50px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: bold;
`;

const Legend = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  flex-wrap: wrap;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
`;

const LegendColor = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  ${props => {
    switch (props.type) {
      case 'hit':
        return 'background: #ff4757;';
      case 'miss':
        return 'background: #2f3542;';
      case 'probability':
        return 'background: rgba(46, 213, 115, 0.6);';
      default:
        return 'background: rgba(255, 255, 255, 0.1);';
    }
  }}
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  color: white;
  font-size: 18px;
`;

const GameBoard = ({ hits, misses, probabilities, onCellClick, onRightClick, loading }) => {
  const isHit = (row, col) => hits.some(hit => hit.row === row && hit.col === col);
  const isMiss = (row, col) => misses.some(miss => miss.row === row && miss.col === col);
  const getProbability = (row, col) => {
    if (probabilities.length > 0 && probabilities[row] && probabilities[row][col] !== undefined) {
      return probabilities[row][col];
    }
    return 0;
  };

  const handleClick = (row, col) => {
    onCellClick(row, col);
  };

  const handleRightClick = (e, row, col) => {
    onRightClick(e, row, col);
  };

  return (
    <BoardContainer>
      <BoardTitle>Game Board</BoardTitle>
      
      {/* Column coordinates */}
      <Coordinates>
        <div></div>
        {Array.from({ length: 10 }, (_, i) => (
          <CoordLabel key={i}>{String.fromCharCode(65 + i)}</CoordLabel>
        ))}
      </Coordinates>
      
      {/* Game grid */}
      <Grid>
        {Array.from({ length: 10 }, (_, row) => (
          <React.Fragment key={row}>
            <RowLabel>{row + 1}</RowLabel>
            {Array.from({ length: 10 }, (_, col) => (
              <Cell
                key={`${row}-${col}`}
                isHit={isHit(row, col)}
                isMiss={isMiss(row, col)}
                probability={getProbability(row, col)}
                onClick={() => handleClick(row, col)}
                onContextMenu={(e) => handleRightClick(e, row, col)}
                title={`${row + 1}, ${String.fromCharCode(65 + col)}`}
              >
                {isHit(row, col) && '💥'}
                {isMiss(row, col) && '💧'}
                {!isHit(row, col) && !isMiss(row, col) && getProbability(row, col) > 0 && 
                  `${Math.round(getProbability(row, col) * 100)}%`}
              </Cell>
            ))}
          </React.Fragment>
        ))}
      </Grid>
      
      {/* Legend */}
      <Legend>
        <LegendItem>
          <LegendColor type="hit" />
          <span>Hit</span>
        </LegendItem>
        <LegendItem>
          <LegendColor type="miss" />
          <span>Miss</span>
        </LegendItem>
        <LegendItem>
          <LegendColor type="probability" />
          <span>Probability</span>
        </LegendItem>
      </Legend>
      
      {loading && (
        <LoadingOverlay>
          Calculating probabilities...
        </LoadingOverlay>
      )}
    </BoardContainer>
  );
};

export default GameBoard;
