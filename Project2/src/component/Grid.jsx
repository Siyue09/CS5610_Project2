import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import Cell from './Cell';

const Grid = () => {
  const { grid } = useContext(GameContext);

  return (
    <div className="grid" style={{ gridTemplateColumns: `repeat(${grid.length}, 30px)` }}>
      {grid.map((row, rowIndex) =>
        row.map((cell, cellIndex) => (
          <Cell key={`${rowIndex}-${cellIndex}`} cellData={cell} rowIndex={rowIndex} cellIndex={cellIndex} />
        ))
      )}
    </div>
  );
};

export default Grid;
