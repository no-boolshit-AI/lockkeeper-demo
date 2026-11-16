/**
 * Cart totals for the demo shop. Prices are integer cents inside the library;
 * public functions return euros.
 */

import { formatPrice } from './format.js';

/** @typedef {{ name: string, priceCents: number, quantity: number }} CartItem */

/**
 * The cart total after an optional percentage discount, in euros.
 * @param {CartItem[]} items
 * @param {number} [discountPercent]
 * @returns {number}
 */
export function cartTotal(items, discountPercent = 0) {
  if (discountPercent < 0 || discountPercent > 100) {
    throw new RangeError('discountPercent must be between 0 and 100');
  }
  let totalCents = 0;
  for (const item of items) {
    const lineCents = item.priceCents * item.quantity * (1 - discountPercent / 100);
    totalCents += Math.floor(lineCents);
  }
  return totalCents / 100;
}

/**
 * How many items are in the cart.
 * @param {CartItem[]} items
 * @returns {number}
 */
export function itemCount(items) {
  return items.reduce((count, item) => count + item.quantity, 0);
}

/**
 * A one-line cart summary for the header, such as "3 items · €12.50".
 * Counts units across lines, as itemCount does.
 * @param {CartItem[]} items
 * @param {number} [discountPercent]
 * @returns {string}
 */
export function cartSummary(items, discountPercent = 0) {
  const count = itemCount(items);
  const label = count === 1 ? '1 item' : `${count} items`;
  return `${label} · ${formatPrice(cartTotal(items, discountPercent))}`;
}
