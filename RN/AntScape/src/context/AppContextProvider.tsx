import React, { Dispatch, SetStateAction, useContext, createContext, useState } from 'react'
import { ContextUser, User, UserLogin } from '../types/types';

type Props = {}

export interface AppContextType {
    token: string;
    setToken: Dispatch<SetStateAction<string>>;
    rol: string;
    setRol: Dispatch<SetStateAction<string>>;
    user: User;
    setUser: Dispatch<SetStateAction<User>>;
    eggsContext: number;
    setEggsContext: Dispatch<SetStateAction<number>>;
    goldenEggsContext: number;
    setGoldenEggsContext: Dispatch<SetStateAction<number>>;
    totalEggsContext: string;
    setTotalEggsContext: Dispatch<SetStateAction<string>>;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppContextProvider = (props: any) => {
    const [token, setToken] = useState("");
    const [usuario, setUsuario] = useState<User>({} as User);
    const [rol, setRol] = useState("");
    const [eggsContext, setEggsContext] = useState(0);
    const [goldenEggsContext, setGoldenEggsContext] = useState(0);
    const [totalEggsContext, setTotalEggsContext] = useState("");
    
    const contextValues: AppContextType = {
        user: usuario,
        token: token,
        rol: rol,
        eggsContext: eggsContext,
        totalEggsContext: totalEggsContext,
        goldenEggsContext: goldenEggsContext,
        setRol: setRol,
        setToken: setToken,
        setUser: setUsuario,
        setEggsContext: setEggsContext,
        setTotalEggsContext: setTotalEggsContext,
        setGoldenEggsContext: setGoldenEggsContext
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