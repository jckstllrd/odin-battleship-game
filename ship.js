class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.sunk = false;
    this.orientation = 'H'
  }

  hit() {
    if (!this.sunk) {
      this.hits = this.hits + 1
      this.isSunk()
    };
  }

  isSunk() {
    if (this.hits >= this.length) this.sunk = true;
    return this.sunk;
  }
}

export { Ship };
