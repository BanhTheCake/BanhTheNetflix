import { persistUser } from '@/utils/api/auth.api';
import { User } from '@/utils/types/global.type';
import { NextPageContext } from 'next';
import React, { FC, useState } from 'react';

export type AuthContext = {
    auth: AuthState;
    setAuthState: (value: Partial<AuthState>) => void;
};

export type AuthState = {
    token: string;
    user: User | null;
};

export const initAuthState: AuthState = {
    token: '',
    user: null,
};

const authContext = React.createContext<AuthContext>({
    auth: initAuthState,
    setAuthState: () => { },
});

interface AuthProviderProps {
    children: React.ReactNode;
    value: AuthState | null;
}

export const getUser = async (ctx: NextPageContext) => {
    try {
        const data = await persistUser({
            headers: { cookie: ctx.req?.headers.cookie }
        })
        return data
    } catch (error) {
        return null;
    }
}

const AuthProvider: FC<AuthProviderProps> = ({ children, value }) => {
    const [auth, setAuth] = useState<AuthState>(value ? value : initAuthState);
    const setAuthState = (value: Partial<AuthState>) => {
        setAuth((prev) => ({ ...prev, ...value }));
    };
    const Provider = authContext.Provider;
    return <Provider value={{ auth, setAuthState }}>{children}</Provider>;
};

export const useAuth = () => React.useContext(authContext);
export default AuthProvider;
