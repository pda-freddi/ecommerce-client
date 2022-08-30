import React from "react";
import { Link } from "react-router-dom";
import Searchbar from "../searchbar/Searchbar.js";
import NavLinks from "../nav-links/NavLinks.js";
import shoppingBagIcon from "../../icons/shopping-bag.png";
import gitHubLogo from "../../icons/github.png";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.homeLink}>
        <img className={styles.logo} src={shoppingBagIcon} alt="Shopping Bag Icon" />
        <span className={styles.appName}>Clothes Shop</span>
      </Link>
      <Searchbar />
      <NavLinks />
      <a href="https://github.com/Pedro-Freddi/ecommerce-client" target="_blank" rel="noreferrer">
        <img className={styles.gitHubLogo} src={gitHubLogo} alt="GitHub repository" />
      </a>
    </header>
  );
};

export default Header;