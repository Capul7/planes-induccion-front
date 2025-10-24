import { AuthProvider } from "@/auth/AuthContext";
import { Navigate, Route, Routes } from "react-router-dom";

import AdminPanel from "@/pages/AdminPanel";
import Inicio from "@/pages/Inicio";
import LoginPage from "@/pages/LoginPage";
import Unauthorized from "@/pages/Unauthorized";
import { RequireAuth } from "@/routes/RequireAuth";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* Rutas protegidas */}
        <Route
          path="/admin"
          element={
            <RequireAuth roles={["Administrador", "Admin"]}>
              <AdminPanel />
            </RequireAuth>
          }
        />

        <Route
          path="/inicio"
          element={
            <RequireAuth>
              <Inicio />
            </RequireAuth>
          }
        />

        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Defaults */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
  );
}
