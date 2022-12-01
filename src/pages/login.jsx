import Link from "next/link";
import { parseCookies } from "nookies";
import React, { useState } from "react";
import styles from "../../styles/login.module.css";
import { useAuth } from "../context/AuthContext";

const initialState = { email: "", password: "" };

const Login = () => {
  const { SignIn } = useAuth();
  const [formValues, setFormValues] = useState(initialState);

  const handleLogin = async () =>
    await SignIn(formValues.email, formValues.password);

  const handleFormValues = (e) =>
    setFormValues({ ...formValues, [e.name]: e.value });

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <form className={styles.form} action="POST">
          <h1 className={styles.title}>SignIn</h1>
          <div>
            <input
              onChange={(e) => handleFormValues(e.target)}
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className={styles.input}
              value={formValues.email}
            />
          </div>
          <div>
            <input
              onChange={(e) => handleFormValues(e.target)}
              value={formValues.password}
              type="password"
              name="password"
              className={styles.input}
              id="password"
              placeholder="Password"
            />
          </div>
        </form>
        <button onClick={handleLogin} className={styles.button}>
          Enviar
        </button>
        <p>
          Não tem uma conta ?
          <Link href="/register">
            {" "}
            <strong>Se registre aqui.</strong>
          </Link>
        </p>
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

export default Login;
