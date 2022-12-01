import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { setCookie, destroyCookie } from "nookies";
import Router from "next/router";
import { api } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState();
  const isAutenticated = !!user;

  const SignIn = async (email, password) => {
    const { data } = await api.post("/api/session", {
      email,
      password,
    });
    setCookie(undefined, "token-aluno", data.token, {
      maxAge: 60 * 60 * 1, // 1 hora
    });

    api.defaults.headers["Authorization"] = `Bearer ${data.token}`;

    setUser(data.user);
    Router.push("/");
  };

  const LogOut = () => {
    setUser(null);
    destroyCookie(undefined, "token-aluno");
    Router.push("/login");
  };

  const Register = async (data) => {
    const { email, name, password } = data;
    const newUser = await api.post("/api/users", {
      email,
      password,
      name,
    });
    alert("Usuário criado com sucesso");
  };

  const GetMatery = async (userId, materyId) => {
    const matery = await api.get(`/api/notes/${userId}/${materyId}`);
    return matery.data;
  };

  const GetMateries = async (userId) => {
    const materies = await api.get(`/api/notes/${userId}`);
    return materies.data.materies;
  };

  const AddMatery = async (data, userId) => {
    const { name, note } = data;

    const newMatery = await api.post(`/api/notes/${userId}`, {
      name,
      note,
    });
    return newMatery.data;
  };

  const UpdateMatery = async (data, materyId, userId) => {
    const { name, note, absences } = data;

    const updatedMatery = await api.patch(`/api/notes/${userId}/${materyId}`, {
      name,
      note,
      absences,
    });
    Router.push("/");
  };

  const DeleteMatery = async (materyId, userId) => {
    await api.delete(`/api/notes/${userId}/${materyId}`);
    Router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        isAutenticated,
        user,
        SignIn,
        LogOut,
        Register,
        AddMatery,
        DeleteMatery,
        UpdateMatery,
        GetMateries,
        GetMatery,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
