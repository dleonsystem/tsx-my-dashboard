import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";

type Props = {
  children: React.ReactNode;
  rolesPermitidos?: string[];
};

/**
 * A functional component that acts as a private route, restricting access based on authentication
 * status and user roles. It ensures that only authenticated users with the appropriate roles
 * can access the wrapped content.
 *
 * @component
 * @param {Props} props - The properties passed to the component.
 * @param {React.ReactNode} props.children - The child components to render if access is granted.
 * @param {string[]} [props.rolesPermitidos] - An optional array of roles that are allowed to access the route.
 *
 * @returns {JSX.Element} - The rendered component based on the authentication and role checks.
 *
 * @example
 * ```tsx
 * <RutaPrivada rolesPermitidos={['admin', 'editor']}>
 *   <Dashboard />
 * </RutaPrivada>
 * ```
 *
 * @remarks
 * - If the `loading` state is true, a spinner and loading message are displayed.
 * - If the user is not authenticated, they are redirected to the `/login` page.
 * - If the user's role is not included in `rolesPermitidos`, they are redirected to the home page (`/`).
 *
 * @requires useAuth - A custom hook that provides authentication state and user information.
 * @requires Spinner - A component to display a loading spinner.
 * @requires Navigate - A component from `react-router-dom` for navigation.
 */
const RutaPrivada: React.FC<Props> = ({ children, rolesPermitidos }) => {
  const { isAuthenticated, usuario, loading } = useAuth();

  if (loading) {
    return <div><Spinner />  <p style={{ padding: 20 }}>Cargando autenticación...</p></div> ;
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
