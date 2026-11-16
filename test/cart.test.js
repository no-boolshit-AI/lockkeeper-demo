import assert from 'node:assert/strict';
import { test } from 'node:test';
import { cartTotal, cartTotalWithCode, itemCount } from '../src/cart.js';

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

test('WELCOME10 takes 10% off', () => {
  assert.equal(cartTotalWithCode([coffee, bagel], 'WELCOME10'), cartTotal([coffee, bagel], 10));
  assert.equal(cartTotalWithCode([coffee], 'WELCOME10'), 6.3);
});

test('SPRING25 takes 25% off', () => {
  assert.equal(cartTotalWithCode([coffee], 'SPRING25'), 5.25);
});

test('discount codes are case-insensitive', () => {
  assert.equal(cartTotalWithCode([coffee], 'welcome10'), 6.3);
  assert.equal(cartTotalWithCode([coffee], 'Spring25'), 5.25);
});

test('rejects unknown discount codes with a RangeError', () => {
  assert.throws(() => cartTotalWithCode([coffee], 'BOGUS'), {
    name: 'RangeError',
    message: 'Unknown discount code: BOGUS',
  });
  assert.throws(() => cartTotalWithCode([coffee], ''), RangeError);
  assert.throws(() => cartTotalWithCode([coffee], undefined), RangeError);
});
