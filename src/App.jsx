import React, { useState } from 'react';

const Matrix = () => {
  const initialMatrix = Array.from({ length: 3 }, () => Array(3).fill('white'));
  const [matrix, setMatrix] = useState(initialMatrix);
  const [clickSequence, setClickSequence] = useState([]);

  const handleClick = (rowIndex, colIndex) => {
    const alreadyClicked = matrix[rowIndex][colIndex] !== 'white';

    // Ignore click if the box is already clicked
    if (alreadyClicked) return;

    const newMatrix = matrix.map((row, rIdx) =>
      row.map((cell, cIdx) => (rIdx === rowIndex && cIdx === colIndex ? '#90EE90' : cell))
    );
    const newClickSequence = [...clickSequence, [rowIndex, colIndex]];

    if (newClickSequence.length === 9) {
      // Last box clicked, change all clicked boxes to orange in sequence
      newClickSequence.forEach(([r, c], index) => {
        setTimeout(() => {
          setMatrix((prevMatrix) =>
            prevMatrix.map((row, rIdx) =>
              row.map((cell, cIdx) => (rIdx === r && cIdx === c ? 'orange' : cell))
            )
          );
        }, index * 500);
      });
    }

    setMatrix(newMatrix);
    setClickSequence(newClickSequence);
  };

  return (
    <div style={styles.appContainer}>
      <h1 style={styles.heading}>Matrix Color Changer</h1>
      <div style={styles.container}>
        {matrix.map((row, rowIndex) =>
          row.map((color, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handleClick(rowIndex, colIndex)}
              style={{
                ...styles.box,
                backgroundColor: color,
              }}
            >
              {rowIndex * 3 + colIndex + 1}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',
    background: 'linear-gradient(135deg, #f0f8ff, #a1c4fd)',
    padding: '20px',
    boxSizing: 'border-box',
    fontFamily: "'Poppins', sans-serif",
  },
  heading: {
    marginBottom: '20px',
    fontSize: '3rem',
    color: '#333',
    textAlign: 'center',
    textShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 120px)',
    gap: '20px',
  },
  box: {
    width: '120px',
    height: '120px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px solid #000',
    borderRadius: '20px',
    cursor: 'pointer',
    boxShadow: '0 8px 15px rgba(0, 0, 0, 0.15)',
    transition: 'background-color 0.3s, transform 0.3s, box-shadow 0.3s',
    fontSize: '1.5rem',
    color: '#333',
    userSelect: 'none',
    position: 'relative',
    overflow: 'hidden',
  },
  boxHover: {
    backgroundColor: '#e0e0e0',
    transform: 'scale(1.1)',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
  },
};

export default Matrix;
