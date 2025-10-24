import { Navigate } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";
import { ReactNode } from "react";

export function RequireAuth({
  children,
  roles,
}: {
  children: ReactNode;
  roles?: string[];
}) {
  const { user, isLoading } = useAuth();
  if (isLoading) return null; // spinner si quieres

  if (!user) return <Navigate to="/login" replace />;

  if (roles && roles.length > 0) {
    const ok = roles.some((r) => r.toLowerCase() === user.nombre_rol.toLowerCase());
    if (!ok) return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}
