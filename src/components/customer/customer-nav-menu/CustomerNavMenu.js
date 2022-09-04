import React from "react";
import { Link, Outlet } from "react-router-dom";
import EnsureAuthentication from "../../utils/ensure-authentication/EnsureAuthentication.js";
import accountIcon from "../../../icons/account.png";
import listIcon from "../../../icons/list-alt.png";
import updateIcon from "../../../icons/update.png";
import deleteIcon from "../../../icons/delete-forever.png";
import styles from "./CustomerNavMenu.module.css";

const CustomerNavMenu = () => {
  return (
    <EnsureAuthentication showMessage={true}>
      <section className={styles.container}>
        <h2 className={styles.title}>Account Menu</h2>
        <div className={styles.linksContainer}>
          <Link to="/my-account" className={styles.link}>
            <img src={accountIcon} alt="" className={styles.icon} />
            Customer Profile
          </Link>
          <Link to="orders" className={styles.link}>
            <img src={listIcon} alt="" className={styles.icon} />
            Orders
          </Link>
          <Link to="update" className={styles.link}>
            <img src={updateIcon} alt="" className={styles.icon} />
            Update Information
          </Link>
          <Link to="delete" className={styles.link}>
            <img src={deleteIcon} alt="" className={styles.icon} />
            Delete Account
          </Link>
        </div>
      </section>
      <Outlet />
    </EnsureAuthentication>
  );
};

export default CustomerNavMenu;