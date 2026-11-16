/**
 * Cart totals for the demo shop. Prices are integer cents inside the library;
 * public functions return euros.
 */

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

/** Discount codes and their percentage off. Codes are matched case-insensitively. */
const DISCOUNT_CODES = new Map([
  ['WELCOME10', 10],
  ['SPRING25', 25],
]);

/**
 * The cart total after applying one discount code, in euros.
 * @param {CartItem[]} items
 * @param {string} code
 * @returns {number}
 */
export function cartTotalWithCode(items, code) {
  const percent = typeof code === 'string' ? DISCOUNT_CODES.get(code.toUpperCase()) : undefined;
  if (percent === undefined) {
    throw new RangeError(`Unknown discount code: ${String(code)}`);
  }
  return cartTotal(items, percent);
}

/**
 * How many items are in the cart.
 * @param {CartItem[]} items
 * @returns {number}
 */
export function itemCount(items) {
  return items.reduce((count, item) => count + item.quantity, 0);
}
