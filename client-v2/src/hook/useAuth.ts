import { useContext } from "react";
import { AuthContext } from "~context/AuthProvider";

const useAuth = () => {
  const { auth, persirt, redirect, setAuth, setPersirt, setRedirect } =
    useContext(AuthContext);
  return { auth, persirt, redirect, setAuth, setPersirt, setRedirect };
};
export default useAuth;
