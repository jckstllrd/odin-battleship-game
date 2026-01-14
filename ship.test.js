test("Creating a Ship returns an object containing length, no. hits, ifSunk", () => {
  expect(new Ship(3)).toMatchObject({ length: 3, hits: 0, ifSunk: false });
});
