import React from "react";

function Keyboard(props) {
  const createKeyboard = () => {
    let keyboard = new Array(3);
    for (let index = 0; index < 3; index++) {
      keyboard[index] = [];
      keyboard[index].push(<div className="keyrow" key={Math.random() * 30} />);
    }
    let rowNum = 0;
    let target = keyboard;
    for (let key in props.keyList) {
      if (key === "a" || key === "Enter") {
        rowNum++;
      }
      target[rowNum].push(
        <button
          className={props.keyList[key]}
          key={key}
          onClick={() => props.onClick(key)}
        >
          {key}
        </button>
      );
    }
    return keyboard;
  };

  return <div className="keyboard">{createKeyboard()}</div>;
}

export default Keyboard;
