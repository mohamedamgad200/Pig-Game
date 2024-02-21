// Selecting elements
const scorePlayerZeroElement = document.querySelector('#score--0');
const scorePlayerOneElement = document.getElementById('score--1');
const playerZeroElement = document.querySelector('.player--0');
const playerOneElement = document.querySelector('.player--1');
const currentPlayerZeroElement = document.getElementById('current--0');
const currentPlayerOneElement = document.getElementById('current--1');
const diceElement = document.querySelector('.dice');
const btnNewGame = document.querySelector('.btn--new');
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//make function to initialize element to reuse it
// Starting conditions
let currentscore, activePlayer, scores, palying;

const init = function () {
  currentscore = 0;
  activePlayer = 0;
  scores = [0, 0];
  palying = true;

  scorePlayerZeroElement.textContent = 0;
  scorePlayerOneElement.textContent = 0;
  currentPlayerZeroElement.textContent = 0;
  currentPlayerOneElement.textContent = 0;

  diceElement.classList.add('hidden');
  playerOneElement.classList.remove('player--winner');
  playerZeroElement.classList.remove('player--winner');
  playerOneElement.classList.remove('player--active');
  playerZeroElement.classList.add('player--active');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentscore = 0;
  playerZeroElement.classList.toggle('player--active');
  playerOneElement.classList.toggle('player--active');
};

// Rolling dice functionality
btnRollDice.addEventListener('click', function () {
  if (palying) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${dice}.png`;

    // 3. Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentscore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentscore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (palying) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentscore;
    // scores[1] = scores[1] + currentScore

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});
btnNewGame.addEventListener('click', init);
