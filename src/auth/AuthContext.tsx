// src/state/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { me, login, type UserInfo, type LoginResp } from "@/api/auth";

type AuthState = {
  user: UserInfo | null;
  token: string | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  hasPerm: (perm: string) => boolean;
  hasAnyPerm: (perms: string[]) => boolean;
};

const Ctx = createContext<AuthState>({} as any);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem("auth");
    if (!raw) return setLoading(false);

    const { token: t, user: u } = JSON.parse(raw) as LoginResp;
    setToken(t);
    setUser(u);
    // refrescar perfil
    me().then(setUser).finally(() => setLoading(false));
  }, []);

  const signIn = async (email: string, password: string) => {
    const data = await login(email, password);
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem("auth", JSON.stringify(data));
  };

  const signOut = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("auth");
  };

  const hasPerm = (perm: string) => {
    const list = user?.permisos || [];
    return list.includes(perm);
  };

  const hasAnyPerm = (perms: string[]) => perms.some(hasPerm);

  return (
    <Ctx.Provider value={{ user, token, isLoading, signIn, signOut, hasPerm, hasAnyPerm }}>
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () => useContext(Ctx);
