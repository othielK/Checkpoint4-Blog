/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState } from "react";

const Context = createContext();

function Provider({ children }) {
  const [infoUser, setInfoUser] = useState({
    id: localStorage.getItem("id"),
    firstname: localStorage.getItem("firstname"),
    lastname: localStorage.getItem("lastname"),
    email: localStorage.getItem("email"),
  });

  const login = (userData) => {
    setInfoUser(userData);
    localStorage.setItem("id", userData.id);
    localStorage.setItem("firstname", userData.firstname);
    localStorage.setItem("lastname", userData.lastname);
    localStorage.setItem("email", userData.email);
  };
  const logout = () => {
    // setInfoUser({});
    setInfoUser({
      id: null,
      firstname: null,
      lastname: null,
      email: null,
    });
    localStorage.clear();
  };

  return (
    <Context.Provider value={{ infoUser, login, logout }}>
      {children}
    </Context.Provider>
  );
}

const ExportContext = {
  Context,
  Provider,
};

export default ExportContext;
