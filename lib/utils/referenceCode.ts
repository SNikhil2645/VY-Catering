/**
 * Generates a unique, human-readable enquiry reference code.
 * Format: VYC-YYYY-NNNNN (e.g., VYC-2026-83921)
 */
export function generateReferenceCode(prefix = 'VYC'): string {
  const year = new Date().getFullYear();
  // 5 random digits avoiding leading zero
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `${prefix}-${year}-${randomNum}`;
}
