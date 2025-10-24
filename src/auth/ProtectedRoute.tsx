// src/auth/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({ allowed }: { allowed?: string[] }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  if (allowed && !allowed.includes(user.nombre_rol.toUpperCase())) {
    // si no tiene rol permitido, mándalo a home o a una página 403
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
}
