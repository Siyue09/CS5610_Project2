import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameContext } from '../context/GameContext';

const DifficultySelector = () => {
  const { setDifficulty } = useContext(GameContext);
  const navigate = useNavigate();

  const handleDifficultyChange = (difficulty) => {
    setDifficulty(difficulty);
    navigate(`/game/${difficulty}`);
  };

  return (
    <div className="difficulty-selector">
      <button onClick={() => handleDifficultyChange('easy')}>Easy</button>
      <button onClick={() => handleDifficultyChange('medium')}>Medium</button>
      <button onClick={() => handleDifficultyChange('hard')}>Hard</button>
    </div>
  );
};

export default DifficultySelector;
