import PropTypes from 'prop-types';
import styles from './RegistrationForm.module.css';

/**
 * Visible label + control + error message. The control is passed as a render
 * function so it receives the id and accessibility attributes it needs.
 */
function FormField({
  id, label, error = undefined, children,
}) {
  const errorId = `${id}-error`;

  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>{label}</label>
      {children({
        id,
        'aria-invalid': Boolean(error),
        'aria-describedby': error ? errorId : undefined,
        className: `${styles.control} ${error ? styles.controlError : ''}`,
      })}
      {error && <p id={errorId} className={styles.error}>{error}</p>}
    </div>
  );
}

FormField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  children: PropTypes.func.isRequired,
};

export default FormField;
