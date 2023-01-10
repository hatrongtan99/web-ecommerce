import { AuthLogin } from 'src/types/auth.type';
import {
    createContext,
    useState,
    ReactNode,
    Dispatch,
    SetStateAction,
} from 'react';
import { NextRouter } from 'next/router';

interface AuthContextProps {
    auth: AuthLogin | null;
    setAuth: Dispatch<SetStateAction<AuthLogin | null>>;
    redirect: string;
    setRedirect: Dispatch<SetStateAction<string>>;
}

export const AuthContext = createContext({} as AuthContextProps);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [auth, setAuth] = useState<AuthLogin | null>(null);
    const [redirect, setRedirect] = useState<string>('/');
    return (
        <AuthContext.Provider value={{ auth, setAuth, redirect, setRedirect }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
