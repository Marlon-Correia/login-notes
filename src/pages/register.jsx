import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Router from "next/router";
import styles from "../../styles/login.module.css";
import { parseCookies } from "nookies";

const initialState = { email: "", password: "", emailConf: "", name: "" };
const register = () => {
  const { Register } = useAuth();
  const [formValues, setFormValues] = useState(initialState);

  const handleFormValues = (e) =>
    setFormValues({ ...formValues, [e.name]: e.value });

  const handleRegister = async () => {
    await Register(formValues);
    setFormValues(initialState);
    Router.push("/login");
  };
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h1>Register</h1>
        <form action="POST">
          <div>
            <input
              onChange={(e) => handleFormValues(e.target)}
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={formValues.email}
              className={styles.input}
            />
          </div>
          <div>
            <input
              onChange={(e) => handleFormValues(e.target)}
              type="email"
              name="emailConf"
              id="emailConf"
              placeholder="Confirme o email"
              value={formValues.emailConf}
              className={styles.input}
            />
          </div>
          <div>
            <input
              onChange={(e) => handleFormValues(e.target)}
              type="text"
              name="name"
              placeholder="Nome Completo"
              id="name"
              value={formValues.name}
              className={styles.input}
            />
          </div>
          <div>
            <input
              onChange={(e) => handleFormValues(e.target)}
              value={formValues.password}
              type="password"
              name="password"
              placeholder="Senha"
              id="password"
              className={styles.input}
            />
          </div>
        </form>
        <button className={styles.button} onClick={handleRegister}>
          Registrar
        </button>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { ["token-aluno"]: token } = parseCookies(context);

  if (token) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  return {
    props: {},
  };
};

export default register;
