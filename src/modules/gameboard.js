class Gameboard {
  constructor() {
    this.board = Array.from({ length: 10 }, () =>
      Array.from({ length: 10 }, () => null)
    );
    this.fleet = [];
    this.axis = "x";
    this.misses = [];
  }

  placeShip(ship, coords) {
    let coordSet = [];

    if (this.axis == "x") {
      coordSet = this.placeX(ship, coords);
      this.placeX(ship, coords);
    } else if (this.axis == "y") {
      coordSet = this.placeY(ship, coords);
    }

    if (!coordSet) return false;
    for (let i = 0; i < coordSet.length; i++) {
      let row = coordSet[i][0];
      let col = coordSet[i][1];
      this.board[row][col] = ship;
    }
    this.fleet.push(ship);

    return true;
  }

  placeX(ship, coords) {
    let row = coords[0];
    let col = coords[1];
    let coordSet = [];
    for (let i = 0; i < ship.length; i++) {
      if (this.board[row][col] != null || row >= 10 || col >= 10) {
        return false;
      } else {
        coordSet.push([row, col]);
        col = col + 1;
      }
    }
    return coordSet;
  }

  placeY(ship, coords) {
    let row = coords[0];
    let col = coords[1];
    let coordSet = [];

    for (let i = 0; i < ship.length; i++) {
      if (row >= 10 || col >= 10 || this.board[row][col] != null) {
        return false;
      } else {
        coordSet.push([row, col]);
        row = row + 1;
      }
    }
    return coordSet;
  }

  receiveAttack(coords) {
    let row = coords[0];
    let col = coords[1];

    if (!this.board[row][col]) {
      this.misses.push(coords);
      return false;
    } else {
      let ship = this.board[row][col];
      ship.hits = ship.hits += 1;
      return true;
    }
  }

  isFleetSunk() {
    let shipsSunk = 0
    this.fleet.forEach(ship => {
      if(ship.hits == ship.length) shipsSunk = shipsSunk + 1
    });
    if (shipsSunk == this.fleet.length) return true

    return false
  }
}

export { Gameboard };
