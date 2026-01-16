import { Ship } from "./ship";

it("returns a ship object containing length, no. hits, orientation and ifSunk", () => {
  const ship = new Ship(3);

  expect(ship.orientation).toBe('H')
  expect(ship.length).toBe(3);
  expect(ship.hits).toBe(0);
  expect(ship.sunk).not.toBeTruthy();
});

it("increases the number of hits on a new object by +1", () => {
  const ship = new Ship(3);
  expect(ship.hits).toBe(0);
  ship.hit();
  expect(ship.hits).toBe(1);
});

it("does not increase hit count by 1 if already sunk", () => {
  const ship = new Ship(3);
  expect(ship.hits).toBe(0);
  ship.hit();
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.hits).toBe(3);
});

it("outputs true once the ship isSunk()", () => {
  const ship = new Ship(3);
  expect(ship.isSunk()).not.toBeTruthy();
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBeTruthy();
});
