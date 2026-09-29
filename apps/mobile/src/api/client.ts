import { RequestOtpResponse, UserRole, VerifyOtpResponse } from '@wow/shared-types';

// Change this to your computer's local network IP when testing on a real
// phone (not an emulator) — e.g. 'http://192.168.1.5:3000'. "localhost"
// only works from an emulator running on the same machine as the API.
export const API_BASE = 'http://localhost:3000';

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  const data = await res.json();

  if (!res.ok) {
    // NestJS validation/auth errors come back as { message: string | string[] }
    const message = Array.isArray(data.message) ? data.message.join(', ') : data.message;
    throw new Error(message || 'Something went wrong');
  }

  return data as T;
}

export const api = {
  requestOtp: (phone: string, role: UserRole) =>
    request<RequestOtpResponse>('/auth/otp', {
      method: 'POST',
      body: JSON.stringify({ phone, role }),
    }),

  verifyOtp: (phone: string, code: string, role: UserRole) =>
    request<VerifyOtpResponse>('/auth/verify', {
      method: 'POST',
      body: JSON.stringify({ phone, code, role }),
    }),

  me: (token: string) =>
    request('/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    }),
};
