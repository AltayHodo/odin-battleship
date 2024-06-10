class Ship {
  constructor(length) {
    this.length = length;
    this.numHits = 0;
  }

  hit() {
    this.numHits += 1;
  }

  isSunk() {
    return this.numHits >= this.length;
  }
}

export default Ship;
