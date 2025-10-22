const API = import.meta.env.VITE_API_BASE; // ej: https://.../api

export type LoginResponse = {
  token: string;
  expiresAt: string;
  usuarioId: number;
  colaboradorId: number | null;
  userName: string;
  rol: string;
  nombreColaborador: string | null;
};

// --- utils ----------------------------------------------------
function setToken(token: string) {
  localStorage.setItem("token", token);
}
function getToken(): string | null {
  return localStorage.getItem("token");
}
export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

// --- API calls ------------------------------------------------
export async function login(username: string, password: string): Promise<LoginResponse> {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Login failed (${res.status})`);
  }

  const data = (await res.json()) as LoginResponse;
  setToken(data.token);
  // guarda al usuario “casi” completo para mostrar en UI
  localStorage.setItem("user", JSON.stringify(data));
  return data;
}

export function getCurrentUser(): LoginResponse | null {
  const raw = localStorage.getItem("user");
  if (!raw) return null;
  try { return JSON.parse(raw) as LoginResponse; } catch { return null; }
}

// (Opcional) Golpea /auth/me si quieres refrescar datos protegidos
export async function me(): Promise<any> {
  const tok = getToken();
  if (!tok) throw new Error("No token");
  const res = await fetch(`${API}/auth/me`, {
    headers: { Authorization: `Bearer ${tok}` }
  });
  if (!res.ok) throw new Error(`Me failed (${res.status})`);
  return res.json();
}
