import React, { createContext, useContext, useState, useEffect } from "react";

// Define the structure of the user object (Usuario) and the context type (AuthContextType).
// This ensures type safety and clarity when working with the authentication context.
type Usuario = {
    id: string;
    nombre: string;
    correoElectronico: string;
    rol: string;
};

type AuthContextType = {
    usuario: Usuario | null; // Represents the current authenticated user or null if not authenticated.
    isAuthenticated: boolean; // Indicates whether the user is authenticated.
    loading: boolean; // Indicates whether the authentication state is still being determined.
    logout: () => void; // Function to log out the user.
    setUsuario: (u: Usuario | null) => void; // Function to update the user state.
};

// Create the authentication context with default values.
// This ensures that the context is initialized even if no provider is used.
const AuthContext = createContext<AuthContextType>({
    usuario: null,
    isAuthenticated: false,
    loading: true,
    logout: () => {},
    setUsuario: () => {},
});

// AuthProvider component is responsible for managing the authentication state and providing it to the application.
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [usuario, setUsuario] = useState<Usuario | null>(null); // State to store the current user.
    const [loading, setLoading] = useState(true); // State to indicate if the authentication state is being loaded.

    // useEffect is used to initialize the authentication state when the component mounts.
    useEffect(() => {
        const storedUser = localStorage.getItem("usuario"); // Retrieve the user from localStorage.
        if (storedUser) {
            const parsed = JSON.parse(storedUser); // Parse the stored user data.
            parsed.rol = parsed.rol.toLowerCase(); // Normalize the role to lowercase.

            const tokenTime = localStorage.getItem("tokenTime"); // Retrieve the token timestamp.
            const EXPIRATION_TIME = 1000 * 60 * 60; // Define the token expiration time (1 hour).

            // Check if the token has expired.
            if (tokenTime && Date.now() - parseInt(tokenTime) > EXPIRATION_TIME) {
                // If expired, clear the stored data and reset the state.
                localStorage.removeItem("token");
                localStorage.removeItem("usuario");
                localStorage.removeItem("tokenTime");
                setUsuario(null);
                setLoading(false);
                return;
            }

            setUsuario(parsed); // Set the user state if the token is valid.
        }
        setLoading(false); // Mark loading as complete.
    }, []);

    // Function to log out the user by clearing localStorage and redirecting to the login page.
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        setUsuario(null);
        window.location.href = "/login"; // Redirect to the login page.
    };

    // Provide the authentication state and functions to the application via context.
    return (
        <AuthContext.Provider
            value={{
                usuario,
                isAuthenticated: !!usuario, // Convert the user state to a boolean for authentication status.
                loading,
                logout,
                setUsuario,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to consume the authentication context.
// This simplifies access to the context in components.
export const useAuth = () => useContext(AuthContext);
