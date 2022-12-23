import { AuthLogin } from 'src/types/auth.type';
import {
    createContext,
    useState,
    ReactNode,
    Dispatch,
    SetStateAction,
} from 'react';

interface AuthContextProps {
    auth: AuthLogin | null;
    setAuth: Dispatch<SetStateAction<AuthLogin | null>>;
}

export const AuthContext = createContext({} as AuthContextProps);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [auth, setAuth] = useState<AuthLogin | null>(null);
    return (
        <AuthContext.Provider value={{ auth, setAuth }}></AuthContext.Provider>
    );
};

export default AuthProvider;
