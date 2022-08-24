import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCustomerInfo } from "../../../features/customer/customerSlice.js";
import LoadingSpinner from "../../utils/loading-spinner/LoadingSpinner.js";
import styles from "./CustomerUpdateForm.module.css";

const CustomerUpdateForm = ({ customer, onUpdateSuccess }) => {

  const dispatch = useDispatch();

  // Error and status variables
  const [ status, setStatus ] = useState("idle");
  const [ error, setError ] = useState(null);

  // Form variables
  const [ email, setEmail ] = useState(customer.email);
  const [ firstName, setFirstName ] = useState(customer.firstName);
  const [ lastName, setLastName ] = useState(customer.lastName || "");
  const [ birthDate, setBirthDate ] = useState(customer.birthDate);
  const [ phone, setPhone ] = useState(customer.phone || "");
  const [ password, setPassword ] = useState("");
  const [ confirmPassword, setConfirmPassword ] = useState("");

  // State setters
  const stateSetters = {
    email: setEmail,
    firstName: setFirstName,
    lastName: setLastName,
    birthDate: setBirthDate,
    phone: setPhone,
    password: setPassword,
    confirmPassword: setConfirmPassword
  };

  // Change handler
  const handleInputChange = ({ target }) => {
    const name = target.name;
    const value = target.value;
    stateSetters[name](value);
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
    dispatch(updateCustomerInfo(createPayload()))
      .unwrap()
      .then(result => {
        setStatus("succeeded");
        setError(null);
        onUpdateSuccess(true);
      })
      .catch(error => {
        setStatus("failed");
        setError(error);
      })
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="email-update" className={styles.label}>E-mail</label>
      <input
        id="email-update"
        className={styles.input}
        name="email"
        type="email"
        value={email}
        onChange={handleInputChange}
        required={true}
      />
      <label htmlFor="firstName-update" className={styles.label}>First Name</label>
      <input 
        id="firstName-update"
        className={styles.input}
        name="firstName"
        type="text"
        value={firstName}
        onChange={handleInputChange}
        required={true}
        maxLength="100"
      />
      <label htmlFor="lastName-update" className={styles.label}>
        Last Name <span className={styles.labelDescription}>(optional)</span>
      </label>
      <input 
        id="lastName-update"
        className={styles.input}
        name="lastName"
        type="text"
        value={lastName}
        onChange={handleInputChange}
        maxLength="100"
      />
      <label htmlFor="birthDate-update" className={styles.label}>
        Birth Date <span className={styles.labelDescription}>(YYYY-MM-DD)</span>
      </label>
      <input
        id="birthDate-update"
        className={styles.input}
        name="birthDate"
        type="text"
        value={birthDate}
        onChange={handleInputChange}
        required={true}
      />
      <label htmlFor="phone-update" className={styles.label}>
        Phone <span className={styles.labelDescription}>(optional) (include country code)</span>
      </label>
      <input
        id="phone-update"
        className={styles.input}
        name="phone"
        type="tel"
        value={phone}
        onChange={handleInputChange}
      />
      <label htmlFor="password-update" className={styles.label}>
        Password <br/><span className={styles.labelDescription}>(8-64 characters, 1+ uppercase letters, symbols and numbers)</span>
      </label>
      <input
        id="password-update"
        className={styles.input}
        name="password"
        type="password"
        value={password}
        onChange={handleInputChange}
        required={true}
        minLength="8"
        maxLength="64"
      />
      <label htmlFor="confirmPassword-update" className={styles.label}>
        Confirm Password
      </label>
      <input
        id="confirmPassword-update"
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
      { error && <p className={styles.errorMessage}>{error}</p> }
    </form>
  );
};

export default CustomerUpdateForm;