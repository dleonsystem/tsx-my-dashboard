import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type Props = {
  children: React.ReactNode;
  rolesPermitidos?: string[];
};

const RutaPrivada: React.FC<Props> = ({ children, rolesPermitidos }) => {
  const { isAuthenticated, usuario, loading } = useAuth();

  if (loading) {
    return <p style={{ padding: 20 }}>Cargando autenticación...</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (rolesPermitidos && !rolesPermitidos.includes(usuario?.rol || "")) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default RutaPrivada;
