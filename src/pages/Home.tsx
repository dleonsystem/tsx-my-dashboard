import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Home.module.css";
import { useTranslation } from "react-i18next";

const Home: React.FC = () => {
    const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t("home.welcome")}</h1>
      <div className={styles.options}>
        <p>{t("home.options")}</p>
        <ul>
          <li><Link to="/usuarios">🛠️ {t("home.option1")}</Link></li>
          <li><Link to="/paises">🌍 {t("home.option2")}</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
