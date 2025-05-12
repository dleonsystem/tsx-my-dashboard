import React from "react";
import UserList from "../components/UserList";

const PaisesPage: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>🌍 Consulta de Países</h1>
      <UserList />
    </div>
  );
};

export default PaisesPage;
