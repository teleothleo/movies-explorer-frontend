import React, { createContext, useState, useContext } from 'react';

const MenuContext = createContext();

export const useMenuState = () => {
  const context = useContext(MenuContext);
  return context;
};

export const MenuContextProvider = ({ children }) => {
  const [isActive, setIsActive] = useState(false);

  const setState = (state) => {
    setIsActive(state);
  };

  return (
    <MenuContext.Provider value={{ isActive, setState }}>
      {children}
    </MenuContext.Provider>
  );
};
