import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const MateryPage = () => {
  const { user, GetMatery } = useAuth();

  const handleGetMatery = async () => {
    console.log(user);
  };

  useEffect(() => {
    handleGetMatery();
  });

  return (
    <div>
      <h1>a</h1>
    </div>
  );
};

export default MateryPage;
