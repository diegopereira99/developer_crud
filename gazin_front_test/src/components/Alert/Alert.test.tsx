import { render, screen, cleanup, waitFor } from "@testing-library/react";
import CustomAlert from ".";
import { AppUtilsContext, AppUtilsContextType, CustomAlertProps } from "../../contexts/appUtilsContext/Context";

describe("<Alert />", () => {
    let providerProps: AppUtilsContextType;

    beforeEach(() => {
        cleanup();
        providerProps = {
            alert: {} as CustomAlertProps,
            loading: false,
            setAlert: jest.fn(),
            setLoading: jest.fn()
        }
    });

    test("Deve mostrar o Alert na tela quando o alert.open for igual a 'TRUE' e em seguida deve fecha-lo", async () => {
        jest.useFakeTimers();
        providerProps.alert.message = "Eu sou um alert";
        providerProps.alert.type = "success";
        providerProps.alert.open = true;
        render(
            <AppUtilsContext.Provider value={{ ...providerProps }}>
                <CustomAlert />
            </AppUtilsContext.Provider>
        );

        expect(screen.getByText("Eu sou um alert")).toBeInTheDocument();
        jest.runAllTimers();

        expect(providerProps.setAlert).toHaveBeenCalledWith({
            ...providerProps.alert,
            "open": false
        });
    });
    test("Não deve mostrar o Alert na tela quando o alert.open for igual a 'FALSE'", async () => {
        providerProps.alert.message = "Eu sou um alert";
        providerProps.alert.type = "success";
        providerProps.alert.open = false;
        render(
            <AppUtilsContext.Provider value={{ ...providerProps }}>
                <CustomAlert />
            </AppUtilsContext.Provider>
        );

        expect(screen.queryByText("Eu sou um alert")).not.toBeInTheDocument();
    });

});