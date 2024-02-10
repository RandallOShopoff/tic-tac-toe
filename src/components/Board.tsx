import Square from "./Square";

// IBoard is used to define input types.
interface IBoard {
  xIsNext: boolean; // Determines if X or O is placed in square
  squares: string[]; // The squares array of X's, O's and null values.
  onPlay: (input: string[]) => void; // Click handler
  done: boolean; // Flag that shuts off further play.
}

// The game board...
export default function Board({ xIsNext, squares, onPlay, done }: IBoard) {
  // Make the buttons...
  const squareArray = [];

  // shove created buttons into an array...
  for (let index = 0; index <= 8; index++) {
    const keyString = "Button-" + index.toString();
    squareArray.push(
      // key is unique identifier
      // label is either "X" or "O"
      // onSquareClick is the click handler for the square
      <Square
        myKey={keyString}
        label={squares[index]}
        onSquareClick={() => handleClick(index)}
      />,
    );
  }

  // Click handler
  function handleClick(i: number) {
    // Array.slice makes a copy of the array, unlike
    // Array.splice which mutates the array.
    const nextSquares = squares?.slice();

    // If there's a winner no need to update
    if (!done) {
      // Did the user click on an empty square?
      if (squares[i] === null) {
        // If it's X's turn fill square with X...
        if (xIsNext) nextSquares[i] = "X";
        // otherwise fill it with O
        else nextSquares[i] = "O";
      }
    }

    // Tell game to update.
    onPlay(nextSquares);
  }

  // Shove squareArray into a 3x3 grid.
  return (
    <>
      <div className="grid grid-cols-3 gap-4">{...squareArray}</div>
    </>
  );
}
