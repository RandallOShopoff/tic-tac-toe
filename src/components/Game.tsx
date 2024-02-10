import { useState } from "react";
import Board from "./Board";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares: string[] = history[currentMove];
  const xIsNext = currentMove % 2 === 0 ? true : false;
  const done = calculateWinner(currentSquares) === null ? false : true;

  function Header() {
    // Normally, game is going back and forth...
    let message: string = `Next player: ${xIsNext ? "X" : "O"}`;

    // Did someone win?
    if (done) {
      // Celebrate!
      message = `Winner is: ${!xIsNext ? "X" : "O"}`;

      // Are all squares used with no winner? Match is a draw.
    } else if (history.length > 9) message = "DRAW!";

    return (
      <>
        <p>{message}</p>
      </>
    );
  }

  function handlePlay(nextSquares: string[]) {
    // See if current and next square arrays are equal.  If so,
    // someone clicked on a previously occupied square.
    // No turn occurred.
    function arraysEqual<Type>(array1: Type[], array2: Type[]): boolean {
      if (array1.length === array2.length) {
        return array1.every((element, index) => {
          return element === array2[index] ? true : false;
        });
      }
      return false;
    }

    // Update history if a turn occurred.
    if (!arraysEqual(nextSquares, currentSquares)) {
      const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
      setHistory(nextHistory);
      setCurrentMove(nextHistory.length - 1);
    }
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  const moves = [];
  for (let move = 0; move <= history.length - 2; move++) {
    const description = move > 0 ? `Go to move #${move}` : "Go to game start";
    moves.push(
      <li key={`li-${move}`} className="text-sm py-0.5">
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>,
    );
  }
  const moveLabel = `You are at move #${currentMove}`;
  moves.unshift(<label key={"label-1"}>{moveLabel}</label>);

  return (
    <div className="bg-blue-900 w-full h-64 overflow-y-scroll">
      <div className="max-w-sm rounded shadow-lg">
        <div className="grid sm:grid-cols-2">
          <div className="px-6 py-4">
            <Header key={"header-1"} />
            <Board
              key={"Board-1"}
              xIsNext={xIsNext}
              squares={currentSquares}
              onPlay={handlePlay}
              done={done}
            />
          </div>
          <div className="game-info col-start-2 pr-3 pt-3">
            <ol key={"list-1"}>{moves}</ol>
          </div>
        </div>
      </div>
    </div>
  );
}

// See if someone won.
function calculateWinner(squares: (string | null)[]): string | null {
  // Winning square combinations...
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // For each winning combination, see if the squares in those
  // locations contain the same values.
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}
