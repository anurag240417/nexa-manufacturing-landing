// Vercel serverless adapter. This endpoint validates but does not store requests.
import { validate } from '../server.mjs';
export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  if (!validate(req.body)) return res.status(400).json({ message: 'Please check all required fields' });
  return res.status(201).json({ ok: true, message: 'Your enquiry was checked successfully in this environment.' });
}
