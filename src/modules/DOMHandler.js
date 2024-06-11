import Player from './player';
import Gameboard from './gameboard';

const DOMHandler = (function () {
  let player = new Player('player');
  let computer = new Player('computer');
  let currentShipLength = 5;
  let currentDirection = 'horizontal';
  let placingShips = true;
  const orientationContainer = document.querySelector('.orientation-container');

  const updatePhaseText = () => {
    const phaseText = document.querySelector('.phase-text');
    if (placingShips) {
      phaseText.textContent = `Placing ships: Place a ship of length ${currentShipLength}`;
    } else {
      phaseText.textContent = 'Playing the game: Attack the enemy grid!';
    }
  };

  const createGrids = () => {
    const playerGrid = document.querySelector('.player-grid');
    playerGrid.innerHTML = '';
    player.gameboard.array.forEach((row, rowIndex) => {
      row.forEach((item, colIndex) => {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        gridItem.dataset.row = rowIndex;
        gridItem.dataset.col = colIndex;
        if (item) {
          gridItem.style.backgroundColor = 'grey';
        } else {
          gridItem.style.backgroundColor = 'lightblue';
        }
        gridItem.style.border = '1px solid';
        if (placingShips) {
          gridItem.addEventListener('click', handlePlaceShip);
        }
        playerGrid.appendChild(gridItem);
      });
    });

    const computerGrid = document.querySelector('.computer-grid');
    computerGrid.innerHTML = '';
    computer.gameboard.array.forEach((row, rowIndex) => {
      row.forEach((item, colIndex) => {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        gridItem.dataset.row = rowIndex;
        gridItem.dataset.col = colIndex;
        gridItem.style.backgroundColor = 'lightblue';
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

    updatePhaseText();
  };

  const updateDirection = (e) => {
    currentDirection = e.target.value;
  };

  const radioButtons = document.querySelectorAll('input[type="radio"]');
  radioButtons.forEach((button) =>
    button.addEventListener('click', updateDirection)
  );

  const handlePlaceShip = (e) => {
    const row = parseInt(e.target.dataset.row);
    const col = parseInt(e.target.dataset.col);
    if (
      player.gameboard.canPlaceShip(
        currentShipLength,
        row,
        col,
        currentDirection
      )
    ) {
      player.gameboard.placeShip(currentShipLength, row, col, currentDirection);
      switch (currentShipLength) {
        case 5:
          currentShipLength = 4;
          break;
        case 4:
          currentShipLength = 3;
          break;
        case 3:
          currentShipLength = 2;
          break;
        case 2:
          currentShipLength = 1;
          break;
        case 1:
          placingShips = false;
          computer.gameboard.randomPlaceShips();
          orientationContainer.style.display = 'none';
          createGrids();
          break;
      }
      createGrids();
    } else {
      alert('Cannot place ship here. Try a different location or direction.');
    }
  };

  const highlightSunkShip = (ship, gridClass) => {
    const gridItems = document.querySelectorAll(`.${gridClass} .grid-item`);
    gridItems.forEach((item) => {
      const row = parseInt(item.dataset.row);
      const col = parseInt(item.dataset.col);
      if (
        gridClass === 'computer-grid' &&
        computer.gameboard.array[row][col] === ship
      ) {
        item.style.border = '3px solid darkred';
      } else if (
        gridClass === 'player-grid' &&
        player.gameboard.array[row][col] === ship
      ) {
        item.style.border = '3px solid darkred';
      }
    });
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

    player.gameboard.ships.forEach((ship) => {
      if (ship.isSunk()) {
        highlightSunkShip(ship, 'player-grid');
      }
    });

    if (player.gameboard.isAllShipsSunk()) {
      endGame(false);
    }
  };

  const playerTurn = (e) => {
    if (placingShips) return;
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

    computer.gameboard.ships.forEach((ship) => {
      if (ship.isSunk()) {
        highlightSunkShip(ship, 'computer-grid');
      }
    });

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
    computerGridItems.forEach((item) =>
      item.removeEventListener('click', playerTurn)
    );
  };

  const resetGame = () => {
    player = new Player('player');
    computer = new Player('computer');
    currentShipLength = 5;
    currentDirection = 'horizontal';
    placingShips = true;
    orientationContainer.style.display = 'block';
    createGrids();
    const winDisplay = document.querySelector('.win-display');
    winDisplay.innerHTML = '';
  };

  return { createGrids };
})();

export default DOMHandler;
