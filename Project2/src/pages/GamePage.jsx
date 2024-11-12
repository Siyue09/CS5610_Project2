import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import Grid from '../component/Grid';

const GamePage = () => {
  const { resetGame, message, flagsLeft } = useContext(GameContext);

  return (
    <div className="game-page">
      <div className="game-info">
        <button onClick={resetGame} className="reset-button">Reset Game</button>
        <p className="flag-counter">Flags left: {flagsLeft}</p>
      </div>
      {message && <p className="message">{message}</p>}
      <Grid />
    </div>
  );
};

export default GamePage;
