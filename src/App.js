import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import SudokuBoard from "./SudokuBoard";

// Helper function to check if a number can be placed in the given row, column, and 3x3 grid
const isValid = (board, row, col, num) => {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num || board[i][col] === num) return false;

    const boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
    const boxCol = 3 * Math.floor(col / 3) + (i % 3);
    if (board[boxRow][boxCol] === num) return false;
  }
  return true;
};

// Backtracking function to generate a valid full board
const generateBoard = (board) => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        const nums = [...Array(9).keys()].map((i) => i + 1); // [1, 2, 3, ..., 9]
        nums.sort(() => Math.random() - 0.5); // Shuffle numbers to randomize choices

        for (let num of nums) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num;

            if (generateBoard(board)) return true;

            board[row][col] = 0;
          }
        }
        return false; // Trigger backtracking
      }
    }
  }
  return true;
};

// Function to remove numbers from the board to create a puzzle
const removeNumbers = (board, difficulty = 40) => {
  const newBoard = board.map((row) => [...row]);
  let cellsToRemove = difficulty;

  while (cellsToRemove > 0) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);

    if (newBoard[row][col] !== 0) {
      newBoard[row][col] = 0;
      cellsToRemove--;
    }
  }

  return newBoard;
};

// Check if each row contains unique numbers (1-9)
const checkRows = (board) => {
  for (let row = 0; row < 9; row++) {
    const seen = new Set();
    for (let col = 0; col < 9; col++) {
      const value = board[row][col];
      if (value === 0 || seen.has(value)) return false;
      seen.add(value);
    }
  }
  return true;
};

// Check if each column contains unique numbers (1-9)
const checkCols = (board) => {
  for (let col = 0; col < 9; col++) {
    const seen = new Set();
    for (let row = 0; row < 9; row++) {
      const value = board[row][col];
      if (value === 0 || seen.has(value)) return false;
      seen.add(value);
    }
  }
  return true;
};

// Check if each 3x3 subgrid contains unique numbers (1-9)
const checkSubgrids = (board) => {
  for (let gridRow = 0; gridRow < 9; gridRow += 3) {
    for (let gridCol = 0; gridCol < 9; gridCol += 3) {
      const seen = new Set();
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          const value = board[gridRow + row][gridCol + col];
          if (value === 0 || seen.has(value)) return false;
          seen.add(value);
        }
      }
    }
  }
  return true;
};

function App() {
  const [board, setBoard] = useState([]);

  // Function to generate a new randomized board
  const generateNewBoard = () => {
    const emptyBoard = Array(9)
      .fill(0)
      .map(() => Array(9).fill(0));
    generateBoard(emptyBoard); // Generate a valid complete Sudoku board
    const puzzle = removeNumbers(emptyBoard, 40); // Remove numbers for the puzzle
    setBoard(puzzle); // Set the new board
  };

  const handleChange = (row, col, value) => {
    const newBoard = [...board];
    newBoard[row][col] = parseInt(value) || 0;
    setBoard(newBoard);
  };

  const checkSolution = () => {
    if (checkRows(board) && checkCols(board) && checkSubgrids(board)) {
      alert("Congratulations! This is a valid solution.");
    } else {
      alert("Oops! The solution is not valid. Please check again.");
    }
  };

  const resetBoard = () => {
    generateNewBoard(); // Generate a new random board
  };

  useEffect(() => {
    generateNewBoard(); // Generate board when the component mounts
  }, []);

  return (
    <Container className="text-center mt-5">
      <h1>Sudoku</h1>
      <SudokuBoard board={board} handleChange={handleChange} />
      <Button variant="primary" onClick={checkSolution} className="mt-3 me-3">
        Check Solution
      </Button>
      <Button variant="secondary" onClick={resetBoard} className="mt-3 ml-2">
        New Puzzle
      </Button>
    </Container>
  );
}

export default App;
