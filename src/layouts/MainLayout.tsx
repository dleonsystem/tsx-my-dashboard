import React from "react";
import { Link, Outlet } from "react-router-dom";
import styles from "../styles/MainLayout.module.css";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";

const MainLayout: React.FC = () => {
      const { t } = useTranslation();
  const { usuario, logout } = useAuth();
  return (
    <div className={styles.layout}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>🌐 Panel React + GraphQL</div>
        <ul className={styles.navLinks}>
          <li><Link to="/">{t("navbar.home")}</Link></li>
          <li><Link to="/usuarios">{t("navbar.users")}</Link></li>
          <li><Link to="/paises">{t("navbar.countries")}</Link></li>
        </ul>
        <span>{t("navbar.welcome")}, {usuario?.nombre}</span>
        <button onClick={logout}>{t("navbar.logout")}</button>
      </nav>

      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
