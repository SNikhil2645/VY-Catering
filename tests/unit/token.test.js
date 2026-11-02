const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('crypto');

const SECRET = 'test-secret-key-12345';

function createAdminToken(payload, expiresInSeconds = 3600) {
  const exp = Math.floor(Date.now() / 1000) + expiresInSeconds;
  const data = { ...payload, exp };
  const encoded = Buffer.from(JSON.stringify(data)).toString('base64url');
  const signature = crypto.createHmac('sha256', SECRET).update(encoded).digest('base64url');
  return `${encoded}.${signature}`;
}

function verifyAdminToken(token) {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [encoded, signature] = parts;
  const expectedSig = crypto.createHmac('sha256', SECRET).update(encoded).digest('base64url');
  if (signature !== expectedSig) return null;

  try {
    const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8'));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

test('createAdminToken creates valid signable token', () => {
  const token = createAdminToken({ userId: 'u1', email: 'admin@example.com', role: 'ADMIN' });
  const verified = verifyAdminToken(token);
  assert.equal(verified.email, 'admin@example.com');
  assert.equal(verified.role, 'ADMIN');
});

test('verifyAdminToken rejects tampered token signatures', () => {
  const token = createAdminToken({ userId: 'u1', email: 'admin@example.com', role: 'ADMIN' });
  const tampered = token.slice(0, -4) + 'abcd';
  const verified = verifyAdminToken(tampered);
  assert.equal(verified, null);
});

test('verifyAdminToken rejects expired tokens', () => {
  const expiredToken = createAdminToken({ userId: 'u1', email: 'admin@example.com', role: 'ADMIN' }, -10);
  const verified = verifyAdminToken(expiredToken);
  assert.equal(verified, null);
});
