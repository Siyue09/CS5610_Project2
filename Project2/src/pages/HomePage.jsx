import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <div className="homepage">
    <h1 className="game-title">Minesweeper</h1>
    <div className="difficulty-options">
      <Link to="/game/easy" className="difficulty-button">Easy</Link>
      <Link to="/game/medium" className="difficulty-button">Medium</Link>
      <Link to="/game/hard" className="difficulty-button">Hard</Link>
    </div>
    <Link to="/rules" className="rules-link">Game Rules</Link>
  </div>
);

export default HomePage;
