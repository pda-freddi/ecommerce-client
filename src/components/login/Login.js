import React from "react";
import LoginForm from "../../features/auth/LoginForm.js";
import styles from "./Login.module.css";

const LoginPage = () => {
  
  // To do: add link to register page

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Log in to your account</h2>
      <LoginForm />
      <p className={styles.message}>Don't have an account? Register here.</p>
    </section>
  );
};

export default LoginPage;