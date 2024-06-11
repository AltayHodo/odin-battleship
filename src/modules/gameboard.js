import Ship from './ship';

class Gameboard {
  constructor() {
    this.array = Array.from({ length: 10 }, () => Array(10).fill(null));
    this.attacks = new Set();
    this.ships = [];
  }

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

  canPlaceShip(length, startX, startY, direction) {
    if (direction === 'horizontal') {
      for (let i = 0; i < length; i++) {
        if (startY + i >= 10 || this.array[startX][startY + i]) {
          return false;
        }
      }
    } else if (direction === 'vertical') {
      for (let i = 0; i < length; i++) {
        if (startX + i >= 10 || this.array[startX + i][startY]) {
          return false;
        }
      }
    }
    return true;
  }

  randomPlaceShip(length) {
    const direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';
    let placed = false;
    while (!placed) {
      const startX = Math.floor(Math.random() * 10);
      const startY = Math.floor(Math.random() * 10);
      if (this.canPlaceShip(length, startX, startY, direction)) {
        this.placeShip(length, startX, startY, direction);
        placed = true;
      }
    }
  }

  randomPlaceShips() {
    const shipLengths = [5, 4, 3, 3, 2, 2, 1];
    shipLengths.forEach((length) => this.randomPlaceShip(length));
  }

  receiveAttack(row, col) {
    const attackKey = `${row},${col}`;
    if (this.attacks.has(attackKey)) {
      return null;
    }
    this.attacks.add(attackKey);
    if (this.array[row][col]) {
      const ship = this.array[row][col];
      ship.hit();
      return true;
    } else {
      return false;
    }
  }

  isAllShipsSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }
}

export default Gameboard;
