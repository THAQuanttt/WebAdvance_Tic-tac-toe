import { useState } from 'react';

import './App.css';
import Board from './components/Board';


export default function Game() {
  const [history, setHistory] = useState([{squares: Array(9).fill(null), location: {col:null, row:null}}]);
  const [currentMove, setCurrentMove] = useState(0);
  const [ascending, setAscending] = useState(false);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  // Set number row and column
  const rowNumber = 3;
  function handlePlay(nextSquares, index) {
    const row =  Math.floor(index / rowNumber);;
    const col = index % rowNumber;
    const nextHistory = [...history.slice(0, currentMove + 1), { squares: nextSquares, location: { col, row } }]; 
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }
  // Handle click Toggle sort button
  function handleToggleSort(){
    setAscending(!ascending);
  } 
  let moves = history.map((squares, move) => {
    // For the current move only, show “You are at move #…” instead of a button: 1.8 points
    let description;
    const {location} = squares;
    if (move === currentMove && move !==0)
    {
      description = 'You are at move #' + move + `(${location.row}), (${location.col})`;
      return (
        <li key={move}>
          <p >{description}</p>
        </li>
      );
    }
    else
    {
      // Display the location for each move in the format (row, col) in the move history list: 1.8 points.
      if (move > 0) {
        description = 'Go to move #' + move + `(${location.row}), (${location.col})`;
      } else {
        description = 'Game start';
      }
      return (
        <li key={move}>
          <button  onClick={() => jumpTo(move)}>{description}</button>
        </li>
      );
    }

  });

  if(ascending){
    moves = moves.reverse()
  }

  // Get square from history
  const {squares} = currentSquares;

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} 
                squares={squares} 
                onPlay={handlePlay} 
                rowNumber={rowNumber}
                 />
      </div>
      <div className="game-info">
        <button className='toggleButton' onClick={handleToggleSort}>
            {ascending ? 'Descending' : 'Ascending'}
          </button>
        <ol>{moves}</ol>
      </div>

    </div>
  );
}
