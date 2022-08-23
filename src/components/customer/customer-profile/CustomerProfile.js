import React from "react";
import { Link } from "react-router-dom";
import styles from "./CustomerProfile.module.css";

const CustomerProfile = ({ customer }) => {
  return (
      <>
      <article className={styles.container}>
        <h2 className={styles.title}>Your Profile</h2>
        <p className={styles.data}>E-mail: {customer.email}</p>
        <p className={styles.data}>First Name: {customer.firstName}</p>
        <p className={styles.data}>Last Name: {customer.lastName}</p>
        <p className={styles.data}>Birth Date: {customer.birthDate}</p>
        <p className={styles.data}>Phone Number: {customer.phone}</p>
      </article>
      <section className={styles.linksContainer}>
        <Link to="orders" className={styles.link}>Your Orders</Link>
        <Link to="update" className={styles.link}>Update Information</Link>
        <Link to="delete" className={styles.link}>Delete Profile</Link>
      </section>
    </>
  );
};

export default CustomerProfile;