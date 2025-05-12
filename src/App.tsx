import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import UsuariosPage from "./pages/UsuariosPage";
import PaisesPage from "./pages/PaisesPage";
import LoginPage from "./pages/LoginPage";
import RutaPrivada from "./components/RutaPrivada";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Página pública */}
        <Route path="/login" element={<LoginPage />} />

        {/* Rutas protegidas bajo el layout */}
        <Route path="/" element={<MainLayout />}>
          <Route
            index
            element={
              <RutaPrivada>
                <Home />
              </RutaPrivada>
            }
          />
          <Route
            path="usuarios"
            element={
              <RutaPrivada rolesPermitidos={["admin", "administrador", "usuario"]}>
                <UsuariosPage />
              </RutaPrivada>
            }
          />
          <Route
            path="paises"
            element={
              <RutaPrivada>
                <PaisesPage />
              </RutaPrivada>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
