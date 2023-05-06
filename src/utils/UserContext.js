import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export function useUserContext() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({
    _id: "",
    name: "",
    email: ""
  });

  const updateUserContext = (newUserData) => {
    setCurrentUser(newUserData);
  };

  return (
    <UserContext.Provider value={{ currentUser, updateUserContext }}>
      {children}
    </UserContext.Provider>
  );
}
