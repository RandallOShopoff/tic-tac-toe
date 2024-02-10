import Square from "./Square";

interface ISquareFactory {
  squares: string[];
  handleClick: (i: number) => void;
}

class SquareFactory {
  public prototype: object;

  constructor({ squares, handleClick }: ISquareFactory) {
    this.prototype = (
      <Square
        key={"Button-0"}
        value={squares[0] || ""}
        onSquareClick={() => handleClick(0)}
      />
    );
  }

  public clone() {
    const clone = Object.create(this);
    console.log(Object.keys);
    return clone;
  }
}

const squareFactory = SquareFactory;
export default squareFactory;
