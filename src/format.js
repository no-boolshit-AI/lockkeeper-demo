/**
 * Format an amount in euros for display, such as "€9.25".
 * @param {number} amount
 * @returns {string}
 */
export function formatPrice(amount) {
  return `€${amount.toFixed(2)}`;
}
