import React from "react";
import profilePicture from "../../../icons/blank-profile.png";
import mailIcon from "../../../icons/mail.png";
import nameIcon from "../../../icons/name.png";
import calendarIcon from "../../../icons/calendar.png";
import phoneIcon from "../../../icons/phone.png";
import styles from "./CustomerProfile.module.css";

const CustomerProfile = ({ customer }) => {
  return (
      <section className={styles.container}>
        <h2 className={styles.title}>Customer Profile</h2>
        <div className={styles.dataContainer}>
          <img src={profilePicture} alt="Profile" className={styles.image} />
          <div>
            <p className={styles.data}>
              <img src={mailIcon} alt="" className={styles.icon} />
              E-mail: {customer.email}
            </p>
            <p className={styles.data}>
              <img src={nameIcon} alt="" className={styles.icon} />
              Name: {customer.firstName} {customer.lastName}
            </p>
            <p className={styles.data}>
              <img src={calendarIcon} alt="" className={styles.icon} />
              Birth Date: {customer.birthDate}
            </p>
            <p className={styles.data}>
              <img src={phoneIcon} alt="" className={styles.icon} />
              Phone Number: {customer.phone}
            </p>
          </div>
        </div>
      </section>
  );
};

export default CustomerProfile;