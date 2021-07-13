import { render } from "@testing-library/react";
import Loading from '.';
import { AppUtilsContext, CustomAlertProps } from "../../contexts/appUtilsContext/Context";


describe("<NavBar />", () => {
  test("Deve mostrar o loading na tela quando o loading for igual a 'TRUE'", async () => {
    const { queryByText, } = render(
        <AppUtilsContext.Provider value={{loading: true, alert: {} as CustomAlertProps, setAlert: ()=>{}, setLoading:()=>{}}}>
            <Loading/>
        </AppUtilsContext.Provider>
    );
    expect(queryByText("Carregando...")).toBeInTheDocument();
  });
  test("Não deve mostrar o loading na tela quando o componente se iniciar", async () => {
    const { queryByText } = render(<Loading/>);
    expect(queryByText("Carregando...")).not.toBeInTheDocument();
  });
});