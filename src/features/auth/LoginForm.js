import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./authSlice.js";
import LoadingSpinner from "../../components/utils/LoadingSpinner.js";
import { ClipLoader } from "react-spinners";
import styles from "./LoginForm.module.css";

const LoginForm = () => {

  // To do:
  // - Add logic to redirect the user to the page he was previously or to the homepage if
  // he came directly to the login page; add a timer for redirect
  // - Verify if it's necessary to clear input text after succesful login or if it can/will persist
  // - Test what happens if user comes back to login page after sucessful login

  const dispatch = useDispatch();
  
  const authStatus = useSelector(state => state.auth.status);
  const authError = useSelector(state => state.auth.error);

  // Form variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const stateSetters = {
    email: setEmail,
    password: setPassword
  };

  // Form change event handler
  const handleInputChange = ({ target }) => {
    const name = target.name;
    const value = target.value;
    stateSetters[name](value);
  };

  // Submit event handler
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  if (authStatus === "succeeded") {
    return (
      <>
        <p className={styles.successMessage}>Login successful!</p>
        <p className={styles.redirectMessage}>Redirecting...</p>
        <ClipLoader />
        <button onClick={handleLogout}>Logout</button>
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label htmlFor="email-login" className={styles.label}>E-mail</label>
      <input
        id="email-login"
        className={styles.input}
        name="email"
        type="email"
        value={email}
        onChange={handleInputChange}
        required={true}
        />
      <label htmlFor="password-login" className={styles.label}>Password</label>
      <input
        id="password-login"
        className={styles.input}
        name="password"
        type="password"
        value={password}
        onChange={handleInputChange}
        required={true}
        />
      { authStatus === "loading" ? 
        <LoadingSpinner size="8px" />
        : <input type="submit" className={styles.button} value="Login" /> }
      { authError && <p className={styles.errorMessage}>{authError}</p> }
    </form>
  );
};

export default LoginForm;