class Gameboard {
  constructor() {
    this.board = Array.from({ length: 10 }, () =>
      Array.from({ length: 10 }, () => null)
    );
    this.axis = "x";
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
        console.log("collision or out of bounds");

        return false;
      } else {
        coordSet.push([row, col]);
        row = row + 1;
      }
    }
    return coordSet;
  }

  // makeAttack(coords) {
  //   return true
  // }
}

export { Gameboard };
