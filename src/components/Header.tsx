import React from "react";
import styles from "../styles/Header.module.css";

type HeaderProps = {
  title: string;
  children?: React.ReactNode;
};

const Header: React.FC<HeaderProps> = ({ title, children }) => {
  return (
    <header className={styles.header}>
      <h1>{title}</h1>
      {children && <div className={styles.subtitle}>{children}</div>}
    </header>
  );
};

export default Header;
