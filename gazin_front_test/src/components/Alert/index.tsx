import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { useAppUtilsContext, CustomAlertProps } from '../../contexts/appUtilsContext/Context';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CustomAlert() {

    const { alert, setAlert } = useAppUtilsContext();
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlert({...alert, open: false});
    };
    
    return (
        <Snackbar open={alert.open} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={alert.type ?? undefined}>
                {alert.message}
            </Alert>
        </Snackbar>
    );
}
