import { useEffect, useState } from "react";

export const useAuth = (): boolean => {
  const [token, setToken] = useState<string>();

  useEffect(() => {
    setToken(window.sessionStorage.getItem("accessToken")!);
  }, [token]);

  return token ? true : false;
};
