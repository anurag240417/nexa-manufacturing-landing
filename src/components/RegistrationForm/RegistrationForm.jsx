import { useRef, useState } from 'react';
import useForm from '../../hooks/useForm';
import submitInterest from '../../apiClient';
import FormField from './FormField';
import validate, { INITIAL_VALUES, INTERESTS } from './validate';
import styles from './RegistrationForm.module.css';

const FIELD_ORDER = ['fullName', 'email', 'interest', 'consent'];

function RegistrationForm() {
  const {
    values, handleChange, handleBlur, touchAll, reset, visibleError,
  } = useForm(INITIAL_VALUES, validate);
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [message, setMessage] = useState('');
  const formRef = useRef(null);

  const isSubmitting = status === 'submitting';

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    const errors = touchAll();
    const firstInvalid = FIELD_ORDER.find((key) => errors[key]);
    if (firstInvalid) {
      setStatus('idle');
      setMessage('');
      formRef.current?.elements[firstInvalid]?.focus();
      return;
    }

    setStatus('submitting');
    setMessage('');
    try {
      const result = await submitInterest({
        fullName: values.fullName.trim(),
        email: values.email.trim(),
        interest: values.interest,
        consent: true,
      });
      setStatus('success');
      setMessage(result.message || 'Thank you. Your enquiry was received.');
      reset();
    } catch (error) {
      // Keep the entered values so the user can retry.
      setStatus('error');
      setMessage(error instanceof TypeError
        ? 'We could not reach the enquiry service. Check your connection and try again.'
        : error.message);
    }
  };

  return (
    <section id="register" className={styles.section} aria-labelledby="register-title">
      <div className={styles.inner}>
        <form
          ref={formRef}
          className={styles.form}
          onSubmit={handleSubmit}
          noValidate
          aria-busy={isSubmitting}
        >
          <div className={styles.card}>
            <header className={styles.head}>
              <h2 id="register-title" className={styles.title}>Register your interest</h2>
              <p className={styles.subtitle}>A short introduction helps us route your enquiry.</p>
            </header>

            <div className={styles.grid}>
              <FormField id="fullName" label="Full name" error={visibleError('fullName')}>
                {(props) => (
                  <input
                    {...props}
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    maxLength={80}
                    required
                    value={values.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                )}
              </FormField>

              <FormField id="email" label="Email address" error={visibleError('email')}>
                {(props) => (
                  <input
                    {...props}
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    placeholder="you@example.com"
                    maxLength={254}
                    required
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                )}
              </FormField>

              <FormField id="interest" label="Area of interest" error={visibleError('interest')}>
                {(props) => (
                  <select
                    {...props}
                    name="interest"
                    required
                    value={values.interest}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="">Select one</option>
                    {INTERESTS.map((item) => <option key={item} value={item}>{item}</option>)}
                  </select>
                )}
              </FormField>

              <fieldset className={styles.consent}>
                <legend className={styles.label}>Consent</legend>
                <label htmlFor="consent" className={styles.checkboxRow}>
                  <input
                    id="consent"
                    name="consent"
                    type="checkbox"
                    className={styles.checkbox}
                    required
                    checked={values.consent}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={Boolean(visibleError('consent'))}
                    aria-describedby={visibleError('consent') ? 'consent-error' : undefined}
                  />
                  <span>I agree to be contacted about this enquiry.</span>
                </label>
                {visibleError('consent') && (
                  <p id="consent-error" className={styles.error}>{visibleError('consent')}</p>
                )}
              </fieldset>
            </div>

            <div
              role="status"
              aria-live="polite"
              className={`${styles.status} ${status === 'success' ? styles.statusSuccess : ''} ${status === 'error' ? styles.statusError : ''}`}
            >
              {message}
            </div>
          </div>

          <div className={styles.actions}>
            <button type="submit" className={styles.submit} disabled={isSubmitting}>
              {isSubmitting ? 'Sending…' : 'Send enquiry'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default RegistrationForm;
