import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import RulesPage from './pages/RulesPage';
import DifficultySelector from './component/DifficultySelector';
import './App.css';

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {/* Conditionally render the navbar if not on the homepage */}
      {location.pathname !== "/" && (
        <nav className="navbar">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/rules" className="nav-link">Game Rules</Link>
        </nav>
      )}

      {/* Conditionally render the header with difficulty selector if not on the homepage */}
      {location.pathname !== "/" && (
        <header className="header">
          <Link to="/" className="title">Minesweeper</Link>
          <DifficultySelector />
        </header>
      )}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game/:difficulty" element={<GamePage />} />
        <Route path="/rules" element={<RulesPage />} />
      </Routes>
    </div>
  );
}

export default App;
