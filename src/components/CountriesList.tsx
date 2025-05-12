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

/**
 * UserList Component
 * 
 * This React functional component renders a paginated and searchable list of countries.
 * It fetches data using the `useQuery` hook, applies search and pagination logic, 
 * and displays the results in a table format. The component also supports internationalization (i18n) 
 * using the `useTranslation` hook.
 * 
 * @component
 * 
 * @returns {JSX.Element} The rendered UserList component.
 * 
 * @remarks
 * - The component uses the `GET_COUNTRIES` GraphQL query to fetch country data.
 * - It includes a search input to filter countries by name.
 * - Pagination is implemented with "Previous" and "Next" buttons.
 * - The component is styled using CSS modules (`styles` object).
 * - The `useTranslation` hook is used for multi-language support.
 * 
 * @example
 * ```tsx
 * import UserList from './CountriesList';
 * 
 * const App = () => (
 *   <div>
 *     <UserList />
 *   </div>
 * );
 * 
 * export default App;
 * ```
 * 
 * @dependencies
 * - `react`
 * - `react-i18next` for translations.
 * - `@apollo/client` for GraphQL queries.
 * 
 * @hooks
 * - `useTranslation` from `react-i18next` for translations.
 * - `useQuery` from `@apollo/client` for fetching data.
 * - `useState` from `react` for managing search input and pagination state.
 * 
 * @state
 * - `search` (`string`): The current search query entered by the user.
 * - `currentPage` (`number`): The current page number for pagination.
 * 
 * @variables
 * - `loading` (`boolean`): Indicates if the data is being loaded.
 * - `error` (`ApolloError | undefined`): Contains error information if the query fails.
 * - `data` (`any`): The fetched data containing the list of countries.
 * - `filteredCountries` (`Country[]`): The list of countries filtered by the search query.
 * - `totalPages` (`number`): The total number of pages based on the filtered countries.
 * - `startIndex` (`number`): The starting index for the current page.
 * - `paginatedCountries` (`Country[]`): The list of countries to display on the current page.
 * 
 * @methods
 * - `handlePrevious`: Decrements the current page number, ensuring it doesn't go below 1.
 * - `handleNext`: Increments the current page number, ensuring it doesn't exceed the total pages.
 * 
 * @i18n
 * - `t("countries.title")`: Title for the countries list.
 * - `t("countries.search")`: Placeholder text for the search input.
 * - `t("countries.name")`: Table header for country names.
 * - `t("countries.capital")`: Table header for country capitals.
 * - `t("countries.previous")`: Label for the "Previous" button.
 * - `t("countries.next")`: Label for the "Next" button.
 * - `t("countries.page")`: Label for the current page display.
 */
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
