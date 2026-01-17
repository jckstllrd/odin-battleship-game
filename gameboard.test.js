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

/** ReceiveAttack function
 *
 * - DONE should take a pair of coords
 * - DONE should determine if the coords have hit a ship or have missed
 * - DONE should invoke hit on the ship if one has been hit
 * - DONE if missed should record the coords into an array, as an attribute of gameboard
 * - should be able to report if all ships have been sunk (this should be a private function that receiveAttack potentially calls after making a hit?)
 */

it("receiveAttack should return true and mark a ship hit when attacking an occupied cell", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(2);
  gameboard.placeShip(ship, [0, 0]);

  // Attack the location where the ship is placed
  expect(gameboard.receiveAttack([0, 0])).toBeTruthy();

  expect(ship.hits).toBe(1);
});

it("receiveAttack should return false and record coords when attacking an empty cell", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(2);
  gameboard.placeShip(ship, [0, 0]);

  // Attack the location where there is no ship and record the miss
  expect(gameboard.receiveAttack([9, 9])).not.toBeTruthy();
  expect(gameboard.misses.at(-1)).toEqual([9, 9]);
  expect(ship.hits).toBe(0);
});

it("placeShip should add the ship to the gameboards fleet of ships", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(2);
  gameboard.placeShip(ship, [0, 0]);

  // Attack the location where there is no ship and record the miss
  expect(gameboard.fleet.at(-1)).toEqual(ship)
});

// fleetSunk function checks to see if hits == length for each ship on gameboard
it("isFleetSunk reports true if all ships have been sunk on gameboard", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(2);
  gameboard.placeShip(ship, [0, 0]);

  gameboard.receiveAttack([0,0])
  gameboard.receiveAttack([0,1])

  // Attack the location where there is no ship and record the miss
  expect(ship.hits).toBe(2)
  expect(gameboard.isFleetSunk()).toBeTruthy();
});

it("isFleetSunk reports false if every ship not sunk", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(2);
  gameboard.placeShip(ship, [0, 0]);

  gameboard.receiveAttack([0,0])
  gameboard.receiveAttack([0,2])

  // Attack the location where there is no ship and record the miss
  expect(ship.hits).toBe(1)
  expect(gameboard.isFleetSunk()).not.toBeTruthy();
});




// TODO: can come back to this
// potentially make sure you can't attack the same coordinates twice 
// it("ensures you cannot attack a cell twice", () => {
//   const gameboard = new Gameboard();
//   const ship = new Ship(2);
//   gameboard.placeShip(ship, [0, 0]);

//   gameboard.receiveAttack([0,0])
//   expect(gameboard.receiveAttack([0,0])).toBeFalsy()
//   expect(gameboard.attacks.at(-1)).toEqual([0,0])
// })