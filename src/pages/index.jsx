import React, { useState } from "react";
import { parseCookies } from "nookies";
import { getApiClient } from "../services/axios";
import styles from "../../styles/home.module.css";
import { useAuth } from "../context/AuthContext";
import Nav from "../components/nav";
import Item from "../components/item";

const initialState = { name: "", note: "" };
export default function Home({ user, materies }) {
  const { AddMatery, DeleteMatery, GetMateries } = useAuth();

  const [subjects, setSubjects] = useState(materies);
  const [formValues, setFormValues] = useState(initialState);

  const handleSaveMatery = async () => {
    await AddMatery(formValues, user.id);
    const newMateries = await GetMateries(user.id);
    setSubjects(newMateries);
    setFormValues(initialState);
  };
  const handleDeleteMatery = async (materyId, userId) => {
    await DeleteMatery(materyId, userId);
    const novasMateries = await GetMateries(user.id);
    setSubjects(novasMateries);
  };

  const handleFormValues = (e) =>
    setFormValues({ ...formValues, [e.name]: e.value });

  return (
    <>
      <Nav />
      <div className={styles.notes}>
        {subjects.map((item, index) => (
          <Item key={index} disciplina={item} onDelete={handleDeleteMatery} />
        ))}

        <div className={styles.new}>
          <input
            onChange={(e) => handleFormValues(e.target)}
            type="text"
            name="name"
            id="name"
            placeholder="Matery name"
            value={formValues.name}
          />
          <input
            onChange={(e) => handleFormValues(e.target)}
            value={formValues.note}
            type="text"
            name="note"
            placeholder="Note"
            id="note"
          />
          <button onClick={handleSaveMatery}>Add Matery</button>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const apiClient = getApiClient(context);
  const { ["token-aluno"]: token } = parseCookies(context);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  let { data } = await apiClient.get(`/api/session/${token}`);
  let materies = await apiClient.get(`/api/notes/${data.user.id}`);

  return {
    props: {
      user: data.user,
      materies: materies.data.materies,
    },
  };
};
