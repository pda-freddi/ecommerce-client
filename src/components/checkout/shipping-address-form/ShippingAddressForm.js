import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createOrder } from "../../../features/orders/ordersSlice.js";
import LoadingSpinner from "../../utils/loading-spinner/LoadingSpinner.js";
import styles from "./ShippingAddressForm.module.css";

const ShippingAddressForm = ({ onCheckoutSuccess }) => {

  const dispatch = useDispatch();

  // Local state variables
  const [ status, setStatus ] = useState("idle");
  const [ error, setError ] = useState(null);

  // Form variables
  const [ addressLine1, setAddressLine1 ] = useState("");
  const [ addressLine2, setAddressLine2 ] = useState("");
  const [ city, setCity ] = useState("");
  const [ postalCode, setPostalCode ] = useState("");
  const [ country, setCountry ] = useState("");

  // Collect all state setters in a single object
  const stateSetters = {
    addressLine1: setAddressLine1,
    addressLine2: setAddressLine2,
    city: setCity,
    postalCode: setPostalCode,
    country: setCountry
  };

  // Input change handler
  const handleInputChange = ({ target }) => {
    const name = target.name;
    const value = target.value;
    stateSetters[name](value);
  };

  // Function that handles the creation of a payload to send to the server
  const createPayload = () => {
    // These are required fields, HTML input validation already ensures their truthiness
    let payload = {
      addressLine1,
      city,
      postalCode,
      country
    };
    // Include optional fields in the payload if their value is truthy
    if (addressLine2) payload = { ...payload, addressLine2 };
    return payload;
  };

  // Submit handler to create the order
  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus("loading");
    setError(null);
    dispatch(createOrder(createPayload()))
      .unwrap()
      .then(({ orderId }) => {
        setStatus("succeeded");
        setError(null);
        onCheckoutSuccess(orderId);
      })
      .catch(error => {
        setStatus("failed");
        setError(error);
      });
  };

  return (
    <section className={styles.container}>
      <h3 className={styles.title}>Shipping Information</h3>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="address-line1-checkout" className={styles.label}>
          Address Line 1
        </label>
        <input
          id="address-line1-checkout"
          className={styles.input}
          name="addressLine1"
          type="text"
          value={addressLine1}
          onChange={handleInputChange}
          required={true}
          maxLength="200"
        />
        <label htmlFor="address-line2-checkout" className={styles.label}>
          Address Line 2 <span className={styles.labelDescription}>(optional)</span>
        </label>
        <input 
          id="address-line2-checkout"
          className={styles.input}
          name="addressLine2"
          type="text"
          value={addressLine2}
          onChange={handleInputChange}
          maxLength="200"
        />
        <label htmlFor="city-checkout" className={styles.label}>
          City
        </label>
        <input 
          id="city-checkout"
          className={styles.input}
          name="city"
          type="text"
          value={city}
          onChange={handleInputChange}
          required={true}
          maxLength="100"
        />
        <label htmlFor="postal-code-checkout" className={styles.label}>
          Postal Code
        </label>
        <input
          id="postal-code-checkout"
          className={styles.input}
          name="postalCode"
          type="text"
          value={postalCode}
          onChange={handleInputChange}
          required={true}
          maxLength="50"
        />
        <label htmlFor="country-checkout" className={styles.label}>
          Country
        </label>
        <input
          id="country-checkout"
          className={styles.input}
          name="country"
          type="text"
          value={country}
          onChange={handleInputChange}
          required={true}
          maxLength="100"
        />
        { status === "loading" ?
          <LoadingSpinner size="8px" />
          :
          <input type="submit" className={styles.button} value="Place Order" /> }
        { error && <p className={styles.errorMessage}>{error}</p> }
      </form>
    </section>
  );
};

export default ShippingAddressForm;