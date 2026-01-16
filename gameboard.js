class Gameboard {
  constructor() {
    this.board = Array.from({ length: 10 }, () =>
      Array.from({ length: 10 }, () => null)
    );
  }

  placeShip(ship, coords) {
    let row = coords[0];
    let col = coords[1];
    let coordSet = [];

    // if ship horizontal, check if leading spaces are available
    if (ship.orientation == "h") {
      for (let i = 0; i < ship.length; i++) {
        // console.log(this.board);
        // console.log('here');
        if (this.board[row][col] != null || row >= 10 || col >= 10) {
          return false;
        } else {
          coordSet.push([row, col]);
          col = col + 1;
        }
      }
    }
    // if ship is vertical, check if leading spaces are available
    else if (ship.orientation == "v") {
      for (let i = 0; i < ship.length; i++) {
        if (row >= 10 || col >= 10 || this.board[row][col] != null) {
          return false;
        } else {
          coordSet.push([row, col]);
          row = row + 1;
        }
      }
    }

    for (let i = 0; i < coordSet.length; i++) {
      row = coordSet[i][0];
      col = coordSet[i][1];
      this.board[row][col] = ship;
    }

    return true;
  }
}

export { Gameboard };
