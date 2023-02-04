import { ReactNode, useState, useEffect, useContext } from "react";

import { AuthContext } from "~context/AuthProvider";
import Spinner from "~components/common/spiner/Spiner";
import { loginSuccess } from "~api/user.api";
import useAxiosPrivate from "~hook/useAxiosPrivate";

const PerisrtLogin = ({ children }: { children: ReactNode }) => {
  const axiosPrivate = useAxiosPrivate();
  const { auth, setAuth } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (auth && auth.token) {
      setIsLoading(false);
      return;
    }
    (async function () {
      try {
        const res = await loginSuccess(axiosPrivate);
        if (res.data.success && res.data.token) {
          setAuth(res.data);
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    })();
  }, [auth]);

  if (isLoading) {
    return <Spinner />;
  }

  return <>{children}</>;
};

export default PerisrtLogin;
