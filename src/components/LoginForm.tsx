import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { LOGIN_USUARIO } from "../graphql/mutations/loginUsuario";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Login.module.css";

type LoginInput = {
  correoElectronico: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const { register, handleSubmit } = useForm<LoginInput>();
  const navigate = useNavigate();
  const [login, { error }] = useMutation(LOGIN_USUARIO);

  const onSubmit = async (input: LoginInput) => {
    try {
      const response = await login({ variables: { input } });
      const loginData = response.data?.login;

      if (loginData?.status) {
        localStorage.setItem("token", loginData.token);
        localStorage.setItem("usuario", JSON.stringify(loginData.usuario));
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
