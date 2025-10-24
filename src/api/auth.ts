// src/api/auth.ts
import api from "./http";

export type UserInfo = {
  usuario_id: number;
  colaborador_id?: number | null;
  nombre_usuario: string;
  rol_id: number;
  nombre_rol: string;
  permisos?: string[];
};

export type LoginResp = { token: string; user: UserInfo };

export async function login(username: string, password: string) {
  const { data } = await api.post<LoginResp>("/auth/login", {
    username,
    password,
  });
  return data;
}

export async function me() {
  const { data } = await api.get<UserInfo>("/auth/me");
  return data;
}
