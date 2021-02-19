import React, { useState } from "react";
import random from "lodash/random";

import { ch_join, ch_push } from './socket';

function Bulls() {

  const [state, setState] = useState({
    secret : getRandomNum(),
    guesses: [],
  });
  const [text, setText] = useState("");
  const [warning, setWarning] = useState("");


  let {secret, guesses} = state;

  let view = secret.split('');
  let lives = lives_left(secret, guesses);
  let bulls = bullsandcows(secret, guesses);


  useEffect(() => {
     ch_join(setState);
   });

  function makeGuesses(arr) {
    let guesses = arr;
    let state1 = Object.assign({}, state, {guesses});
    setState(state1);
  }

  function getRandomNum() {
    let numArray = [0,1,2,3,4,5,6,7,8,9]
    let one = 0;
    let two = 0;
    let three = 0;
    let four = 0;
    let number = "";
    let index = random(1, 9);
    one = numArray[index];
    numArray.splice(index, 1);
    index = random(0, 8);
    two = numArray[index];
    numArray.splice(index, 1);
    index = random(0, 7);
    three = numArray[index];
    numArray.splice(index, 1);
    index = random(0, 6);
    four = numArray[index];
    number = one.toString() + two.toString()
            + three.toString() + four.toString();
    return number;
  }

  function updateText(ev) {
    let vv = ev.target.value;
    ch_push({number: text});
  //  setText(vv);
  }

  function noLetters(guess) {
    let arr = guess.split("").slice(0, 4);
    let noAlpha = true;
    for (let i = 0; i < arr.length; i++) {
      if (!(arr[i] <= '9' && arr[i] >= '0')) {
        noAlpha = false;
      }
    }
    return noAlpha;
  }

  function guess() {
    let array = [];
    if (text.length !== 4) {
      setWarning("guess must be 4 digits");
    } else if (!noLetters(text)) {
      setWarning("guess must only include numbers");
    } else if (text.charAt(0) === text.charAt(1)
               || text.charAt(0) === text.charAt(2)
               || text.charAt(0) === text.charAt(3)
               || text.charAt(1) === text.charAt(2)
               || text.charAt(1) === text.charAt(3)
               || text.charAt(2) === text.charAt(3)) {
      setWarning("guess must not include repeats");
    } else {
    array[0] = text
    setWarning("");
    makeGuesses(guesses.concat(array));
    }
    document.getElementById('userInput').value = "";
  }


  function keyPress(ev) {
    if (ev.key === "Enter") {
      guess();

    }
  }

  if (bulls[bulls.length - 1] === "4B0C") {
    return (
      <div className="App">
        <h1>You Win!</h1>
        <p>
          <button onClick={() => reloadGame()}>
            Play Again
            </button>
        </p>
      </div>
    );
  }

  if (lives <= 0) {
    return (
      <div className="App">
        <h1>Game Over!</h1>
        <p>
          <button onClick={() => reloadGame()}>
            Try Again
          </button>
        </p>
        <h4>The answer was {secret}</h4>
      </div>
    );
  }

  return (
    <div className="App">
    <h1>BULLS AND COWS!!!</h1>
      <div>
      <table>
        <tr>
          <th></th>
          <th>guess</th>
          <th>result</th>
        </tr>
        <tr>
          <td>1</td>
          <td>{guesses[0]}</td>
          <td>{bulls[0]}</td>
        </tr>
        <tr>
          <td>2</td>
          <td>{guesses[1]}</td>
          <td>{bulls[1]}</td>
        </tr>
        <tr>
          <td>3</td>
          <td>{guesses[2]}</td>
          <td>{bulls[2]}</td>
        </tr>
        <tr>
          <td>4</td>
          <td>{guesses[3]}</td>
          <td>{bulls[3]}</td>
        </tr>
        <tr>
          <td>5</td>
          <td>{guesses[4]}</td>
          <td>{bulls[4]}</td>
        </tr>
        <tr>
          <td>6</td>
          <td>{guesses[5]}</td>
          <td>{bulls[5]}</td>
        </tr>
        <tr>
          <td>7</td>
          <td>{guesses[6]}</td>
          <td>{bulls[6]}</td>
        </tr>
        <tr>
          <td>8</td>
          <td>{guesses[7]}</td>
          <td>{bulls[7]}</td>
        </tr>
      </table>
      </div>
      <h1>Lives: {lives}</h1>
      <h4>{warning}</h4>
      <p>
        <input
          id="userInput"
          type="text"
          pattern="\d{4}"
          maxLength="4"
          onChange={updateText}
          onKeyPress={keyPress}
        />
        <button onClick={guess}>Guess</button>
      </p>

      <p>
        <button onClick={() => reloadGame()}>
          Reset
        </button>
      </p>
    </div>
  );
}

function reloadGame() {
  window.location.reload();
}


function bullsandcows(secret, guesses) {
  let correctNum = secret.split("");
  let BCarray = [];
  for (let g = 0; g < guesses.length; g++) {
    let currGuess = guesses[g];
    let currArray = currGuess.split("");
    let bulls = 0;
    let cows = 0;
    let returnBC = "";

    for (let i = 0; i < 4; i++) {
      if (currArray[i] === correctNum[i]) {
        bulls = bulls + 1;
      } else {
        for (let j = 0; j < 4; j++) {
          if (currArray[i] === correctNum[j]) {
            cows = cows + 1;
          }
        }
      }
    }
    returnBC = bulls.toString() + "B" + cows.toString() + "C";
    BCarray[g] = returnBC ;
  }
  return BCarray;
}


function lives_left(secret, guesses) {
  return 8 - guesses.length;
}

export default Bulls;
