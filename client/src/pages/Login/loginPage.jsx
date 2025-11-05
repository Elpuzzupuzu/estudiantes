import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  loginUser,
  selectUser,
  selectLoginStatus,
} from "../../features/usuarios/usuariosSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectUser);
  const loginStatus = useSelector(selectLoginStatus);

  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!correo || !contraseña) return;
    dispatch(loginUser({ correo, contraseña }));
  };

  // ✅ Redirigir al home cuando el login sea exitoso o el usuario ya esté autenticado
  useEffect(() => {
    if (user && loginStatus === "succeeded") {
      navigate("/", { replace: true });
    }
  }, [user, loginStatus, navigate]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-80"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Iniciar sesión
        </h2>

        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
          required
        />

        <button
          type="submit"
          className="bg-indigo-600 text-white w-full py-2 rounded hover:bg-indigo-700 disabled:bg-indigo-400"
          disabled={loginStatus === "loading"}
        >
          {loginStatus === "loading" ? "Ingresando..." : "Iniciar sesión"}
        </button>

        {loginStatus === "failed" && (
          <p className="text-red-600 text-sm mt-3 text-center">
            Credenciales incorrectas o error al iniciar sesión.
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
