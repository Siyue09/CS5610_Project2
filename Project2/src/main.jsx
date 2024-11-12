import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { GameProvider } from './context/GameContext';
import './index.css';

ReactDOM.render(
  <GameProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </GameProvider>,
  document.getElementById('root')
);
