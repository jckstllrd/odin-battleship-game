import { Gameboard } from "./gameboard";
import { Ship } from "./ship";

it("should create an object with a 10x10 board in the constructor", () => {
  const gameboard = new Gameboard();
  let desiredBoard = Array.from({ length: 10 }, () =>
    Array.from({ length: 10 }, () => null)
  );

  expect(gameboard.board).toStrictEqual(desiredBoard);
});

it("should be able to invoke the placeShip() function", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);
  expect(gameboard.placeShip(ship, [1, 1])).toBeTruthy();
});

// give the placeShip function a ship and some coordinates and the function will update the provided gameboard
// the function should be able to understand what orientation the ship should be in
// if the ship is horizontal, we want to place the ship to the right
// if the ship is vertical, we want to place the ship going down
// if the ship length causes placing OOB then return error/false

it("should correctly place a ship at the given coordinates", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);
  gameboard.placeShip(ship, [1, 1]);

  expect(gameboard.board[1][1]).not.toBeNull();
  expect(gameboard.board[1][2]).not.toBeNull();
  expect(gameboard.board[1][3]).not.toBeNull();
});

it("should correctly place a ship based on orientation of gameboard", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);
  gameboard.axis = "y";
  gameboard.placeShip(ship, [1, 1]);

  expect(gameboard.board[1][1]).not.toBeNull();
  expect(gameboard.board[2][1]).not.toBeNull();
  expect(gameboard.board[3][1]).not.toBeNull();
});

it("should not place a ship if there is already a ship there", () => {
  const gameboard = new Gameboard();
  const shipOne = new Ship(3);
  gameboard.placeShip(shipOne, [1, 1]);
  const shipTwo = new Ship(3);

  expect(gameboard.placeShip(shipTwo, [1, 1])).not.toBeTruthy();
});

it("should not place a ship if there will be a collision", () => {
  const gameboard = new Gameboard();
  const shipOne = new Ship(3);
  gameboard.placeShip(shipOne, [5, 1]);
  const shipTwo = new Ship(5);
  gameboard.axis = "y";
  expect(gameboard.placeShip(shipTwo, [1, 1])).not.toBeTruthy();
});

it("should not place a ship if it will go out of bounds", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);
  expect(gameboard.placeShip(ship, [1, 9])).not.toBeTruthy();
});

it("should not place a ship if it will go out of bounds", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);
  gameboard.axis = "y";
  expect(gameboard.placeShip(ship, [9, 1])).not.toBeTruthy();
});

// it("should be able to call makeAttack() on a gameboard", () => {
//   const gameboard = new Gameboard();
//   expect(gameboard.makeAttack()).toHaveBeenCalled();
// });

// it("should be able to call makeAttack() on a gameboard", () => {
//   const gameboard = new Gameboard();
//   const ship = new Ship(3)
//   gameboard.placeShip(ship, [1,1])
//   expect(gameboard.makeAttack([1,1])).toBeTruthy();
// });

// it("should keep track of missed shorts", () => {
//   const gameboard = new Gameboard();
//   expect(gameboard).toBeCalled(1);
// });

// it("should be able to report if all of their ships have been sunk", () => {
//   const gameboard = new Gameboard();
//   expect(gameboard).toBeCalled(1);
// });
