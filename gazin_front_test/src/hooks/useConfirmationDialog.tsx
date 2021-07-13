import { useContext } from "react";
import { ConfirmationDialogContext, DialogProps } from "../contexts/confirmationDialogContext/Context";

const useConfirmationDialog = () => {
    const { openDialog } = useContext(ConfirmationDialogContext);

    const getConfirmation = ({ title, message }: Omit<DialogProps, "actionCallback">) => new Promise((res) => {
        openDialog({ actionCallback: res, title, message });
    });
    return { getConfirmation };
};

export { useConfirmationDialog };