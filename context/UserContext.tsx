import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserContextType {
  nim: string | null;
  setNim: (nim: string | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [nim, setNim] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ nim, setNim }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
