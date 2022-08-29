import React from "react";
import RoutesConfig from "./RoutesConfig.js";
import styles from "./Main.module.css";

const Main = () => {
  return (
    <main className={styles.container}>
      <RoutesConfig />
    </main>
  );
};

export default Main;