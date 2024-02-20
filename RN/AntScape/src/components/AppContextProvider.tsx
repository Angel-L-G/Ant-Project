import React, { Dispatch, SetStateAction, useContext, createContext, useState } from 'react'
import { ContextUser, UserLogin } from './types';

type Props = {}

export interface AppContextType {
    token: string;
    setToken: Dispatch<SetStateAction<string>>
    rol: string;
    setRol: Dispatch<SetStateAction<string>>
    user: UserLogin
    setUser: Dispatch<SetStateAction<UserLogin>>
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppContextProvider = (props: any) => {
    const [token, setToken] = useState("");
    const [usuario, setUsuario] = useState<UserLogin>({} as UserLogin);
    const [rol, setRol] = useState("");
    
    const contextValues: AppContextType = {
        user: usuario,
        token: token,
        rol: rol,
        setRol: setRol,
        setToken: setToken,
        setUser: setUsuario
    };

    return (
        <AppContext.Provider value={contextValues}>
            {props.children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};

export default AppContextProvider