'use strict';
//Selectig elements
const player1 = document.querySelector('.player1');
const player2 = document.querySelector('.player2');
const score1El = document.querySelector('#player1-score');
const score2El = document.querySelector('#player2-score');
const diceImg = document.querySelector('.diceImg');
const btnNew = document.querySelector('.btn-new');
const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');
const current1 = document.getElementById('current1');
const current2 = document.getElementById('current2');
const winner = document.getElementById('winner');
const currentBox1 = document.querySelector('.box1');
const currentBox2 = document.querySelector('.box2');
// initializations
let currentScore = 0, scores = [0, 0] ,activePlayer ,playing ;
function initializations(){
  currentScore = 0;
  scores = [0, 0];
  activePlayer = 1;
  playing = true;
}
initializations();

//Switch function
const switchPlayer = () => {
  currentScore = 0;
  document.getElementById(`current${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 1 ? 2 : 1;
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
  currentBox1.classList.toggle('box--active');
  currentBox2.classList.toggle('box--active');
};
//Starting Conditions
diceImg.classList.add('hidden');
//Dice roll function
btnRoll.addEventListener('click', function () {
  if (playing) {
    let dice = Math.trunc(Math.random() * 6) + 1;
    diceImg.classList.remove('hidden');
    diceImg.src = `images/${dice}.png`;
    if (dice !== 1) {
       currentScore += dice;
       document.getElementById(`current${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});
//Hold function
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer - 1] += currentScore;
    document.getElementById(`player${activePlayer}-score`).textContent =
      scores[activePlayer - 1];
    if (scores[activePlayer - 1] >= 100) {
      playing = false;
      diceImg.classList.add('hidden');
      winner.classList.remove('hidden');
      winner.textContent = `Player ${activePlayer} is the winner 🎉`;
      document
        .querySelector(`.player${activePlayer}`)
        .classList.add('player-winner');
    } else {
      switchPlayer();
    }
  }
});
//New Game function
btnNew.addEventListener('click', function () {

  initializations();
  score1El.textContent = '0';
  score2El.textContent = '0';
  current1.textContent = '0';
  current2.textContent = '0';

  diceImg.classList.add('hidden');
  winner.classList.add('hidden');
  player1.classList.add('player--active');
  player2.classList.remove('player--active');
  currentBox1.classList.add('box--active');
  currentBox2.classList.remove('box--active');

  player1.classList.remove('player-winner');
  player2.classList.remove('player-winner');
});
