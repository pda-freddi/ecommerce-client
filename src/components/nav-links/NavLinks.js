import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice.js";
import shoppingCartIcon from "../../icons/shopping-cart.png";
import accountIcon from "../../icons/account.png";
import logoutIcon from "../../icons/logout.png";
import registerIcon from "../../icons/person.png";
import loginIcon from "../../icons/login.png";
import styles from "./NavLinks.module.css";

const NavLinks = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Get authentication state from store
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  // Logout button click handler
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

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
        <button className={styles.logout} onClick={handleLogout}>
          <img src={logoutIcon} alt="Logout" className={styles.icon} />
          Logout
        </button>
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