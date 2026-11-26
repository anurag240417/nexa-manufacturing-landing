import { createServer } from 'node:http';
import { pathToFileURL } from 'node:url';

export const allowedInterests = ['Precision components', 'Manufacturing consultation', 'Supply planning'];
export function validate(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return false;
  const { fullName, email, interest, consent } = body;
  return typeof fullName === 'string' && fullName.trim().length >= 2 && fullName.trim().length <= 80
    && typeof email === 'string' && email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    && allowedInterests.includes(interest) && consent === true;
}
export async function processRegistration(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }
  if (req.method !== 'POST') { res.writeHead(405); res.end(JSON.stringify({ message: 'Method not allowed' })); return; }
  if ((req.headers['content-type'] || '').split(';')[0] !== 'application/json') {
    res.writeHead(415); res.end(JSON.stringify({ message: 'JSON content type required' })); return;
  }
  let content = '';
  for await (const chunk of req) {
    content += chunk;
    if (content.length > 4096) { res.writeHead(413); res.end(JSON.stringify({ message: 'Payload too large' })); return; }
  }
  let body;
  try { body = JSON.parse(content); } catch { res.writeHead(400); res.end(JSON.stringify({ message: 'Invalid JSON' })); return; }
  if (!validate(body)) { res.writeHead(400); res.end(JSON.stringify({ message: 'Please check all required fields' })); return; }
  res.writeHead(201);
  res.end(JSON.stringify({ ok: true, message: 'Your enquiry was checked successfully in this environment.' }));
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const server = createServer((req, res) => {
    if (new URL(req.url, 'http://localhost').pathname === '/api/register') {
      processRegistration(req, res).catch(() => { res.writeHead(500); res.end(JSON.stringify({ message: 'Server error' })); });
      return;
    }
    res.writeHead(404); res.end('Not found');
  });
  server.listen(4174, '127.0.0.1', () => process.stdout.write('Registration API: http://localhost:4174/api/register\n'));
}
