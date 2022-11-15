import React, { useContext, useDebugValue } from "react";
import { AuthContextType } from "../api/types/AuthTyped";
import { AuthContext } from "../context/AuthProvider";

export const useAuth = () => {
  const { auth } = React.useContext(AuthContext) as AuthContextType;
  useDebugValue(auth, (auth) => (auth?.username ? "Logged In" : "Logged Out"));
  return useContext(AuthContext);
};
