import Player from './player';
import Gameboard from './gameboard';

const DOMHandler = (function () {
  let player = new Player('player');
  player.gameboard.placeShips();
  let computer = new Player('computer');
  computer.gameboard.placeShips();

  const createGrids = () => {
    const playerGrid = document.querySelector('.player-grid');
    playerGrid.innerHTML = '';
    player.gameboard.array.forEach((row, rowIndex) => {
      row.forEach((item, colIndex) => {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        gridItem.textContent = `${rowIndex} ${colIndex}`;
        gridItem.dataset.row = rowIndex;
        gridItem.dataset.col = colIndex;
        if (item) {
          gridItem.style.backgroundColor = 'grey';
        } else {
          gridItem.style.backgroundColor = 'lightblue';
        }
        gridItem.style.border = '1px solid';
        playerGrid.appendChild(gridItem);
      });
    });

    const computerGrid = document.querySelector('.computer-grid');
    computerGrid.innerHTML = '';
    computer.gameboard.array.forEach((row, rowIndex) => {
      row.forEach((item, colIndex) => {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        gridItem.textContent = `${rowIndex} ${colIndex}`;
        gridItem.dataset.row = rowIndex;
        gridItem.dataset.col = colIndex;
        if (item) {
          gridItem.style.backgroundColor = 'grey';
        } else {
          gridItem.style.backgroundColor = 'lightblue';
        }
        gridItem.style.border = '1px solid';
        computerGrid.appendChild(gridItem);
      });
    });

    const computerGridItems = document.querySelectorAll(
      '.computer-grid .grid-item'
    );
    computerGridItems.forEach((item) =>
      item.addEventListener('click', playerTurn)
    );
  };

  const computerTurn = () => {
    let row = Math.floor(Math.random() * 10);
    let col = Math.floor(Math.random() * 10);
    while (computer.gameboard.attacks.has(`${row},${col}`)) {
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
    }
    const isHit = player.gameboard.receiveAttack(row, col);
    const playerGridItems = document.querySelectorAll(
      '.player-grid .grid-item'
    );
    playerGridItems.forEach((item) => {
      if (item.dataset.row == row && item.dataset.col == col) {
        if (isHit) {
          item.style.backgroundColor = 'red';
        } else {
          item.textContent = 'X';
        }
      }
    });
    if (player.gameboard.isAllShipsSunk()) {
      endGame(false);
    }
  };

  const playerTurn = (e) => {
    const square = e.target;
    const row = square.dataset.row;
    const col = square.dataset.col;
    const isHit = computer.gameboard.receiveAttack(row, col);
    if (isHit === null) {
      return;
    }
    if (isHit) {
      square.style.backgroundColor = 'red';
    } else {
      square.textContent = 'X';
    }
    if (computer.gameboard.isAllShipsSunk()) {
      endGame(true);
    }
    computerTurn();
  };

  const endGame = (playerWon) => {
    const winDisplay = document.querySelector('.win-display');
    playerWon
      ? (winDisplay.textContent = 'You won!')
      : (winDisplay.textContent = 'You Lost!');
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset';
    resetButton.addEventListener('click', resetGame);
    winDisplay.appendChild(resetButton);
    const computerGridItems = document.querySelectorAll(
      '.computer-grid .grid-item'
    );
    computerGridItems.forEach((item) => item.removeEventListener('click', playerTurn));
  };

  const resetGame = () => {
    player = new Player('player');
    player.gameboard.placeShips();
    computer = new Player('computer');
    computer.gameboard.placeShips();
    createGrids();
    const winDisplay = document.querySelector('.win-display');
    winDisplay.innerHTML = '';
  };

  return { createGrids };
})();

export default DOMHandler;
