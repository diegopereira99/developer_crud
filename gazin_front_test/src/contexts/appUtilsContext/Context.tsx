import { Color } from '@material-ui/lab/Alert';
import { createContext, useContext, useState } from 'react';


export interface CustomAlertProps {
    message: string,
    open: boolean,
    type?: Color
}

export interface AppUtilsContextType {
    loading: boolean,
    setLoading: (loading: boolean) => void,
    alert: CustomAlertProps,
    setAlert:(payload: CustomAlertProps) => void
}

export const AppUtilsContext = createContext<AppUtilsContextType>({ 
    loading: false, 
    setLoading: ()=>{},
    alert: {} as CustomAlertProps,
    setAlert: ()=>{}
});

export const useAppUtilsContext = () => useContext(AppUtilsContext);