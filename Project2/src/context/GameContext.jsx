import React, { createContext, useState, useEffect } from 'react';

export const GameContext = createContext();

const generateGrid = (size, mines, safeCell = null) => {
  const grid = Array(size).fill(null).map(() => 
    Array(size).fill({ isMine: false, isRevealed: false, adjacentMines: 0, isFlagged: false })
  );

  // Place mines randomly, ensuring the first clicked cell (safeCell) is not a bomb
  let minesPlaced = 0;
  while (minesPlaced < mines) {
    const row = Math.floor(Math.random() * size);
    const col = Math.floor(Math.random() * size);

    // Avoid placing a mine at the first-clicked cell
    if ((!safeCell || (row !== safeCell.row || col !== safeCell.col)) && !grid[row][col].isMine) {
      grid[row][col] = { ...grid[row][col], isMine: true };
      minesPlaced++;
    }
  }

  // Calculate adjacent mines for each cell
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (!grid[r][c].isMine) {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (r + i >= 0 && r + i < size && c + j >= 0 && c + j < size && grid[r + i][c + j].isMine) {
              count++;
            }
          }
        }
        grid[r][c].adjacentMines = count;
      }
    }
  }

  return grid;
};

export const GameProvider = ({ children }) => {
  const [difficulty, setDifficulty] = useState('easy');
  const [size, setSize] = useState(8);
  const [mines, setMines] = useState(10);
  const [grid, setGrid] = useState(generateGrid(size, mines));
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");
  const [firstClick, setFirstClick] = useState(true);
  const [flagsLeft, setFlagsLeft] = useState(mines);

  useEffect(() => {
    resetGame();
  }, [difficulty]);

  const resetGame = () => {
    const config = {
      easy: { size: 8, mines: 10 },
      medium: { size: 16, mines: 40 },
      hard: { size: 30, mines: 99 },
    }[difficulty];
    setSize(config.size);
    setMines(config.mines);
    setGrid(generateGrid(config.size, config.mines));
    setGameOver(false);
    setMessage("");
    setFirstClick(true);
    setFlagsLeft(config.mines);
  };

  const moveMine = (grid, safeCell) => {
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (!grid[r][c].isMine && (r !== safeCell.row || c !== safeCell.col)) {
          grid[r][c].isMine = true;
          grid[safeCell.row][safeCell.col].isMine = false;
          return grid;
        }
      }
    }
    return grid;
  };

  const revealCell = (row, col) => {
    if (gameOver || grid[row][col].isRevealed || grid[row][col].isFlagged) return;

    const newGrid = grid.map(row => row.map(cell => ({ ...cell })));

    if (firstClick) {
      setFirstClick(false);
      if (newGrid[row][col].isMine) {
        setGrid(moveMine(newGrid, { row, col }));
      }
    }

    newGrid[row][col].isRevealed = true;

    if (newGrid[row][col].isMine) {
      setGameOver(true);
      setMessage("Game over! You lost!");
    } else if (newGrid[row][col].adjacentMines === 0) {
      // If the cell has no adjacent mines, clear surrounding cells
      autoClear(newGrid, row, col);
    } else if (checkWin(newGrid)) {
      setGameOver(true);
      setMessage("Game over! You Won!");
    }

    setGrid(newGrid);
  };

  const autoClear = (grid, row, col) => {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const newRow = row + i;
        const newCol = col + j;

        // Check boundaries and if the cell is already revealed
        if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size && !grid[newRow][newCol].isRevealed) {
          grid[newRow][newCol].isRevealed = true;

          // If adjacent cell has 0 mines around it, recurse
          if (grid[newRow][newCol].adjacentMines === 0) {
            autoClear(grid, newRow, newCol);
          }
        }
      }
    }
  };

  const flagCell = (row, col) => {
    if (gameOver || grid[row][col].isRevealed) return;

    const newGrid = grid.map(row => row.map(cell => ({ ...cell })));

    newGrid[row][col].isFlagged = !newGrid[row][col].isFlagged;
    setFlagsLeft(flagsLeft + (newGrid[row][col].isFlagged ? -1 : 1));
    setGrid(newGrid);
  };

  const checkWin = (grid) => {
    for (let row of grid) {
      for (let cell of row) {
        if (!cell.isRevealed && !cell.isMine) return false;
      }
    }
    return true;
  };

  return (
    <GameContext.Provider value={{ grid, revealCell, flagCell, resetGame, setDifficulty, message, gameOver, flagsLeft }}>
      {children}
    </GameContext.Provider>
  );
};
