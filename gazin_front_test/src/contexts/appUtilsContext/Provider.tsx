import { useState } from "react";
import { CustomAlertProps, AppUtilsContext } from "./Context";


interface AppUtilsProviderProps {
    children: JSX.Element[] | JSX.Element
}

export default function AppUtilsProvider({children} : AppUtilsProviderProps) {
    const [loading, setLoading] = useState<boolean>(false);
    const [alert, setAlert] = useState<CustomAlertProps>({} as CustomAlertProps);
    return (
        <AppUtilsContext.Provider value={{ loading, setLoading, alert, setAlert }}>
            {children}
        </AppUtilsContext.Provider>
    );
}
