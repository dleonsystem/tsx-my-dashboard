import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { LOGIN_USUARIO } from "../graphql/mutations/loginUsuario";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Login.module.css";
import { useAuth } from "../context/AuthContext";

type LoginInput = {
  correoElectronico: string;
  password: string;
};

/**
 * LoginForm Component
 *
 * Este componente representa un formulario de inicio de sesión que permite a los usuarios autenticarse.
 * Utiliza React, React Hook Form, y Apollo Client para manejar la lógica de autenticación.
 *
 * @component
 *
 * @returns {JSX.Element} El formulario de inicio de sesión.
 *
 * @remarks
 * - Este componente utiliza el contexto de autenticación proporcionado por `useAuth` para actualizar el usuario autenticado.
 * - Utiliza `useForm` de React Hook Form para manejar la validación y el envío del formulario.
 * - Utiliza `useMutation` de Apollo Client para realizar la mutación de inicio de sesión en el servidor.
 * - Redirige al usuario a la página principal (`"/"`) después de un inicio de sesión exitoso.
 *
 * @example
 * ```tsx
 * import LoginForm from './LoginForm';
 *
 * const App = () => (
 *   <div>
 *     <LoginForm />
 *   </div>
 * );
 * ```
 *
 * @dependencies
 * - `useAuth`: Hook personalizado para manejar el contexto de autenticación.
 * - `useForm`: Hook de React Hook Form para manejar formularios.
 * - `useNavigate`: Hook de React Router para la navegación.
 * - `useMutation`: Hook de Apollo Client para realizar mutaciones GraphQL.
 *
 * @function onSubmit
 * Maneja el envío del formulario de inicio de sesión.
 * 
 * @param {LoginInput} input - Los datos ingresados por el usuario en el formulario.
 * @returns {Promise<void>} Una promesa que se resuelve después de procesar el inicio de sesión.
 *
 * @throws {Error} Muestra un mensaje de error si ocurre un problema de red o si el inicio de sesión falla.
 *
 * @state
 * - `error`: Estado proporcionado por Apollo Client para manejar errores en la mutación.
 *
 * @localStorage
 * - `tokenTime`: Marca de tiempo del inicio de sesión almacenada en el almacenamiento local.
 * - `token`: Token de autenticación del usuario.
 * - `usuario`: Información del usuario autenticado en formato JSON.
 *
 * @styles
 * - `styles.loginContainer`: Clase CSS para el contenedor principal del formulario.
 * - `styles.loginBox`: Clase CSS para el cuadro del formulario.
 */
const LoginForm: React.FC = () => {
    const { setUsuario } = useAuth();

  const { register, handleSubmit } = useForm<LoginInput>();
  const navigate = useNavigate();
  const [login, { error }] = useMutation(LOGIN_USUARIO);

  const onSubmit = async (input: LoginInput) => {
    try {
      const response = await login({ variables: { input } });
      const loginData = response.data?.login;

      if (loginData?.status) {
        const timestamp = Date.now();
        localStorage.setItem("tokenTime", timestamp.toString());
        localStorage.setItem("token", loginData.token);
        localStorage.setItem("usuario", JSON.stringify(loginData.usuario));
        setUsuario(loginData.usuario); // ✅ actualiza el contexto inmediatamente
        navigate("/");
      } else {
        alert("Login fallido: " + (loginData?.message ?? "Error desconocido"));
      }
    } catch {
      alert("Error de red.");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h2>Iniciar sesión</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Correo electrónico</label>
          <input type="email" {...register("correoElectronico")} required />

          <label>Contraseña</label>
          <input type="password" {...register("password")} required />

          <button type="submit">Ingresar</button>

          {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
