/**
 * Format an amount in euros for display, such as "€9.25".
 * @param {number} amount
 * @returns {string}
 */
export function formatPrice(amount) {
  const digits = Math.abs(amount).toFixed(2);
  const sign = amount < 0 && digits !== '0.00' ? '-' : '';
  return `${sign}€${digits}`;
}
