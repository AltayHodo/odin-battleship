import Ship from '../modules/ship.js';

test('ship takes damage', () => {
  const ship = new Ship(5);
  ship.hit();
  expect(ship.numHits).toBe(1);
});

test('ship sinking', () => {
  const ship = new Ship(1);
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});
