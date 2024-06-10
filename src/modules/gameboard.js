import Ship from './ship';

class Gameboard {
  constructor() {
    this.array = Array.from({ length: 10 }, () => Array(10).fill(null));
    this.missedAttacks = [];
    this.ships = [];
  }
  //one 5 ship, one 4 ship, 2 three ships, 2 two ships, one 1 ship
  placeShip(length, startX, startY, direction) {
    const ship = new Ship(length);
    this.ships.push(ship);
    if (direction === 'horizontal') {
      for (let i = 0; i < ship.length; i++) {
        this.array[startX][startY + i] = ship;
      }
    } else if (direction === 'vertical') {
      for (let i = 0; i < ship.length; i++) {
        this.array[startX + i][startY] = ship;
      }
    }
  }

  placeShips() {
    this.placeShip(5, 0, 0, 'horizontal');
    this.placeShip(3, 2, 2, 'vertical');
  }

  receiveAttack(row, col) {
    if (this.array[row][col]) {
      const ship = this.array[row][col];
      ship.hit();
    } else {
      this.missedAttacks.push([row, col]);
    }
  }

  isAllShipsSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }
}

export default Gameboard;
