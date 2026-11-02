/**
 * Format Indian Rupee currency amounts
 */
export function formatINR(amount: number | null | undefined): string {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return 'On Enquiry';
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Clean phone numbers to international standard format for WhatsApp API
 */
export function formatWhatsAppPhone(phone: string): string {
  return phone.replace(/[^\d]/g, '');
}

/**
 * Format date to human friendly Indian standard format
 */
export function formatDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
}
