'use strict';

import Game from '../modules/Game.class.js';

const game = new Game();

const fieldEl = document.querySelector('.game-field tbody');
const scoreEl = document.querySelector('.game-score');
const startBtn = document.querySelector('.start');

function render() {
  const state = game.getState();

  fieldEl.innerHTML = '';

  state.forEach((row) => {
    const rowEl = document.createElement('tr');

    row.forEach((cell) => {
      const cellEl = document.createElement('td');

      cellEl.classList.add('field-cell');

      if (cell > 0) {
        cellEl.classList.add(`field-cell--${cell}`);
        cellEl.textContent = cell;
      }
      rowEl.appendChild(cellEl);
    });

    fieldEl.appendChild(rowEl);
  });

  scoreEl.textContent = game.getScore();

  const messageWin = document.querySelector('.message-win');
  const messageLose = document.querySelector('.message-lose');
  const messageStart = document.querySelector('.message-start');

  messageWin.classList.toggle('hidden', status !== 'win');
  messageLose.classList.toggle('hidden', status !== 'lose');
  messageStart.classList.toggle('hidden', status !== 'idle');

  if (status === 'win') {
    alert('You win! 🎉');
  } else if (status === 'lose') {
    alert('Game over! 💀');
  }
}

startBtn.addEventListener('click', () => {
  if (game.getStatus() === 'idle') {
    game.start();
    startBtn.textContent = 'Restart';
  } else {
    game.restart();
  }
  render();
});

document.addEventListener('keydown', (e) => {
  let moved = false;

  switch (e.key) {
    case 'ArrowLeft':
      moved = game.moveLeft();
      break;
    case 'ArrowRight':
      moved = game.moveRight();
      break;
    case 'ArrowUp':
      moved = game.moveUp();
      break;
    case 'ArrowDown':
      moved = game.moveDown();
      break;
  }

  if (moved) {
    render();
  }
});

render();
