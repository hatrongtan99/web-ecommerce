import { AuthLogin } from "src/types/auth.type";
import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { setStorage } from "~utils/storage";
import { ParsedUrlQuery } from "querystring";

interface AuthContextProps {
  auth: AuthLogin | null;
  setAuth: Dispatch<SetStateAction<AuthLogin | null>>;
  redirect: {
    pathname: string;
    query: ParsedUrlQuery;
  };
  setRedirect: Dispatch<
    SetStateAction<{
      pathname: string;
      query: ParsedUrlQuery;
    }>
  >;
  persirt: boolean;
  setPersirt: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext({} as AuthContextProps);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthLogin | null>(null);
  const [redirect, setRedirect] = useState<{
    pathname: string;
    query: ParsedUrlQuery;
  }>({ pathname: "/", query: {} });

  const [persirt, setPersirt] = useState<boolean>(false);

  useEffect(() => {
    setStorage("persirt", persirt, "localStorage");
  }, [persirt, auth]);

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, redirect, setRedirect, persirt, setPersirt }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
