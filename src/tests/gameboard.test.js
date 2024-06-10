import Gameboard from '../modules/gameboard';

test('ships placed correctly', () => {
  const gameboard = new Gameboard();
  gameboard.placeShips();
  expect(gameboard.array[0][0]).toBeTruthy();
});

test('returns all ships sunk correctly', () => {
  const gameboard = new Gameboard();
  gameboard.placeShips();
  for (let i = 0; i < 5; i++) {
    gameboard.receiveAttack(0, i);
  }
  for (let i = 0; i < 3; i++) {
    gameboard.receiveAttack(2, 2 + i);
  }
  expect(gameboard.isAllShipsSunk()).toBe(false);
});
