import React from "react";

function Square(props) {
  /* return html element */
  return (
    <td className={props.currColors[props.myRow][props.myCol]}>
      {props.currBoard[props.myRow][props.myCol]}
    </td>
  );
}

export default Square;
