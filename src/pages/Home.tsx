import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Bienvenido al Panel Administrativo</h1>
      <p>Selecciona una opción:</p>

      <ul>
        <li>
          <Link to="/usuarios">🔧 Gestión de Usuarios</Link>
        </li>
        <li>
          <Link to="/paises">🌍 Consulta de Países</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
