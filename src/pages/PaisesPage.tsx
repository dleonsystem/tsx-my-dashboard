import React from "react";
import UserList from "../components/CountriesList";
import { useTranslation } from "react-i18next";
import styles from "../styles/PaisesPage.module.css";

const PaisesPage: React.FC = () => {
    // Aquí puedes usar el hook useTranslation para traducir textos
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <h1>🌍 {t("countries.titlePage")}</h1>
      <UserList />
    </div>
  );
};

export default PaisesPage;
