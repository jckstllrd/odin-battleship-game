import { Player } from "../modules/player";

/**
 * Player Class:
 * - two types of players
 *      - real players
 *      - computer players
 * - each player should have their own gameboard
 * -
 */

it("should create a player class with a type, and a gameboard", () => {
  const player = new Player("human");

  expect(player.type).toEqual("human");
  expect(player.gameboard).toBeTruthy();
});

