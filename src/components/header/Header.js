import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice.js";
import styles from "./Header.module.css";
import shoppingBagIcon from "../../icons/shopping-bag.png";
import gitHubLogo from "../../icons/github.png";

const Header = () => {

  // Define variables used in the component
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const location = useLocation();
  const navigate = useNavigate();

  // Event handlers
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  // Define which header links to show based on user authentication status
  let headerLinks;
  if (isAuthenticated) {
    headerLinks = ( 
      <>
        <Link to="/my-account" className={styles.link}>My Account</Link>
        <button className={styles.logout} onClick={handleLogout}>Logout</button>
      </>
    );
  } else {
    headerLinks = (
      <Link to="/login" state={{ from: location }} replace={true} className={styles.link}>
        Login
      </Link>
    );
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.homeLink}>
          <img className={styles.logo} src={shoppingBagIcon} alt="Shopping Bag Icon" />
          <span className={styles.appName}>E-commerce Store</span>
        </Link>
        {/* <Searchbar /> */}
        { headerLinks }
        <a href="https://github.com/Pedro-Freddi/ecommerce-client" target="_blank" rel="noreferrer">
          <img className={styles.gitHubLogo} src={gitHubLogo} alt="GitHub logo" />
        </a>
      </div>
  </header>
  );
};

export default Header;