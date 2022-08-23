import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./authSlice.js";
import LoadingSpinner from "../../components/utils/LoadingSpinner.js";
import styles from "./LoginForm.module.css";

const LoginForm = () => {

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
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login({ email, password }));
  };

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