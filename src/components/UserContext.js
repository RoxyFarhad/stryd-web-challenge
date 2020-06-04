import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [unitPref, setUnitPref] = useState('Kilometers');
    const [lapsPref, setLapsPref] = useState('Manual');

    return (
      <UserContext.Provider
        value={{
          unitPref,
          lapsPref,
          setUnitPref,
          setLapsPref,
        }}
      >
        {children}
      </UserContext.Provider>
    );
  };