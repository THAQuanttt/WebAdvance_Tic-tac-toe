export default function Square({ value, onSquareClick, lineWinner, index }) {
    //  highlight the three squares that caused the win
    return (
      <button className={`square ${lineWinner && lineWinner.includes(index) ? 'winning' : ''}`}
       onClick={onSquareClick}>
        {value}
      </button>
    );
  }