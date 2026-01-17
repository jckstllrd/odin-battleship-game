import { Gameboard } from "./gameboard";
import { Player } from "./player";
import { Ship } from "./ship";

// TODO: add a module to manage if there's a winner

// Driver code

const gameController = (function () {
  const runGame = () => {
    let playerShipOne = new Ship(3);
    let playerShipTwo = new Ship(2);

    let computerShipOne = new Ship(3);
    let computerShipTwo = new Ship(2);

    let player = new Player("human");
    let computer = new Player("computer");

    player.gameboard.placeShip(playerShipOne, [0, 0]);
    player.gameboard.placeShip(playerShipTwo, [1, 0]);

    computer.gameboard.placeShip(computerShipOne, [0, 0]);
    computer.gameboard.placeShip(computerShipTwo, [1, 0]);

    console.log(player);
    console.log(computer);
  };
  return { runGame };
})();

export { gameController };
