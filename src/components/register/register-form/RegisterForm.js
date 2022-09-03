import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createCustomer } from "../../../features/customer/customerSlice.js";
import mailIcon from "../../../icons/mail.png";
import nameIcon from "../../../icons/name.png";
import calendarIcon from "../../../icons/calendar.png";
import phoneIcon from "../../../icons/phone.png";
import keyIcon from "../../../icons/key.png";
import LoadingSpinner from "../../utils/loading-spinner/LoadingSpinner.js";
import errorIcon from "../../../icons/error.png";
import styles from "./RegisterForm.module.css";

const RegisterForm = ({ onRegistrationSuccess }) => {

  const dispatch = useDispatch();

  // Error and status local state variables
  const [ status, setStatus ] = useState("idle");
  const [ error, setError ] = useState(null);
  
  // Form variables
  const [ email, setEmail ] = useState("");
  const [ firstName, setFirstName ] = useState("");
  const [ lastName, setLastName ] = useState("");
  const [ birthDate, setBirthDate ] = useState("");
  const [ phone, setPhone ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ confirmPassword, setConfirmPassword ] = useState("");

  // State setters collection
  const stateSetter = {
    email: setEmail,
    firstName: setFirstName,
    lastName: setLastName,
    birthDate: setBirthDate,
    phone: setPhone,
    password: setPassword,
    confirmPassword: setConfirmPassword
  };

  // Input change handler
  const handleInputChange = ({ target }) => {
    const name = target.name;
    const value = target.value;
    stateSetter[name](value);
  };

  // Function that handles the creation of payload to send to the server
  const createPayload = () => {
    // These are required fields, HTML input validation already ensures their truthiness
    let payload = {
      email,
      firstName,
      birthDate,
      password,
      confirmPassword
    };
    // Include optional fields in the payload if their value is truthy
    if (lastName) payload = { ...payload, lastName };
    if (phone) payload = { ...payload, phone };
    return payload;
  };

  // Submit handler
  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus("loading");
    setError(null);
    dispatch(createCustomer(createPayload()))
      .unwrap()
      .then(result => {
        setStatus("succeeded");
        setError(null);
        onRegistrationSuccess(true);
      })
      .catch(error => {
        setStatus("failed");
        setError(error);
      });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="email-register" className={styles.label}>
        <img src={mailIcon} alt="" className={styles.icon} />
        E-mail
      </label>
      <input
        id="email-register"
        className={styles.input}
        name="email"
        type="email"
        value={email}
        onChange={handleInputChange}
        required={true}
      />
      <label htmlFor="firstName-register" className={styles.label}>
        <img src={nameIcon} alt="" className={styles.icon} />
        First Name
      </label>
      <input 
        id="firstName-register"
        className={styles.input}
        name="firstName"
        type="text"
        value={firstName}
        onChange={handleInputChange}
        required={true}
        maxLength="100"
      />
      <label htmlFor="lastName-register" className={styles.label}>
        Last Name <span className={styles.labelDescription}>(optional)</span>
      </label>
      <input 
        id="lastName-register"
        className={styles.input}
        name="lastName"
        type="text"
        value={lastName}
        onChange={handleInputChange}
        maxLength="100"
      />
      <label htmlFor="birthDate-register" className={styles.label}>
        <img src={calendarIcon} alt="" className={styles.icon} />
        Birth Date <span className={styles.labelDescription}>(YYYY-MM-DD)</span>
      </label>
      <input
        id="birthDate-register"
        className={styles.input}
        name="birthDate"
        type="text"
        value={birthDate}
        onChange={handleInputChange}
        required={true}
      />
      <label htmlFor="phone-register" className={styles.label}>
        <img src={phoneIcon} alt="" className={styles.icon} />
        Phone <span className={styles.labelDescription}>(optional) (include country code)</span>
      </label>
      <input
        id="phone-register"
        className={styles.input}
        name="phone"
        type="tel"
        value={phone}
        onChange={handleInputChange}
      />
      <label htmlFor="password-register" className={styles.label}>
        <img src={keyIcon} alt="" className={styles.icon} />
        Password <br/><span className={styles.labelDescription}>(8-64 characters, 1+ uppercase letters, symbols and numbers)</span>
      </label>
      <input
        id="password-register"
        className={styles.input}
        name="password"
        type="password"
        value={password}
        onChange={handleInputChange}
        required={true}
        minLength="8"
        maxLength="64"
      />
      <label htmlFor="confirmPassword-register" className={styles.label}>
        Confirm Password
      </label>
      <input
        id="confirmPassword-register"
        className={styles.input}
        name="confirmPassword"
        type="password"
        value={confirmPassword}
        onChange={handleInputChange}
        required={true}
        minLength="8"
        maxLength="64"
      />
      { status === "loading" ?
        <LoadingSpinner size="8px" />
        :
        <input type="submit" className={styles.button} value="Submit" /> }
      { error && <p className={styles.errorMessage}>
                   <img src={errorIcon} alt="Error" className={styles.icon} />
                   {error}
                 </p>  
      }
    </form>
  );
};

export default RegisterForm;