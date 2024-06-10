import Player from './player';
import Gameboard from './gameboard';

const DOMHandler = (function () {
  const player = new Player('player');
  player.gameboard.placeShips();
  const computer = new Player('computer');
  computer.gameboard.placeShips();

  const createGrids = () => {
    const playerGrid = document.querySelector('.player-grid');
    player.gameboard.array.forEach((col, colIndex) => {
      const gridColumn = document.createElement('div');
      gridColumn.classList.add('grid-column');
      col.forEach((item, rowIndex) => {
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
        gridColumn.appendChild(gridItem);
      });
      playerGrid.appendChild(gridColumn);
    });

    const computerGrid = document.querySelector('.computer-grid');
    computer.gameboard.array.forEach((col, colIndex) => {
      const gridColumn = document.createElement('div');
      gridColumn.classList.add('grid-column');
      col.forEach((item, rowIndex) => {
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
        gridColumn.appendChild(gridItem);
      });
      computerGrid.appendChild(gridColumn);
    });
  };

  return { createGrids };
})();

export default DOMHandler;
