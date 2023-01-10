import { ReactNode } from 'react';
import useRefreshToken from '~hook/useRefreshToken';
import Spinner from '~components/common/spiner/Spiner';

const PerisrtLogin = ({ children }: { children: ReactNode }) => {
    const { isLoading } = useRefreshToken();

    if (isLoading) {
        return <Spinner />;
    }

    return <>{children}</>;
};

export default PerisrtLogin;
