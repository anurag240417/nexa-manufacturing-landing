const endpoint = import.meta.env.VITE_REGISTRATION_API || '/api/register';

/**
 * POSTs the enquiry as JSON. The supplied API only returns a non-persistent
 * acknowledgement; nothing is stored. Form data is never logged.
 */
export default async function submitInterest(payload) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  let result = {};
  try {
    result = await response.json();
  } catch {
    // Non-JSON response (e.g. static host without an API) – handled below.
  }

  if (!response.ok) {
    throw new Error(result.message || 'Submission could not be completed. Please try again.');
  }
  return result;
}
