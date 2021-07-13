import { createContext } from "react";

export interface ConfirmationDialogProviderProps {
    children: JSX.Element[] | JSX.Element
}

export interface DialogProps {
    title: string,
    message: string,
    actionCallback: Function
}

export interface ConfirmationDialogContextType {
    openDialog: (props: DialogProps) => void
}

export const ConfirmationDialogContext = createContext<ConfirmationDialogContextType>({
    openDialog: () => { }
});

