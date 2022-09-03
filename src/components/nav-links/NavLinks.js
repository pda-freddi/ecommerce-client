import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutButton from "../login/logout-button/LogoutButton.js";
import shoppingCartIcon from "../../icons/shopping-cart.png";
import accountIcon from "../../icons/account.png";
import registerIcon from "../../icons/person.png";
import loginIcon from "../../icons/login.png";
import styles from "./NavLinks.module.css";

const NavLinks = () => {

  const location = useLocation();

  // Get authentication state from store
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  // Show relevant links based on authentication status
  if (isAuthenticated) {
    return (
      <>
        <Link to ="/cart" className={styles.link}>
          <img src={shoppingCartIcon} alt="Shopping Cart" className={styles.icon} />
          Cart
        </Link>
        <Link to="/my-account" className={styles.link}>
          <img src={accountIcon} alt="Account" className={styles.icon} />
          My Account
        </Link>
        <LogoutButton />
      </>
    );
  }

  return (
    <>
      <Link to ="/cart" className={styles.link}>
        <img src={shoppingCartIcon} alt="Shopping Cart" className={styles.icon} />
        Cart
      </Link>
      <Link to="/register" className={styles.link}>
        <img src={registerIcon} alt="Registration" className={styles.icon} />
        Register
      </Link>
      <Link to="/login" state={{ from: location }} replace={true} className={styles.link}>
        <img src={loginIcon} alt="Login" className={styles.icon} />
        Login
      </Link>
    </>
  );
};

export default NavLinks;