import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { processRegistration } from './server.mjs';

// Mounts the supplied non-persistent registration API at /api/register on the
// Vite dev and preview servers, so `npm run dev` works without a second process.
const localRegistrationApi = () => {
  const mount = (server) => {
    server.middlewares.use('/api/register', (req, res) => {
      processRegistration(req, res).catch(() => {
        res.writeHead(500);
        res.end(JSON.stringify({ message: 'Server error' }));
      });
    });
  };
  return {
    name: 'local-registration-api',
    configureServer: mount,
    configurePreviewServer: mount,
  };
};

export default defineConfig({
  plugins: [react(), localRegistrationApi()],
  css: { modules: { localsConvention: 'camelCaseOnly' } },
  build: { target: 'es2018' },
});
