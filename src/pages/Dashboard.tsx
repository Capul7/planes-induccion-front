import { useAuth } from "../auth/AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth();
  return (
    <div style={{ padding: 24 }}>
      <h1>Bienvenido, {user?.nombreColaborador || user?.userName}</h1>
      <p>Rol: {user?.rol}</p>
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
}
