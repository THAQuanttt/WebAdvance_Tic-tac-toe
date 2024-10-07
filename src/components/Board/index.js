import Square from '../Square';
import calculateWinner from '../../utils'

export default function Board({ xIsNext, squares, onPlay, rowNumber}) {
    function handleClick(i) {
      const {winner} = calculateWinner(squares)
      if ( winner|| squares[i]) {
        return;
      }
      const nextSquares = squares.slice();
      if (xIsNext) {
        nextSquares[i] = 'X';
      } else {
        nextSquares[i] = 'O';
      }
      onPlay(nextSquares, i);
    }
  
    // Get who is winner and list square of winner
    const {winner, line} = calculateWinner(squares);
  
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else if (squares.every(Boolean)) { 
      //  when no one wins, display a message about the result being a draw
      status = 'Draw!';
    } else {
      status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }
  
    // Rewrite the Board to use two loops to make the squares instead of hardcoding them: 1.8 points.
    const column = []
    for (let i=0; i<rowNumber; i++)
    {
      const row =[]
      for (let j=0;j<rowNumber ; j++)
        {
          const index = i * rowNumber + j;
          row.push(<Square value={squares[index]} index = {index} key={index} onSquareClick={() => handleClick(index)} lineWinner = {line}/>)
        } 
      column.push(<div className="board-row" key={i}>{row}</div>)
    }
    return (
      <>
        <div className="status">{status}</div>
        {column}
      </>
    );
  }