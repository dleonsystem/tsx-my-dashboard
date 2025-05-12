import React from "react";
import UsuarioCrud from "../components/UsuarioCrud";
import { ApolloProvider } from "@apollo/client";
import client5005 from "../api/apolloClient5005";

const UsuariosPage: React.FC = () => {
  return (
    <ApolloProvider client={client5005}>
      <div>
        <h1>Página de Gestión de Usuarios</h1>
        <UsuarioCrud />
      </div>
    </ApolloProvider>
  );
};

export default UsuariosPage;
