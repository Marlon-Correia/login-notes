import React from "react";
import { useAuth } from "../context/AuthContext";
import styles from "../../styles/home.module.css";

const nav = () => {
  const { LogOut } = useAuth();

  return (
    <div className={styles.navBar}>
      <h1 className={styles.logo}>SisNotes</h1>
      <button onClick={LogOut}>Sair</button>
    </div>
  );
};

export default nav;
