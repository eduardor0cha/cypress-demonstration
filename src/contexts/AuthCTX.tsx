import { createContext, useCallback, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

type AuthCTXProps = {
  login(email: string, password: string): void;
  isLogged: boolean;
};

const AuthCTX = createContext({} as AuthCTXProps);

function AuthProvider({ children }) {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const navigator = useNavigate();

  const login = useCallback((email: string, password: string) => {
    if (email == "teste@teste.com" && password == "123456") {
      setIsLogged(true);
      navigator("/home");
    }
  }, []);

  return (
    <AuthCTX.Provider value={{ login, isLogged }}>{children}</AuthCTX.Provider>
  );
}

export default AuthProvider;
export { AuthCTX };
