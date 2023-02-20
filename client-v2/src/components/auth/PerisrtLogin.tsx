import { ReactNode, useState, useEffect } from "react";

import Spinner from "~components/common/spiner/Spiner";
import { loginSuccess } from "~api/user.api";
import useAxiosPrivate from "~hook/useAxiosPrivate";
import useAuth from "~hook/useAuth";

const PerisrtLogin = ({ children }: { children: ReactNode }) => {
    const axiosPrivate = useAxiosPrivate();
    const { auth, setAuth } = useAuth();
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
    }, []);

    if (isLoading) {
        return <Spinner />;
    }

    return <>{children}</>;
};

export default PerisrtLogin;
