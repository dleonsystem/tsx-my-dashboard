import React from "react";
import UsuarioCrud from "../components/UsuarioCrud";
import { ApolloProvider } from "@apollo/client";
import client5005 from "../api/apolloClient5005";
import { useTranslation } from "react-i18next";

const UsuariosPage: React.FC = () => {
    // Aquí puedes usar el hook useTranslation para traducir textos
    const { t } = useTranslation();
  return (
    <ApolloProvider client={client5005}>
      <div>
        <h1>{t("users.titlePage")}</h1>
        <UsuarioCrud />
      </div>
    </ApolloProvider>
  );
};

export default UsuariosPage;
