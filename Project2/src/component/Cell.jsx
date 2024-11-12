import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';

const Cell = ({ cellData, rowIndex, cellIndex }) => {
  const { revealCell, flagCell } = useContext(GameContext);

  const handleClick = (event) => {
    if (event.shiftKey) {
      flagCell(rowIndex, cellIndex);
    } else {
      revealCell(rowIndex, cellIndex);
    }
  };

  const handleRightClick = (event) => {
    event.preventDefault();
    flagCell(rowIndex, cellIndex);
  };

  return (
    <div
      className={`cell ${cellData.isRevealed ? (cellData.isMine ? 'mine' : 'safe') : 'unselected'} ${cellData.isFlagged ? 'flagged' : ''}`}
      onClick={handleClick}
      onContextMenu={handleRightClick}
    >
      {cellData.isRevealed && !cellData.isMine ? cellData.adjacentMines : ""}
      {cellData.isFlagged && !cellData.isRevealed ? "🚩" : ""}
      {cellData.isRevealed && cellData.isMine ? "💣" : ""}
    </div>
  );
};

export default Cell;
