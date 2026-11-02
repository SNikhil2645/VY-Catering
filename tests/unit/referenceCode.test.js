const test = require('node:test');
const assert = require('node:assert/strict');

function generateReferenceCode(prefix = 'VYC') {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `${prefix}-${year}-${randomNum}`;
}

function formatINR(amount) {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return 'On Enquiry';
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatWhatsAppPhone(phone) {
  return phone.replace(/[^\d]/g, '');
}

test('generateReferenceCode produces correct VYC-YYYY-NNNNN pattern', () => {
  const currentYear = new Date().getFullYear();
  const code = generateReferenceCode('VYC');
  const regex = new RegExp(`^VYC-${currentYear}-\\d{5}$`);
  assert.equal(regex.test(code), true);
});

test('generateReferenceCode produces unique codes on successive calls', () => {
  const code1 = generateReferenceCode('VYC');
  const code2 = generateReferenceCode('VYC');
  assert.notEqual(code1, code2);
});

test('formatINR correctly formats numeric amounts', () => {
  const formatted = formatINR(299);
  assert.equal(formatted.includes('299'), true);
});

test('formatINR handles null or undefined as "On Enquiry"', () => {
  assert.equal(formatINR(null), 'On Enquiry');
  assert.equal(formatINR(undefined), 'On Enquiry');
});

test('formatWhatsAppPhone strips spaces, dashes and plus signs', () => {
  assert.equal(formatWhatsAppPhone('+91 63040 05185'), '916304005185');
});
