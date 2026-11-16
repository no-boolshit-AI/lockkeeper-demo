import assert from 'node:assert/strict';
import { test } from 'node:test';
import { formatPrice } from '../src/format.js';

test('formats euros with two decimals', () => {
  assert.equal(formatPrice(9.25), '€9.25');
  assert.equal(formatPrice(0), '€0.00');
  assert.equal(formatPrice(6.3), '€6.30');
});

test('puts the minus sign before the euro sign for negative amounts', () => {
  assert.equal(formatPrice(-5), '-€5.00');
  assert.equal(formatPrice(-0.5), '-€0.50');
});

test('formats zero and positive amounts as before', () => {
  assert.equal(formatPrice(0), '€0.00');
  assert.equal(formatPrice(-0), '€0.00');
  assert.equal(formatPrice(5), '€5.00');
  assert.equal(formatPrice(0.5), '€0.50');
});
