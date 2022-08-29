import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import searchIcon from "../../icons/search.png";
import checkIcon from "../../icons/check.png";
import clearIcon from "../../icons/clear.png";
import styles from "./Searchbar.module.css";

const Searchbar = () => {

  const navigate = useNavigate();

  // Store search term on a local state variable
  const [ searchTerm, setSearchTerm ] = useState("");

  // Helper function to format the search term before submitting
  const formatSearchTerm = (term) => {
    return term.trim().toLowerCase().replaceAll(" ", "-");
  };

  // Handler for input change and submit
  const handleInputChange = ({ target }) => {
    setSearchTerm(target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formattedSearchTerm = formatSearchTerm(searchTerm);
    navigate(`/products?term=${formattedSearchTerm}`, { state: { term: searchTerm } });
    setSearchTerm("");
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <label htmlFor="search-input" className={styles.label}>
        <img 
        className={styles.searchIcon} 
        src={searchIcon}
        alt="Search" 
        />
      </label>
      <input
        className={styles.input}
        id="search-input"
        type="text"
        placeholder="Search products..."
        aria-label="search"
        value={searchTerm}
        onChange={handleInputChange}
        maxLength="100"
      />
      {
        searchTerm &&
        <>
          <button className={styles.searchButton} type="submit">
            <img src={checkIcon} alt="Submit" />
          </button>
          <button className={styles.clearButton} onClick={() => setSearchTerm("")}>
            <img src={clearIcon} alt="Clear" />
          </button>
        </>
      }
    </form>
  );
};

export default Searchbar;