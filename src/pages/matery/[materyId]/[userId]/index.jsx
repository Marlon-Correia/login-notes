import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../../../context/AuthContext";

import Nav from "../../../../components/nav";
import { getApiClient } from "../../../../services/axios";

import styles from "../../../../../styles/materies.module.css";
import { parseCookies } from "nookies";

const index = ({ matery }) => {
  const { query } = useRouter();
  const { GetMatery, UpdateMatery, DeleteMatery } = useAuth();

  const [note, setNote] = useState(matery);

  const handleMateryNote = (e) => setNote({ ...note, [e.name]: e.value });

  const handleIncFoult = () => {
    setNote((state) => {
      return { ...state, [state.absences]: state.absences++ };
    });
  };

  const handleDecFoult = () => {
    setNote((state) => {
      if (state.absences > 0)
        return { ...state, [state.absences]: state.absences-- };
      return state;
    });
  };

  const handleUpdateMatery = async () => {
    const updatedMatery = await UpdateMatery(
      note,
      query.materyId,
      query.userId
    );
    console.log(updatedMatery);
  };

  const handleDeleteMatery = async () => {
    await DeleteMatery(query.materyId, query.userId);
    console.log("deletedMatery");
  };

  return (
    <>
      <Nav />
      <div className={styles.main}>
        <div className={styles.info}>
          <h1>{note.name}</h1>
          <input
            className={styles.materyNote}
            type="text"
            name="note"
            id="note"
            onChange={(e) => handleMateryNote(e.target)}
            value={note.note}
          />
        </div>
        <div className={styles.absenceArea}>
          <h1>Faltas</h1>
          <div className={styles.foults}>
            <button onClick={handleDecFoult} className={styles.materyNote}>
              -
            </button>
            <input
              className={styles.materyNote}
              type="text"
              name="absences"
              id="absences"
              value={note.absences}
            />
            <button onClick={handleIncFoult} className={styles.materyNote}>
              +
            </button>
          </div>
        </div>
        <button onClick={handleUpdateMatery} className={styles.button}>
          Atualizar Matéria
        </button>
        <button onClick={handleDeleteMatery} className={styles.buttonDelete}>
          Delete
        </button>
      </div>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const apiClient = getApiClient(context);
  const { ["token-aluno"]: token } = parseCookies(context);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: true,
      },
    };
  }

  const { materyId, userId } = context.query;
  let { data } = await apiClient.get(`/api/notes/${userId}/${materyId}`);

  return {
    props: {
      matery: data.matery,
    },
  };
};

export default index;
