import React, { useState } from "react";
import "./App.css";
import Board from "./Board.js";
import Keyboard from "./Keyboard.js";
import returnLists from "./dictionaries.js";
const alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const keyList = {
  q: "keyCap",
  w: "keyCap",
  e: "keyCap",
  r: "keyCap",
  t: "keyCap",
  y: "keyCap",
  u: "keyCap",
  i: "keyCap",
  o: "keyCap",
  p: "keyCap",
  a: "keyCap",
  s: "keyCap",
  d: "keyCap",
  f: "keyCap",
  g: "keyCap",
  h: "keyCap",
  j: "keyCap",
  k: "keyCap",
  l: "keyCap",
  Enter: "keyCap",
  z: "keyCap",
  x: "keyCap",
  c: "keyCap",
  v: "keyCap",
  b: "keyCap",
  n: "keyCap",
  m: "keyCap",
  Backspace: "keyCap",
};
const [matchDict, wordDict] = returnLists;
const wordColors = [];
const wordToGuess = wordDict[Math.floor(Math.random() * wordDict.length)];

function App() {
  const [currBoard, setCurrBoard] = useState(
    Array.from({ length: 6 }, () => Array.from({ length: 5 }, () => null))
  );
  const [currColors, setCurrColors] = useState(
    Array.from({ length: 6 }, () =>
      Array.from({ length: 5 }, () => "letterbox")
    )
  );
  const [currRow, setCurrRow] = useState(0);
  const [currCol, setCurrCol] = useState(0);
  let guessWord = "";
  let clearRow = (row) => {
    let boardCopy = [...currBoard];
    for (let index = 0; index < 5; index++) {
      boardCopy[row][index] = null;
    }
    setCurrBoard(boardCopy);
  };

  let colorGuess = () => {
    console.log(wordToGuess);
    let localColors = [...currColors];
    let greenList = [];
    let yellowList = [];
    let letter = "";

    let letterCounts = wordToGuess.split("").reduce((dict, curr) => {
      if (dict[curr]) {
        dict[curr]++;
      } else {
        dict[curr] = 1;
      }
      return dict;
    }, {});
    //set all to grays
    for (let index = 0; index < 5; index++) {
      localColors[currRow][index] = "letterbox gray";
    }
    //set all greens
    for (let index = 0; index < 5; index++) {
      letter = currBoard[currRow][index];
      if (wordToGuess[index] === letter) {
        localColors[currRow][index] = "letterbox green";
        letterCounts[letter]--;
        greenList.push(letter);
      }
    }
    //set yellows
    for (let index = 0; index < 5; index++) {
      letter = currBoard[currRow][index];
      if (letterCounts[letter] > 0) {
        if (wordToGuess.indexOf(letter) > -1) {
          localColors[currRow][index] = "letterbox yellow";
          letterCounts[letter]--;
          yellowList.push(letter);
        }
      }
      let letterColor = localColors[currRow][index].slice(9);
      if (letterColor !== "green") {
        keyList[letter] = "keyCap " + letterColor;
      }
    }
    setCurrColors(localColors);
  };

  let handleValidGuess = () => {
    guessWord = currBoard[currRow].reduce((prev, curr) => {
      return (prev += curr);
    }, "");
    if (matchDict.includes(guessWord) || wordDict.includes(guessWord)) {
      colorGuess();
      setCurrRow(currRow + 1);
    } else {
      console.log("invalid guess:(");
      clearRow(currRow);
    }
    setCurrCol(0);
  };

  const handleKeyClick = (letter) => {
    if (letter === "Backspace" && currCol !== 0) {
      let newBoard = [...currBoard];
      let prevCol = currCol;
      newBoard[currRow][prevCol - 1] = null;
      setCurrBoard(newBoard);
      setCurrCol(currCol - 1);
    } else if (letter === "Enter" && currCol === 5) {
      handleValidGuess();
    } else if (alphabet.includes(letter) && currCol < 5) {
      let newBoard = [...currBoard];
      newBoard[currRow][currCol] = letter;
      setCurrBoard(newBoard);
      setCurrCol(currCol + 1);
    }
  };

  return (
    <div className="App" /*onKeyDown={(event) => handleKeyClick(event.key)}*/>
      <header className="App-header">
        <p className="Title">Welcome to Wurdle</p>
        <Board
          max_guesses={6}
          max_letters={5}
          currBoard={currBoard}
          setCurrWord={setCurrBoard}
          currCol={currCol}
          setCurrCol={setCurrCol}
          currRow={currRow}
          setCurrRow={setCurrRow}
          wordColors={wordColors}
          currColors={currColors}
        />
        <Keyboard
          onClick={(letter) => handleKeyClick(letter)}
          colorsToUpdate={currColors}
          currBoard={currBoard}
          currRow={currRow}
          guessWord={guessWord}
          keyList={keyList}
        />
      </header>
    </div>
  );
}

export default App;
