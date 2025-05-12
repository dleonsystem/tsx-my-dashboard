import React, { createContext, useContext, useState, useEffect } from "react";

type Usuario = {
  id: string;
  nombre: string;
  correoElectronico: string;
  rol: string;
};

type AuthContextType = {
  usuario: Usuario | null;
  isAuthenticated: boolean;
  loading: boolean;
  logout: () => void;
  setUsuario: (u: Usuario | null) => void;
};

const AuthContext = createContext<AuthContextType>({
  usuario: null,
  isAuthenticated: false,
  loading: true,
  logout: () => {},
  setUsuario: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      parsed.rol = parsed.rol.toLowerCase(); // normaliza

      const tokenTime = localStorage.getItem("tokenTime");
      const EXPIRATION_TIME = 1000 * 60 * 60; // 1 hora

      if (tokenTime && Date.now() - parseInt(tokenTime) > EXPIRATION_TIME) {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        localStorage.removeItem("tokenTime");
        setUsuario(null);
        setLoading(false);
        return;
      }

      setUsuario(parsed);
    }
    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setUsuario(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        isAuthenticated: !!usuario,
        loading,
        logout,
        setUsuario,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
