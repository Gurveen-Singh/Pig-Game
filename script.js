'use strict';

//selecting Elements
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnModalOpen = document.querySelector('.show-modal');

const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const winnerEl = document.querySelector('.winner-txt');

const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;
let count = [0, 0];

//Function to set Initial state
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  winnerEl.textContent = '';
};

init();

//Function to open Modal
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

//Function to Close Modal
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

//Function to switch player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Function to roll dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    let dice = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove('hidden');

    diceEl.src = `Images/dice-${dice}.png`;

    if (dice != 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      btnHold.disabled = false;
    } else {
      btnHold.disabled = true;
      switchPlayer();
    }
  }
});

//Function to hold current score
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');

      count[activePlayer] += 1;

      count[!activePlayer] = 0;

      document.querySelector(`.win-count-${activePlayer}`).textContent =
        count[activePlayer];

      winnerEl.textContent = `Player ${activePlayer + 1} Won! 🎊`;

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      player0El.classList.remove('hidden');
      player0El.classList.remove('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player-active');
    } else {
      switchPlayer();
    }
  }
});

//Calling reset function
btnNew.addEventListener('click', init);

// Calling open modal function
btnModalOpen.addEventListener('click', openModal);

//Calling close modal function
btnCloseModal.addEventListener('click', closeModal);

overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
