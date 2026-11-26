import test from 'node:test';
import assert from 'node:assert/strict';
import { validate } from '../server.mjs';
const good = { fullName: 'Nina Rao', email: 'nina@example.org', interest: 'Supply planning', consent: true };
test('valid enquiry', () => assert.equal(validate(good), true));
test('reject empty name', () => assert.equal(validate({ ...good, fullName: ' ' }), false));
test('reject malformed email', () => assert.equal(validate({ ...good, email: 'abc' }), false));
test('reject unapproved interest', () => assert.equal(validate({ ...good, interest: 'Other' }), false));
test('reject missing consent', () => assert.equal(validate({ ...good, consent: false }), false));
