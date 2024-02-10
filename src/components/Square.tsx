import { MouseEventHandler } from "react";

// Easiest way to declare types for inputs using typescript...
interface ISquare {
  myKey: string; // Unique identifier
  label: string; // Displayed string on the button
  onSquareClick: MouseEventHandler<HTMLButtonElement>;
}

// Create squares(buttons) with unique identifier(key), label, and click handling function
const Square = ({ myKey, label, onSquareClick }: ISquare) => {
  return (
    <button
      key={myKey}
      className="m-0 p-0 size-12 text-center text-xl"
      onClick={onSquareClick}
    >
      {label}
    </button>
  );
};

export default Square;
