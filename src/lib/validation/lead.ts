/**
 * @file lead.ts
 * @description Centralized server & client validation rules, length limits, and phone normalization.
 *
 * RULES:
 * - All user input must have explicit maximum length boundaries.
 * - Client and server must share identical normalization logic.
 * - Phone numbers are normalized to E.164 (+91...) or standard 10-digit Indian mobile.
 * - No user-controlled string is trusted blindly.
 */

export const LEAD_FIELD_LIMITS = {
  NAME_MIN: 2,
  NAME_MAX: 80,
  PHONE_MIN: 10,
  PHONE_MAX: 20,
  PROPERTY_TYPE_MAX: 80,
  FORM_SOURCE_MAX: 50,
  HONEYPOT_MAX: 100,
  UTM_FIELD_MAX: 255,
  URL_MAX: 1024,
} as const;

/**
 * Normalizes user-entered phone numbers for validation and deduplication.
 * Handles common Indian formats:
 * - "+91 78159 15792" -> "7815915792"
 * - "07815915792" -> "7815915792"
 * - "917815915792" (12 digits) -> "7815915792"
 * - "78159 15792" -> "7815915792"
 */
export function normalizeIndianPhoneNumber(input: string): string {
  if (!input) return '';
  // Strip all non-digit characters
  const digits = input.replace(/\D/g, '');

  // 12 digits starting with 91 (e.g. 917815915792)
  if (digits.length === 12 && digits.startsWith('91')) {
    return digits.slice(2);
  }

  // 11 digits starting with 0 (e.g. 07815915792)
  if (digits.length === 11 && digits.startsWith('0')) {
    return digits.slice(1);
  }

  return digits;
}

/**
 * Validates whether a normalized phone number matches a valid 10-digit Indian mobile number.
 * Valid Indian mobile numbers start with 6, 7, 8, or 9 and are exactly 10 digits long.
 */
export function isValidIndianMobile(input: string): boolean {
  const normalized = normalizeIndianPhoneNumber(input);
  return /^[6-9]\d{9}$/.test(normalized);
}

/**
 * Validates sanitized name input.
 */
export function validateName(name: string): { valid: boolean; error?: string } {
  const trimmed = name.trim();
  if (!trimmed) {
    return { valid: false, error: 'Please enter your name.' };
  }
  if (trimmed.length < LEAD_FIELD_LIMITS.NAME_MIN) {
    return { valid: false, error: 'Please enter at least 2 characters.' };
  }
  if (trimmed.length > LEAD_FIELD_LIMITS.NAME_MAX) {
    return { valid: false, error: `Name cannot exceed ${LEAD_FIELD_LIMITS.NAME_MAX} characters.` };
  }
  return { valid: true };
}

/**
 * Validates phone input.
 */
export function validatePhone(phone: string): { valid: boolean; error?: string } {
  const trimmed = phone.trim();
  if (!trimmed) {
    return { valid: false, error: 'Please enter your phone number.' };
  }
  if (trimmed.length > LEAD_FIELD_LIMITS.PHONE_MAX) {
    return { valid: false, error: 'Phone number is too long.' };
  }
  if (!isValidIndianMobile(trimmed)) {
    return { valid: false, error: 'Please enter a valid 10-digit mobile number (e.g. 98765 43210).' };
  }
  return { valid: true };
}

/**
 * Truncates and sanitizes optional attribution string fields safely.
 */
export function sanitizeAttributionField(value?: string, maxLength: number = LEAD_FIELD_LIMITS.UTM_FIELD_MAX): string {
  if (!value) return '';
  return value.trim().slice(0, maxLength);
}
