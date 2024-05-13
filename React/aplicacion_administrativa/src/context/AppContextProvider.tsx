import React, { Dispatch, SetStateAction, useContext, createContext, useState } from 'react'
import { User } from '../type/types';

export interface AppContextType {
    token: string;
    setToken: Dispatch<SetStateAction<string>>;
    user: User;
    setUser: Dispatch<SetStateAction<User>>;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppContextProvider = (props: any) => {
    const [token, setToken] = useState("");
    const [usuario, setUsuario] = useState<User>({} as User);
    const [rol, setRol] = useState("");
    
    const contextValues: AppContextType = {
        user: usuario,
        token: token,
        setToken: setToken,
        setUser: setUsuario,
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