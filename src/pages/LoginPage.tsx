import { useAuth } from "@/auth/AuthContext";
import { useState } from "react";


type Tab = "colaborador" | "admin";

export default function LoginPage() {
  const [tab, setTab] = useState<Tab>("colaborador");
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [showCreds, setShowCreds] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signIn } = useAuth();

  const isAdmin = tab === "admin";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await signIn(username.trim(), pass);
      const raw = localStorage.getItem("auth");
      const user = raw ? JSON.parse(raw).user : null;
      const rol = user?.nombre_rol?.toLowerCase() || "";
      if (rol.includes("admin")) {
        location.href = "/admin";
      } else {
        location.href = "/inicio";
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Credenciales inválidas");
    }
  };

return (
  <>
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Logo y encabezado */}
    <div className="flex flex-col items-center gap-2 mb-6">
  <div className="h-28 w-28 flex items-center justify-center rounded-3xl bg-white shadow-md overflow-hidden">
    <img
      src="/logo_transparente.png"
      alt="Canella"
      className="h-[20rem] w-[20rem] object-contain transform scale-[2.2]"
    />
  </div>

  <h1 className="text-xl font-semibold text-gray-800 text-center">
    Bienvenido a Canella, S.A.
  </h1>
  <p className="text-gray-500 text-sm text-center -mt-1">
    Sistema Inteligente de Inducción de Personal
  </p>
</div>


        {/* Tabs */}
        <div className="grid grid-cols-2 bg-gray-100 rounded-xl p-1 mb-6 text-sm">
          <button
            onClick={() => setTab("colaborador")}
            className={`py-2 rounded-lg transition ${
              tab === "colaborador"
                ? "bg-white shadow font-medium text-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Colaborador
          </button>
          <button
            onClick={() => setTab("admin")}
            className={`py-2 rounded-lg transition ${
              tab === "admin"
                ? "bg-white shadow font-medium text-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Administrador
          </button>
        </div>

        {/* Encabezado según tipo */}
        <div className="flex items-center gap-2 mb-4">
          <div
            className={`h-8 w-8 grid place-items-center rounded-full ${
              isAdmin ? "bg-orange-100" : "bg-blue-100"
            }`}
          >
            <span>{isAdmin ? "🛡️" : "👤"}</span>
          </div>
          <div>
            <h2 className="font-medium text-gray-800">
              {isAdmin ? "Acceso Administrativo" : "Acceso de Colaborador"}
            </h2>
            <p className="text-xs text-gray-500">
              {isAdmin
                ? "Gestiona usuarios y planes de inducción"
                : "Completa tu proceso de inducción"}
            </p>
          </div>
        </div>

        {/* Formulario */}
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Usuario</label>
            <input
              type="text"
              className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={isAdmin ? "Administrador" : "Usuario"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">
              Contraseña {isAdmin && "Administrativa"}
            </label>
            <input
              type="password"
              className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="********"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <button
            type="submit"
            className={`w-full rounded-xl py-2 text-white transition ${
              isAdmin
                ? "bg-orange-600 hover:bg-orange-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isAdmin ? "Acceder al Panel Admin" : "Iniciar Plan de Inducción"}
          </button>
        </form>

        {/* Credenciales de prueba */}
        <div className="text-center mt-4">
          <button
            className="text-sm text-gray-600 hover:underline"
            onClick={() => setShowCreds((s) => !s)}
          >
            ▸ Ver credenciales de prueba
          </button>
          {showCreds && (
            <div className="mt-2 text-xs text-gray-600 bg-gray-50 rounded-lg p-3">
              <p><b>Colaborador:</b> colaborador / 123456</p>
              <p><b>Administrador:</b> admin / Adm1n!2025?</p>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          © 2024 Canella, S.A. Todos los derechos reservados.
        </p>
      </div>
    </div>
  </>
);
}
