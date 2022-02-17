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
let gameOver = false;
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
    let yellowList = {};

    //letterCounts will store each letter and how many times it appears in the word
    let letterCounts = {};

    //set all to grays and fill letterCounts dict
    for (let index = 0; index < 5; index++) {
      localColors[currRow][index] = "letterbox gray";
      keyList[currBoard[currRow][index]] = "keyCap gray";
      let wordLetter = wordToGuess[index];
      if (letterCounts[wordLetter]) {
        letterCounts[wordLetter]++;
      } else {
        letterCounts[wordLetter] = 1;
      }
    }

    //set all colors appropriately
    for (let index = 0; index < 5; index++) {
      let letter = currBoard[currRow][index];
      if (wordToGuess[index] === letter) {
        let yellowInd = yellowList[letter];
        if (yellowInd > -1 && yellowInd < index && letterCounts[letter] === 0) {
          localColors[currRow][yellowInd] = "letterbox gray";
        }
        keyList[letter] = "keyCap green";
        localColors[currRow][index] = "letterbox green";
        greenList.push(letter);
      } else {
        /*not green*/
        if (letterCounts[letter] > 0) {
          /*yellow*/
          yellowList[letter] = index;
          localColors[currRow][index] = "letterbox yellow";
          keyList[letter] = "keyCap yellow";
        }
      }
      letterCounts[letter]--;
    }
    setCurrColors(localColors);
  };

  let handleValidGuess = () => {
    guessWord = currBoard[currRow].reduce((prev, curr) => {
      return (prev += curr);
    }, "");
    if (gameOver) {
      alert("game over!");
    } else if (matchDict.includes(guessWord) || wordDict.includes(guessWord)) {
      colorGuess();
      let gameWon = true;
      for (let index = 0; index < 5; index++) {
        if (currColors[currRow][index] !== "letterbox green") {
          gameWon = false;
        }
      }
      if (gameWon) {
        document.getElementById("wB").className = "winBox show";
        setTimeout(() => {
          document.getElementById("wB").className = "winBox";
        }, 4000);
        gameOver = true;
      } else {
        setCurrRow(currRow + 1);
      }
    } else {
      document.getElementById("iB").className = "invalidBox show";
      setTimeout(() => {
        document.getElementById("iB").className = "invalidBox";
      }, 1500);
      clearRow(currRow);
    }
    setCurrCol(0);
  };

  const handleKeyClick = (letter) => {
    if (!gameOver) {
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
    }
  };

  return (
    <div className="App" /*onKeyDown={(event) => handleKeyClick(event.key)}*/>
      <header className="App-header">
        <p className="Title">WalmartWordle</p>
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
        <div className="invalidBox" id="iB">
          Invalid Guess
        </div>
        <div className="winBox" id="wB">
          Good Work!
        </div>
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
