import Link from "next/link";
import React from "react";
import styles from "../../styles/home.module.css";

const Item = ({ disciplina, onDelete }) => {
  console.log(disciplina);
  return (
    <Link href={`/matery/${disciplina._id}/${disciplina.userId}`}>
      <li className={styles.item}>
        <p>{disciplina.name}</p>
        <button className={styles.buttonItem}>{disciplina.note}</button>
      </li>
    </Link>
  );
};

export default Item;
