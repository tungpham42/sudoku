import React from "react";
import { Container, Row, Form } from "react-bootstrap";

// Define constants for cell styles and sub-grid border styles
const cellStyle = {
  width: "50px",
  height: "50px",
  textAlign: "center",
  fontSize: "20px",
};

// Function to determine if a cell should be disabled
const shouldDisableCell = (cell, isInitial) => !isInitial;

// Function to determine the border style for each cell based on its sub-grid
const getCellBorderStyle = (rowIndex, colIndex) => {
  // Determine if the cell is on the top or bottom edge of a 3x3 sub-grid
  const isTopRow = rowIndex % 3 === 0;
  const isBottomRow = (rowIndex + 1) % 3 === 0;
  const isLeftColumn = colIndex % 3 === 0;
  const isRightColumn = (colIndex + 1) % 3 === 0;

  return {
    borderTop: isTopRow ? "1px solid #000" : "1px solid #ccc",
    borderLeft: isLeftColumn ? "1px solid #000" : "1px solid #ccc",
    borderBottom: isBottomRow ? "1px solid #000" : "1px solid #ccc",
    borderRight: isRightColumn ? "1px solid #000" : "1px solid #ccc",
  };
};

const SudokuCell = ({ value, onChange, disabled, style }) => (
  <Form.Control
    type="text"
    value={value}
    onChange={onChange}
    maxLength="1"
    className="sudoku-cell"
    style={{ ...cellStyle, ...style }}
    disabled={disabled}
  />
);

const SudokuBoard = ({ board, handleChange }) => (
  <Container style={{ minWidth: "460px" }}>
    {board.map((row, rowIndex) => (
      <Row key={rowIndex} className="justify-content-center">
        {row.map((cell, colIndex) => {
          // Determine if the cell is initially a 0
          const isInitial = cell === 0;
          const isDisabled = shouldDisableCell(cell, isInitial);
          const borderStyle = getCellBorderStyle(rowIndex, colIndex);

          return (
            <SudokuCell
              key={`${rowIndex}-${colIndex}`}
              value={isDisabled ? cell : ""}
              onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
              disabled={isDisabled}
              style={borderStyle}
            />
          );
        })}
      </Row>
    ))}
  </Container>
);

export default SudokuBoard;
