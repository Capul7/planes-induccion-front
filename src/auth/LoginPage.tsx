import { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setU] = useState("");
  const [password, setP] = useState("");
  const [err, setErr] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    try {
      await login(username, password);
      navigate("/home",{replace:true});
    } catch (e: any) {
      const status = e?.response?.status;
      if (status === 404) setErr("Endpoint no encontrado (revisa VITE_API_BASE en .env.local).");
      else if (status === 401) setErr("Usuario o contraseña inválidos.");
      else setErr("Error de conexión con el servidor.");
    }
  };

  return (
    <div style={{ maxWidth: 360, margin: "4rem auto", display: "grid", gap: 12 }}>
      <h2>Iniciar sesión</h2>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 8 }}>
        <input
           name="username"
          autoComplete="username"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setU(e.target.value)}
        />
        <input
          name="password"
          autoComplete="current-password"
          placeholder="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setP(e.target.value)}
        />
        <button type="submit">Entrar</button>
        {err && <p style={{ color: "crimson" }}>{err}</p>}
      </form>
    </div>
  );
}
