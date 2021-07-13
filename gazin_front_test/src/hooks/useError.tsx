import { useAppUtilsContext } from "../contexts/appUtilsContext/Context";

export function useError() {
    const { setAlert, setLoading } = useAppUtilsContext();

    return {
        showError: (error: any) => {
            setLoading(false);
            if(error.response) {
                setAlert({
                    message: error.response.data?.message || "Erro desconhecido",
                    open: true,
                    type: "error"
                });
                return;
            }

            setAlert({
                message: "Erro desconhecido",
                open: true,
                type: "error"
            });
            return;

        }
    }
}