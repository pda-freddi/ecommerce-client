import React from "react";
import styles from "./PaymentForm.module.css";

const PaymentForm = () => {
  return (
    <section className={styles.container}>
      <h3 className={styles.title}>Payment Information</h3>
      <p className={styles.message}>
        Dummy credit card information provided below.
      </p>
      <form className={styles.form}>
        <label htmlFor="card-name-checkout" className={styles.label}>
            Name <span className={styles.labelDescription}>(as printed in the card)</span>
          </label>
          <input
            id="card-name-checkout"
            className={styles.input}
            name="cardName"
            type="text"
            value="John Freeman"
            readOnly={true}
          />
          <label htmlFor="card-number-checkout" className={styles.label}>
            Card Number
          </label>
          <input 
            id="card-number-checkout"
            className={styles.input}
            name="cardNumber"
            type="text"
            value="2361 9100 5724 8907"
            readOnly={true}
          />
          <label htmlFor="card-brand-checkout" className={styles.label}>
            Card Brand
          </label>
          <input 
            id="card-brand-checkout"
            className={styles.input}
            name="cardBrand"
            type="text"
            value="Mastercard"
            readOnly={true}
          />
          <label htmlFor="card-exp-date-checkout" className={styles.label}>
            Expiration Date
          </label>
          <input
            id="card-exp-date-checkout"
            className={styles.input}
            name="expirationDate"
            type="text"
            value="11/2025"
            readOnly={true}
          />
          <label htmlFor="card-cvv-checkout" className={styles.label}>
            CVV
          </label>
          <input
            id="card-cvv-checkout"
            className={styles.input}
            name="cvv"
            type="text"
            value="634"
            readOnly={true}
          />
      </form>
    </section>
  );
};

export default PaymentForm;