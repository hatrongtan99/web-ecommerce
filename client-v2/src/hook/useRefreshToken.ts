import { refreshToken } from '~api/user.api';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '~context/AuthProvider';
import useAxiosPrivate from './useAxiosPrivate';

const useRefreshToken = () => {
    const { setAuth } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        (async function () {
            setIsLoading(true);
            try {
                const data = await refreshToken(axiosPrivate);
                if (data.success) {
                    setAuth(data);
                }
            } catch (error) {
                console.log(error);
            }
            // setIsLoading(false);
        })();
    });
    return { isLoading };
};

export default useRefreshToken;
