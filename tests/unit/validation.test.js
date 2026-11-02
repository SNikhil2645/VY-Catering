const test = require('node:test');
const assert = require('node:assert/strict');
const { z } = require('zod');

// Schema test replica
const enquirySchemaTest = z.object({
  eventType: z.string().min(2),
  eventDate: z.string().refine((val) => {
    const selected = new Date(val);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selected >= today;
  }, 'Event date cannot be in the past'),
  guestCount: z.coerce.number().min(50).max(10000),
  foodPreference: z.enum(['VEG', 'NON_VEG', 'BOTH']),
  customerName: z.string().min(2),
  phone: z.string().min(10).regex(/^[+0-9\s-]{10,15}$/),
  consent: z.literal(true),
});

test('Enquiry validation accepts valid event submission', () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 5);
  const futureDate = tomorrow.toISOString().split('T')[0];

  const validData = {
    eventType: 'Wedding & Muhurtham',
    eventDate: futureDate,
    guestCount: 500,
    foodPreference: 'BOTH',
    customerName: 'S. Ramanjaneyulu',
    phone: '9876543210',
    consent: true,
  };

  const result = enquirySchemaTest.safeParse(validData);
  assert.equal(result.success, true);
});

test('Enquiry validation rejects past dates', () => {
  const invalidData = {
    eventType: 'Wedding & Muhurtham',
    eventDate: '2020-01-01',
    guestCount: 500,
    foodPreference: 'BOTH',
    customerName: 'S. Ramanjaneyulu',
    phone: '9876543210',
    consent: true,
  };

  const result = enquirySchemaTest.safeParse(invalidData);
  assert.equal(result.success, false);
});

test('Enquiry validation rejects guest counts below 50', () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 5);

  const invalidData = {
    eventType: 'Wedding & Muhurtham',
    eventDate: tomorrow.toISOString().split('T')[0],
    guestCount: 20, // Less than minimum 50
    foodPreference: 'BOTH',
    customerName: 'S. Ramanjaneyulu',
    phone: '9876543210',
    consent: true,
  };

  const result = enquirySchemaTest.safeParse(invalidData);
  assert.equal(result.success, false);
});

test('Enquiry validation rejects missing customer consent', () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 5);

  const invalidData = {
    eventType: 'Wedding & Muhurtham',
    eventDate: tomorrow.toISOString().split('T')[0],
    guestCount: 350,
    foodPreference: 'BOTH',
    customerName: 'S. Ramanjaneyulu',
    phone: '9876543210',
    consent: false,
  };

  const result = enquirySchemaTest.safeParse(invalidData);
  assert.equal(result.success, false);
});
