import React from "react";
import UserList from "../components/CountriesList";
import { useTranslation } from "react-i18next";


const PaisesPage: React.FC = () => {
    // Aquí puedes usar el hook useTranslation para traducir textos
  const { t } = useTranslation();
  return (
    <div style={{ padding: "20px" }}>
      <h1>🌍 {t("countries.titlePage")}</h1>
      <UserList />
    </div>
  );
};

export default PaisesPage;
