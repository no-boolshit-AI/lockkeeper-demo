import assert from 'node:assert/strict';
import { test } from 'node:test';
import { cartSummary, cartTotal, itemCount } from '../src/cart.js';

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

test('summarises an empty cart', () => {
  assert.equal(cartSummary([]), '0 items · €0.00');
});

test('summarises a cart with one item in the singular', () => {
  assert.equal(cartSummary([bagel]), '1 item · €2.25');
});

test('summarises a cart with several items', () => {
  assert.equal(cartSummary([coffee, bagel]), '3 items · €9.25');
});

test('summary applies the discount', () => {
  assert.equal(cartSummary([coffee], 10), '2 items · €6.30');
});

test('summarises a cart of several lines with a 10% discount', () => {
  assert.equal(cartSummary([coffee, bagel], 10), '3 items · €8.32');
});
