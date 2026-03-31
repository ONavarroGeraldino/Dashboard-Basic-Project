import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState({
    name: "Oswaldo",
    role: "Admin",
    avatar: "https://ui-avatars.com/api/?name=Oswaldo&background=4318ff&color=fff",
    email: "oswaldo@ejemplo.com"
    
  });

  const updateUser = (newData) => {
    setUser((prev) => ({ ...prev, ...newData }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser, searchQuery, setSearchQuery }}>
    {children}
  </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);