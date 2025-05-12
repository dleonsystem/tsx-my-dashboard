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
  };
  

const AuthContext = createContext<AuthContextType>({
  usuario: null,
  isAuthenticated: false,
  loading: true,
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const storedUser = localStorage.getItem("usuario");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        parsed.rol = parsed.rol.toLowerCase(); // normaliza
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
      <AuthContext.Provider value={{ usuario, isAuthenticated: !!usuario, loading, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  

export const useAuth = () => useContext(AuthContext);
