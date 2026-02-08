// services/api/authFetch.ts
import { User } from "firebase/auth";

const API_BASE = import.meta.env.VITE_BACKEND_URL;

export async function authFetch(
  user: User,
  endpoint: string,
  options: RequestInit = {}
) {

  const token = await user.getIdToken();

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
}
