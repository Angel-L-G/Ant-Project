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
    totalEggsContext: number;
    setTotalEggsContext: Dispatch<SetStateAction<number>>;
    imgContext: string;
    setImgContext: Dispatch<SetStateAction<string>>;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppContextProvider = (props: any) => {
    const [token, setToken] = useState("");
    const [usuario, setUsuario] = useState<User>({} as User);
    const [rol, setRol] = useState("");
    const [eggsContext, setEggsContext] = useState(0);
    const [goldenEggsContext, setGoldenEggsContext] = useState(0);
    const [totalEggsContext, setTotalEggsContext] = useState(0);
    const [imgContext, setImgContext] = useState("");
    
    const contextValues: AppContextType = {
        user: usuario,
        token: token,
        rol: rol,
        eggsContext: eggsContext,
        totalEggsContext: totalEggsContext,
        goldenEggsContext: goldenEggsContext,
        imgContext: imgContext,
        setRol: setRol,
        setToken: setToken,
        setUser: setUsuario,
        setEggsContext: setEggsContext,
        setTotalEggsContext: setTotalEggsContext,
        setGoldenEggsContext: setGoldenEggsContext,
        setImgContext: setImgContext
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