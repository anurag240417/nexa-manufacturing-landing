import { useCallback, useMemo, useState } from 'react';

/**
 * Small form-state hook: keeps values and touched flags; errors are derived
 * from values with `validate(values)`, which returns { fieldName: 'message' }.
 * Errors are only shown for fields the user has interacted with.
 */
export default function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});

  const errors = useMemo(() => validate(values), [validate, values]);

  const handleChange = useCallback((event) => {
    const {
      name, value, type, checked,
    } = event.target;
    setValues((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }, []);

  const handleBlur = useCallback((event) => {
    const { name } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  }, []);

  const touchAll = useCallback(() => {
    setTouched(Object.fromEntries(Object.keys(initialValues).map((key) => [key, true])));
    return errors;
  }, [initialValues, errors]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setTouched({});
  }, [initialValues]);

  const visibleError = (name) => (touched[name] ? errors[name] : undefined);

  return {
    values, errors, handleChange, handleBlur, touchAll, reset, visibleError,
  };
}
