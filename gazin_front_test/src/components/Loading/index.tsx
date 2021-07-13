import { Backdrop, CircularProgress, Typography } from '@material-ui/core';
import { useAppUtilsContext } from '../../contexts/appUtilsContext/Context';
import styles from './styles.module.scss';

export default function Loading() {

    const { loading } = useAppUtilsContext();

    return loading ?
        (
            <Backdrop className={styles.backdropCenter} open={loading}>
                <Typography variant="h6" gutterBottom={true}>Carregando...</Typography>
                <CircularProgress color="primary" />
            </Backdrop>
        ) : null
}