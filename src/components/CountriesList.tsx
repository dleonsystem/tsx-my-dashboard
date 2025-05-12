import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import styles from '../styles/UserList.module.css';
import { GET_COUNTRIES } from "../graphql/getCountries";
import { useTranslation } from "react-i18next";



type Country = {
  code: string;
  name: string;
  capital: string;
  emoji: string;
};

const ITEMS_PER_PAGE = 10;

const UserList: React.FC = () => {
  const { t } = useTranslation();
  const { loading, error, data } = useQuery(GET_COUNTRIES);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const filteredCountries: Country[] = data.countries.filter((country: Country) =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCountries.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCountries = filteredCountries.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };


  return (
    <div className={styles.container}>
      <h2>🌍 {t("countries.title")}</h2>

      <input
      type="text"
      placeholder={t("countries.search")}
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        setCurrentPage(1); // Reinicia a la primera página al buscar
      }}
      className={styles.input}
      />

      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Emoji</th>
            <th className={styles.th}>{t("countries.name")}</th>
            <th className={styles.th}>{t("countries.capital")}</th>
          </tr>
        </thead>
        <tbody>
          {paginatedCountries.map((country) => (
            <tr key={country.code}>
              <td className={styles.td}>{country.emoji}</td>
              <td className={styles.td}>{country.name}</td>
              <td className={styles.td}>{country.capital}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.paginador}>
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          ⬅️ {t("countries.previous")}
        </button>
        <span className="{styles.span-paginador}">
          {t("countries.page")} {currentPage} de {totalPages}
        </span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          {t("countries.next")} ➡️
        </button>
      </div>
    </div>
  );
};

export default UserList;
