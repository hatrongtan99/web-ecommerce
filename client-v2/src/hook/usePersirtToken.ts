import { refreshToken, loginSuccess } from "~api/user.api";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "~context/AuthProvider";
import useAxiosPrivate from "./useAxiosPrivate";

const usePersirtToken = () => {
  const { setAuth, persirt, auth } = useContext(AuthContext);
  const axiosPrivate = useAxiosPrivate();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async function () {
      setIsLoading(true);
      try {
        const res = await loginSuccess(axiosPrivate);

        if (res.success) {
          setAuth(res);
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    })();
  }, []);

  return { isLoading };
};

export default usePersirtToken;
