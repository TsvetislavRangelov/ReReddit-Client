import React, { useState } from "react";
import { AuthContextType, iAuth } from "../api/types/AuthTyped";

export const AuthContext = React.createContext<AuthContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [auth, setAuth] = useState<iAuth>({
    id: 0,
    username: "",
    roles: [""],
    accessToken: "",
    refreshToken: "",
  });

  const saveAuth = (newAuth: iAuth) => {
    setAuth(newAuth);
  };
  return (
    <AuthContext.Provider value={{ auth, saveAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
