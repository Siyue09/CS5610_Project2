import React from 'react';

const RulesPage = () => (
  <div className="rules">
    <h2>Game Rules</h2>
    <p>To win, reveal all safe spaces on the board without clicking a mine. Difficulty settings determine the size and mine count:</p>
    <ul>
      <li>Easy: 8x8 grid, 10 mines</li>
      <li>Medium: 16x16 grid, 40 mines</li>
      <li>Hard: 30x16 grid, 99 mines</li>
    </ul>
  </div>
);

export default RulesPage;
