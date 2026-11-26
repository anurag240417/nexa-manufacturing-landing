// Mirrors the rules in server.mjs so users get feedback before a request is made.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const INTERESTS = ['Precision components', 'Manufacturing consultation', 'Supply planning'];

export const INITIAL_VALUES = {
  fullName: '',
  email: '',
  interest: '',
  consent: false,
};

export default function validate(values) {
  const errors = {};
  const name = values.fullName.trim();
  const email = values.email.trim();

  if (!name) {
    errors.fullName = 'Enter your full name.';
  } else if (name.length < 2 || name.length > 80) {
    errors.fullName = 'Full name must be between 2 and 80 characters.';
  }

  if (!email) {
    errors.email = 'Enter your email address.';
  } else if (email.length > 254 || !EMAIL_RE.test(email)) {
    errors.email = 'Enter a valid email address, for example name@example.com.';
  }

  if (!INTERESTS.includes(values.interest)) {
    errors.interest = 'Select an area of interest.';
  }

  if (values.consent !== true) {
    errors.consent = 'Please agree to be contacted about this enquiry.';
  }

  return errors;
}
