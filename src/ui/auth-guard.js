// ── auth-guard.js ─────────────────────────────────────────────────────────────
// Validación de sesión compartida. Uso desde pages/:
//   import { requireLogin } from './auth-guard.js';
//   if (await requireLogin()) { ... }

const SERVER = '../server';

export async function requireLogin() {
  const token = localStorage.getItem('token');

  if (!token) {
    window.location.href = '../index.html';
    return false;
  }

  try {
    const res = await fetch(`${SERVER}/me.php`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '../index.html';
      return false;
    }
    return true;
  } catch {
    window.location.href = '../index.html';
    return false;
  }
}
