import { useState } from "react";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import { ConfirmationDialogProviderProps, DialogProps, ConfirmationDialogContext } from "./Context";

export default function ConfirmationDialogProvider ({ children }: ConfirmationDialogProviderProps) {
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [dialogConfig, setDialogConfig] = useState<DialogProps>({} as DialogProps);

    const openDialog = ({ title, message, actionCallback }: DialogProps) => {
        setDialogOpen(true);
        setDialogConfig({ title, message, actionCallback });
    };

    const onConfirm = () => {
        dialogConfig.actionCallback(true);    
        setDialogOpen(false);
    };

    const onDismiss = () => {
        dialogConfig.actionCallback(false); 
        setDialogOpen(false);
    };

    return (
        <ConfirmationDialogContext.Provider value={{ openDialog }}>
            <ConfirmationDialog
                open={dialogOpen}
                title={dialogConfig.title}
                message={dialogConfig.message}
                onConfirm={onConfirm}
                onDismiss={onDismiss}
            />
            {children}
        </ConfirmationDialogContext.Provider>
    );
};
