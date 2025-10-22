import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, login as doLogin, logout as doLogout } from "../api/auth";
import type { LoginResponse } from "../api/auth";

type AuthCtx = {
  user: LoginResponse | null;
  login: (u: string, p: string) => Promise<void>;
  logout: () => void;
};

const Ctx = createContext<AuthCtx>({} as any);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<LoginResponse | null>(null);

  useEffect(() => setUser(getCurrentUser()), []);

  const login = async (username: string, password: string) => {
    const data = await doLogin(username, password);
    setUser(data);
  };

  const logout = () => {
    doLogout();
    setUser(null);
  };

  return <Ctx.Provider value={{ user, login, logout }}>{children}</Ctx.Provider>;
}

export const useAuth = () => useContext(Ctx);
