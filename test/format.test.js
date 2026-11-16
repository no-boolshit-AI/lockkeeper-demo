import assert from 'node:assert/strict';
import { test } from 'node:test';
import { formatPrice } from '../src/format.js';

test('formats euros with two decimals', () => {
  assert.equal(formatPrice(9.25), '€9.25');
  assert.equal(formatPrice(0), '€0.00');
  assert.equal(formatPrice(6.3), '€6.30');
});
