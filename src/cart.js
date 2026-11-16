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
  // Sum the exact discounted amounts in hundredths of a cent (integer for
  // whole-number discounts), then round half up once at cart level.
  let exactHundredthsOfCents = 0;
  for (const item of items) {
    exactHundredthsOfCents += item.priceCents * item.quantity * (100 - discountPercent);
  }
  const totalCents = Math.floor((exactHundredthsOfCents + 50) / 100);
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
