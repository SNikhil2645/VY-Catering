'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { enquirySchema, EnquiryFormData } from '@/lib/validation/enquirySchema';
import { Calendar, Users, Utensils, User, CheckCircle2, MessageCircle, AlertCircle, ArrowLeft, ArrowRight, Sparkles, Copy, Check } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import confetti from 'canvas-confetti';

const EVENT_TYPE_OPTIONS = [
  { label: 'Wedding & Muhurtham (పెళ్లి ముహూర్తం)', value: 'Wedding & Muhurtham' },
  { label: 'Grand Evening Reception (రిసెప్షన్)', value: 'Reception Celebrations' },
  { label: 'Engagement / Nischitartham (నిశ్చితార్థం)', value: 'Engagement & Nischitartham' },
  { label: 'Haldi / Mehendi (పసుపు వేడుక)', value: 'Haldi & Mehendi' },
  { label: 'Housewarming / Gruhapravesham (గృహప్రవేశం)', value: 'Housewarming (Gruhapravesham)' },
  { label: 'Birthday & Milestone Party (పుట్టినరోజు)', value: 'Milestone Birthdays & Anniversaries' },
  { label: 'Corporate Conferences & Dinners (కార్పొరేట్ ఈవెంట్)', value: 'Corporate Conferences & Galas' },
  { label: 'Religious Gathering / Annadanam (అన్నదానం)', value: 'Religious Gatherings & Annadanam' },
  { label: 'Other Social / Private Gathering', value: 'Private Event' },
];

const SERVICE_FORMAT_OPTIONS = [
  { label: 'Traditional Banana-Leaf Sadhya (అరిటాకు విందు)', value: 'SIT_DOWN_SADHYA' },
  { label: 'Grand Multi-Cuisine Buffet', value: 'BUFFET' },
  { label: 'Buffet + Live Cooking Counters', value: 'LIVE_COUNTERS' },
  { label: 'Hybrid (Sit-down for VIPs + Buffet)', value: 'HYBRID' },
];

export default function BookingWizard() {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);
  const [referenceCode, setReferenceCode] = useState<string>('');
  const [serverError, setServerError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Tomorrow's date formatted as YYYY-MM-DD
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateString = tomorrow.toISOString().split('T')[0];

  const defaultEventType = searchParams.get('eventType') || 'Wedding & Muhurtham';
  const defaultGuests = Number(searchParams.get('guests')) || 350;

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      eventType: defaultEventType,
      guestCount: defaultGuests,
      eventDate: minDateString,
      eventStartTime: '11:00 AM',
      venue: '',
      eventFormat: 'BUFFET',
      foodPreference: 'BOTH',
      specialRequests: '',
      customerName: '',
      phone: '',
      email: '',
      preferredContactMethod: 'PHONE',
      consent: true,
      website_hp: '',
    },
    mode: 'onTouched',
  });

  const formValues = watch();

  // Validate step before advancing
  const handleNextStep = async () => {
    let fieldsToValidate: (keyof EnquiryFormData)[] = [];

    if (currentStep === 1) {
      fieldsToValidate = ['eventType', 'eventDate', 'guestCount', 'eventFormat'];
    } else if (currentStep === 2) {
      fieldsToValidate = ['foodPreference'];
    } else if (currentStep === 3) {
      fieldsToValidate = ['customerName', 'phone', 'preferredContactMethod', 'consent'];
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const onSubmit = async (data: EnquiryFormData) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to submit enquiry');
      }

      setReferenceCode(result.referenceCode);
      setSubmissionSuccess(true);

      // Trigger festive celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#C6A15B', '#681F2B', '#E08A1E', '#FFFFFF'],
        });
      } catch (e) {
        // Safe fallback
      }
    } catch (err: any) {
      setServerError(err.message || 'An unexpected error occurred. Please contact us via phone.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyReferenceCode = () => {
    navigator.clipboard.writeText(referenceCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateWhatsAppMessage = () => {
    const text = `Hello Venky Yadav Caterings, I just submitted an enquiry (Ref: ${referenceCode}) for ${formValues.eventType} on ${formValues.eventDate} for ${formValues.guestCount} guests. Looking forward to your call!`;
    return `https://wa.me/916304005185?text=${encodeURIComponent(text)}`;
  };

  // SUCCESS STATE SCREEN
  if (submissionSuccess) {
    return (
      <div className="bg-charcoal-800 border-2 border-gold rounded-sm p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-2xl animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-400 mx-auto flex items-center justify-center text-green-400 mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="text-xs font-semibold uppercase tracking-widest text-gold block mb-1">
          Enquiry Registered Successfully
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ivory mb-4">
          Dhanyavadalu! <span className="font-telugu text-gold">ధన్యవాదాలు!</span>
        </h2>
        <p className="text-sm text-ivory/80 leading-relaxed mb-8 max-w-lg mx-auto">
          We have received your event details for{' '}
          <strong className="text-gold">{formValues.eventType}</strong> on{' '}
          <strong className="text-ivory">{formValues.eventDate}</strong>. Our culinary team led by Venky Yadav will review your requirements and reach out within 24 hours.
        </p>

        {/* Reference Code Box */}
        <div className="bg-charcoal-900 border border-gold/40 p-5 rounded-sm mb-8 inline-block w-full max-w-md text-left">
          <span className="text-[11px] uppercase tracking-wider text-ivory/50 block">
            Your Official Enquiry Reference
          </span>
          <div className="flex items-center justify-between mt-1">
            <span className="font-mono text-2xl font-bold text-gold tracking-wider">
              {referenceCode}
            </span>
            <button
              type="button"
              onClick={copyReferenceCode}
              className="flex items-center space-x-1.5 text-xs text-ivory/70 hover:text-gold border border-white/20 hover:border-gold px-3 py-1.5 rounded-sm transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <p className="text-[11px] text-ivory/60 mt-2">
            Quote this reference code whenever contacting us for faster consultation.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={generateWhatsAppMessage()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-ivory font-semibold px-6 py-3 rounded-sm text-sm transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp with Reference</span>
          </a>

          <Button href="/" variant="outline" size="md" className="w-full sm:w-auto">
            Back to Homepage
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-charcoal-800 border border-gold/30 rounded-sm shadow-2xl p-6 sm:p-10 max-w-3xl mx-auto">
      {/* Step Indicators */}
      <div className="mb-10">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-white/10 z-0" />
          {[
            { step: 1, label: 'Event', icon: Calendar },
            { step: 2, label: 'Food', icon: Utensils },
            { step: 3, label: 'Contact', icon: User },
            { step: 4, label: 'Review', icon: CheckCircle2 },
          ].map((item) => {
            const Icon = item.icon;
            const isCompleted = currentStep > item.step;
            const isCurrent = currentStep === item.step;
            return (
              <div key={item.step} className="relative z-10 flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                    isCompleted
                      ? 'bg-gold text-charcoal border-2 border-gold shadow-lg shadow-gold/30'
                      : isCurrent
                      ? 'bg-maroon text-gold border-2 border-gold ring-4 ring-gold/20'
                      : 'bg-charcoal-700 text-ivory/40 border border-white/20'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span
                  className={`text-[11px] font-semibold uppercase tracking-wider mt-2 ${
                    isCurrent ? 'text-gold' : isCompleted ? 'text-ivory' : 'text-ivory/40'
                  }`}
                >
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {serverError && (
        <div className="mb-6 p-4 bg-red-950/60 border border-red-500/50 rounded-sm flex items-start space-x-3 text-red-300 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400 mt-0.5" />
          <span>{serverError}</span>
        </div>
      )}

      {/* Form Steps */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Anti-spam honeypot */}
        <input type="text" {...register('website_hp')} className="hidden" aria-hidden="true" />

        {/* STEP 1: EVENT DETAILS */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="border-b border-white/10 pb-4">
              <h3 className="font-serif text-2xl font-bold text-ivory">Event Details</h3>
              <p className="text-xs text-ivory/60">
                Tell us about your celebration, expected guests, and venue location.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <Select
                  label="Function / Event Type"
                  options={EVENT_TYPE_OPTIONS}
                  {...register('eventType')}
                  error={errors.eventType?.message}
                  required
                />
              </div>

              <div>
                <Input
                  label="Event Date"
                  type="date"
                  min={minDateString}
                  {...register('eventDate')}
                  error={errors.eventDate?.message}
                  required
                />
              </div>

              <div>
                <Input
                  label="Approximate Guest Count"
                  type="number"
                  min={50}
                  step={25}
                  placeholder="e.g. 500"
                  {...register('guestCount')}
                  error={errors.guestCount?.message}
                  required
                  helperText="Minimum 50 guests for catering services"
                />
              </div>

              <div>
                <Input
                  label="Event Start Time"
                  placeholder="e.g. 11:30 AM or 07:00 PM"
                  {...register('eventStartTime')}
                  error={errors.eventStartTime?.message}
                />
              </div>

              <div>
                <Select
                  label="Preferred Service Format"
                  options={SERVICE_FORMAT_OPTIONS}
                  {...register('eventFormat')}
                  error={errors.eventFormat?.message}
                />
              </div>

              <div className="sm:col-span-2">
                <Input
                  label="Venue / Kalyana Mandapam / Town"
                  placeholder="e.g. Tirupati Mandapam, Renigunta, or Outdoor Lawn"
                  {...register('venue')}
                  error={errors.venue?.message}
                  helperText="Optional if venue is yet to be finalized"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: FOOD PREFERENCES */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="border-b border-white/10 pb-4">
              <h3 className="font-serif text-2xl font-bold text-ivory">Food & Menu Preferences</h3>
              <p className="text-xs text-ivory/60">
                Choose your dietary requirements and any live counter preferences.
              </p>
            </div>

            {/* Food Preference Radios */}
            <div className="space-y-3">
              <label className="block text-xs uppercase tracking-wider font-semibold text-ivory/80">
                Catering Dietary Preference <span className="text-marigold">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { value: 'VEG', label: '100% Pure Vegetarian', desc: 'Satvik / Traditional Sadhya' },
                  { value: 'NON_VEG', label: 'Non-Vegetarian Only', desc: 'Mutton dum biryani & fries' },
                  { value: 'BOTH', label: 'Both Veg & Non-Veg', desc: 'Balanced multi-course spread' },
                ].map((item) => {
                  const isChecked = formValues.foodPreference === item.value;
                  return (
                    <div
                      key={item.value}
                      onClick={() => setValue('foodPreference', item.value as any, { shouldValidate: true })}
                      className={`p-4 rounded-sm border cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-maroon/30 border-gold shadow-md'
                          : 'bg-charcoal-700/60 border-white/10 hover:border-gold/30'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isChecked ? 'border-gold bg-gold' : 'border-white/30'
                          }`}
                        >
                          {isChecked && <div className="w-1.5 h-1.5 rounded-full bg-charcoal" />}
                        </div>
                        <span className="text-sm font-semibold text-ivory">{item.label}</span>
                      </div>
                      <p className="text-xs text-ivory/50 mt-1 pl-6">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
              {errors.foodPreference && (
                <p className="text-xs text-red-400 font-medium">{errors.foodPreference.message}</p>
              )}
            </div>

            {/* Special Requests */}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-wider font-semibold text-ivory/80">
                Signature Requests & Live Counters
              </label>
              <textarea
                rows={4}
                placeholder="e.g. We specifically want authentic wood-fire mutton dum biryani, live dosa counter for morning tiffin, and loose prawns starter..."
                {...register('specialRequests')}
                className="w-full bg-charcoal-700/80 border border-white/15 focus:border-gold focus:ring-1 focus:ring-gold text-ivory placeholder-ivory/40 text-sm rounded-sm p-3.5"
              />
              <span className="text-[11px] text-ivory/50">
                You can specify live jalebi counters, Jain food, or special regional requests.
              </span>
            </div>
          </div>
        )}

        {/* STEP 3: CUSTOMER DETAILS */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="border-b border-white/10 pb-4">
              <h3 className="font-serif text-2xl font-bold text-ivory">Contact Information</h3>
              <p className="text-xs text-ivory/60">
                Where should Venky Yadav and the team send your catering proposal?
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <Input
                  label="Full Name"
                  placeholder="e.g. S. Ramanjaneyulu"
                  {...register('customerName')}
                  error={errors.customerName?.message}
                  required
                />
              </div>

              <div>
                <Input
                  label="Phone / Mobile Number"
                  placeholder="e.g. 9876543210"
                  {...register('phone')}
                  error={errors.phone?.message}
                  required
                  helperText="We will call or WhatsApp this number"
                />
              </div>

              <div>
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="name@example.com (Optional)"
                  {...register('email')}
                  error={errors.email?.message}
                />
              </div>

              <div className="sm:col-span-2">
                <Select
                  label="Preferred Contact Mode"
                  options={[
                    { label: 'Direct Phone Call', value: 'PHONE' },
                    { label: 'WhatsApp Message', value: 'WHATSAPP' },
                    { label: 'Email', value: 'EMAIL' },
                  ]}
                  {...register('preferredContactMethod')}
                  error={errors.preferredContactMethod?.message}
                />
              </div>

              <div className="sm:col-span-2 pt-2">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register('consent')}
                    className="mt-1 w-4 h-4 rounded text-maroon focus:ring-gold border-white/20"
                  />
                  <span className="text-xs text-ivory/70 leading-normal">
                    I agree to be contacted by Venky Yadav Caterings regarding this catering enquiry. I understand this is an initial enquiry and not a binding reservation.
                  </span>
                </label>
                {errors.consent && (
                  <p className="mt-1 text-xs text-red-400 font-medium">{errors.consent.message}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: REVIEW & SUBMIT */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fade-in">
            <div className="border-b border-white/10 pb-4">
              <h3 className="font-serif text-2xl font-bold text-ivory">Review Your Enquiry</h3>
              <p className="text-xs text-ivory/60">
                Please double check your celebration details before submitting.
              </p>
            </div>

            <div className="bg-charcoal-700/60 border border-white/10 rounded-sm p-5 space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4 pb-3 border-b border-white/5">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-ivory/50">Function</span>
                  <p className="font-semibold text-gold">{formValues.eventType}</p>
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-ivory/50">Guests</span>
                  <p className="font-semibold text-ivory">{formValues.guestCount} Guests</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pb-3 border-b border-white/5">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-ivory/50">Event Date</span>
                  <p className="font-semibold text-ivory">{formValues.eventDate}</p>
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-ivory/50">Format</span>
                  <p className="font-semibold text-ivory">{formValues.eventFormat}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pb-3 border-b border-white/5">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-ivory/50">Food Style</span>
                  <p className="font-semibold text-banana-light">
                    {formValues.foodPreference === 'BOTH'
                      ? 'Veg & Non-Veg'
                      : formValues.foodPreference === 'VEG'
                      ? '100% Pure Veg'
                      : 'Non-Vegetarian'}
                  </p>
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-ivory/50">Contact Name</span>
                  <p className="font-semibold text-ivory">{formValues.customerName}</p>
                </div>
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-wider text-ivory/50">Phone</span>
                <p className="font-semibold text-ivory">{formValues.phone}</p>
              </div>

              {formValues.specialRequests && (
                <div className="pt-2">
                  <span className="text-[11px] uppercase tracking-wider text-ivory/50">Special Requests</span>
                  <p className="text-xs text-ivory/80 italic mt-0.5">{formValues.specialRequests}</p>
                </div>
              )}
            </div>

            <div className="p-4 bg-maroon/20 border-l-2 border-gold text-xs text-ivory/80">
              Upon submission, a unique reference code will be generated and our team will get in touch to discuss live handi setups, menu items, and custom quotations.
            </div>
          </div>
        )}

        {/* Wizard Navigation Controls */}
        <div className="pt-8 mt-6 border-t border-white/10 flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handlePrevStep}
              className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-ivory/70 hover:text-gold px-4 py-2 border border-white/20 rounded-sm transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 4 ? (
            <Button
              type="button"
              onClick={handleNextStep}
              variant="primary"
              size="md"
              icon={<ArrowRight className="w-4 h-4 text-gold" />}
            >
              Continue to Step {currentStep + 1}
            </Button>
          ) : (
            <Button
              type="submit"
              variant="gold"
              size="lg"
              loading={isSubmitting}
              icon={<Sparkles className="w-4 h-4 text-charcoal" />}
            >
              Submit Catering Enquiry
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
