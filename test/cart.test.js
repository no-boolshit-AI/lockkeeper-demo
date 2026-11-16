import assert from 'node:assert/strict';
import { test } from 'node:test';
import { cartTotal, itemCount } from '../src/cart.js';

const coffee = { name: 'Coffee', priceCents: 350, quantity: 2 };
const bagel = { name: 'Bagel', priceCents: 225, quantity: 1 };

test('totals a cart without a discount', () => {
  assert.equal(cartTotal([coffee, bagel]), 9.25);
});

test('applies a percentage discount', () => {
  assert.equal(cartTotal([coffee], 10), 6.3);
});

test('an empty cart costs nothing', () => {
  assert.equal(cartTotal([]), 0);
});

test('rejects discounts outside 0 to 100', () => {
  assert.throws(() => cartTotal([coffee], 120), RangeError);
  assert.throws(() => cartTotal([coffee], -5), RangeError);
});

test('counts items across lines', () => {
  assert.equal(itemCount([coffee, bagel]), 3);
});

test('rounds a discounted total half up once at cart level', () => {
  const lineA = { name: 'Mint', priceCents: 95, quantity: 1 };
  const lineB = { name: 'Gum', priceCents: 95, quantity: 1 };
  assert.equal(cartTotal([lineA, lineB], 10), 1.71);
});
