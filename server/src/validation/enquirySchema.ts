import { z } from 'zod';

export const enquirySchema = z.object({
  // Step 1: Event Details
  eventType: z.string().min(2, 'Please select or enter an event type'),
  eventDate: z.string().refine((val) => {
    const selected = new Date(val);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selected >= today;
  }, 'Event date cannot be in the past'),
  eventStartTime: z.string().optional().default('11:00 AM'),
  guestCount: z.coerce
    .number()
    .min(50, 'Minimum guest count is 50 for catering enquiries')
    .max(10000, 'For gatherings exceeding 10,000 guests, please call us directly'),
  venue: z.string().optional(),
  eventFormat: z.enum(['SIT_DOWN_SADHYA', 'BUFFET', 'LIVE_COUNTERS', 'HYBRID']).default('BUFFET'),

  // Step 2: Food Preferences
  foodPreference: z.enum(['VEG', 'NON_VEG', 'BOTH'], {
    errorMap: () => ({ message: 'Please select your food preference' }),
  }),
  specialRequests: z.string().max(1000, 'Special requests cannot exceed 1000 characters').optional(),

  // Step 3: Customer Details
  customerName: z.string().min(2, 'Please provide your full name').max(100),
  phone: z
    .string()
    .min(10, 'Please enter a valid 10-digit phone number')
    .regex(/^[+0-9\s-]{10,15}$/, 'Invalid phone number format'),
  email: z.string().email('Please enter a valid email address').optional().or(z.literal('')),
  preferredContactMethod: z.enum(['PHONE', 'WHATSAPP', 'EMAIL']).default('PHONE'),

  // Consent
  consent: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to be contacted regarding this catering enquiry' }),
  }),

  // Anti-spam honeypot (must be empty)
  website_hp: z.string().max(0, 'Spam detected').optional(),
});

export type EnquiryFormData = z.infer<typeof enquirySchema>;
