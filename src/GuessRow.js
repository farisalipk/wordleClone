import React from "react";
import Square from "./Square";

function GuessRow(props) {
  const {
    max_letters,
    myRow,
    currBoard,
    setcurrBoard,
    currRow,
    setCurrRow,
    currCol,
    setCurrCol,
    wordColors,
    currColors,
  } = props;
  const createNewRow = () => {
    const row = new Array(max_letters);
    for (let col = 0; col < max_letters; col++) {
      row.push(
        <Square
          status="tbd"
          key={col * Math.random()}
          myRow={myRow}
          myCol={col}
          currBoard={currBoard}
          setcurrBoard={setcurrBoard}
          currRow={currRow}
          setCurrRow={setCurrRow}
          currCol={currCol}
          setCurrCol={setCurrCol}
          wordColors={wordColors}
          currColors={currColors}
        />
      );
    }
    return row;
  };

  return <tr className="guessrow">{createNewRow()}</tr>;
}

export default GuessRow;
