import React from "react";
import GuessRow from "./GuessRow";

function Board(props) {
  const createBoard = () => {
    const grid = new Array(props.max_guesses);

    for (let row = 0; row < props.max_guesses; row++) {
      grid[row] = (
        <GuessRow
          max_letters={props.max_letters}
          key={row * 100 * Math.random()}
          myRow={row}
          currBoard={props.currBoard}
          setcurrBoard={props.setcurrBoard}
          currRow={props.currRow}
          setCurrRow={props.setCurrRow}
          currCol={props.currCol}
          setCurrCol={props.setCurrCol}
          wordColors={props.wordColors}
          currColors={props.currColors}
        />
      );
    }
    return grid;
  };

  return (
    <table className="grid">
      <tbody>{createBoard()}</tbody>
    </table>
  );
}

export default Board;
