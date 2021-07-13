import { render, fireEvent, waitFor, screen, cleanup, getByDisplayValue, waitForElementToBeRemoved, within } from "@testing-library/react";
import { parseISO, format } from "date-fns";
import { act } from "react-dom/test-utils";
import DeveloperFormModal from ".";
import { Developer } from "../../interfaces/Developer";


import { DeveloperFormModalProps } from "./index";

describe("<DeveloperFormModal />", () => {
    let props: DeveloperFormModalProps;

    beforeEach(() => {
        cleanup();
        props = {
            onClose: jest.fn(),
            onSubmit: jest.fn(),
            visible: false
        }
    });

    test("Não deve mostrar o modal quando o visible for false", async () => {
        render(<DeveloperFormModal {...props} />);
        await waitFor(() => {
            expect(screen.queryByTestId("developer-form-modal")).not.toBeInTheDocument()
        });
    });
    test("Deve mostrar o modal quando o visible for true", async () => {
        props.visible = true;
        render(<DeveloperFormModal {...props} />);
        await waitFor(() => {
            expect(screen.queryByTestId("developer-form-modal")).toBeInTheDocument()
        });
    });
    test("Deve ter o títutlo 'Editar desevolvedor' quando for editar um desenvolvedor", async () => {

        props.visible = true;
        props.developer = {
            age: 12,
            birthDate: '09-09-1999',
            hobby: 'play footbal',
            name: 'Diego',
            sex: 'Masculino',
            id: '123'
        };
        render(<DeveloperFormModal {...props} />);
        await waitFor(() => {
            expect(screen.queryByText("Editar desenvolvedor")).toBeInTheDocument();
        });
    });
    test("Deve ter o títutlo 'Novo desevolvedor' quando for criar um desenvolvedor", async () => {
        props.visible = true;
        render(<DeveloperFormModal {...props} />);
        await waitFor(() => {
            expect(screen.queryByText("Novo desenvolvedor")).toBeInTheDocument();
        });
    });

    test("Os campos devem estar preenchidos e o botão de salvar habilitado assim que entrar para editar um desenvolvedor", async () => {

        props.visible = true,
            props.developer = {
                age: 12,
                birthDate: '1999-09-09',
                hobby: 'play footbal',
                name: 'Diego',
                sex: 'Masculino',
                id: '123'
            }

        const formatedBirthDate = format(parseISO(props.developer!.birthDate), 'dd/MM/yyyy');
        render(<DeveloperFormModal {...props} />);
        await waitFor(() => {
            expect(screen.getByDisplayValue(props.developer!.name)).toBeInTheDocument();
            expect(screen.getByDisplayValue(formatedBirthDate)).toBeInTheDocument(); // data convertida
            expect(screen.getByDisplayValue(props.developer!.hobby)).toBeInTheDocument();
            expect(screen.getByDisplayValue(props.developer!.sex)).toBeInTheDocument();
            expect(screen.getByDisplayValue(props.developer!.age)).toBeInTheDocument();
            expect(screen.getByTestId("submit-button")).toBeEnabled();

        });
    });

    test("O desenvovledor deve ser editado com a nova informação passada", async () => {

        props.visible = true;
        props.developer = {
            age: 12,
            birthDate: '1999-09-09',
            hobby: 'play footbal',
            name: 'Diego',
            sex: 'Masculino',
            id: '123'
        };

        await act(async () => {
            render(<DeveloperFormModal {...props} />)
        });

        fireEvent.change(screen.getByDisplayValue(props.developer!.name), { target: { value: "Novo nome" } });

        expect(screen.getByDisplayValue('Novo nome')).toBeInTheDocument();

        fireEvent.submit(screen.getByTestId("submit-button"));

        await waitFor(() => {
            expect(props.onSubmit).toBeCalledWith({
                ...props.developer,
                "name": "Novo nome",
            });
        })
    });
    test("Deve criar um novo desenvolvedor com as informações passadas", async () => {

        props.visible = true;

        const year = new Date().getFullYear();
        const month = (new Date().getMonth() + 1).toString().padStart(2, '0');

        const inputDeveloper: Developer = {
            age: 20,
            birthDate: `1999-${month}-11`,
            hobby: "Jogar bola",
            name: "Pedro",
            sex: "Masculino"
        }
        const formatedBirthDate = parseISO(inputDeveloper.birthDate);

        await act(async () => {
            render(<DeveloperFormModal {...props} />)
        });



        fireEvent.change(screen.getByRole("textbox", { name: /name/i }), { target: { value: inputDeveloper.name } });
        fireEvent.change(screen.getByLabelText("age"), { target: { value: inputDeveloper.age } });
        fireEvent.change(screen.getByRole("textbox", { name: /hobby/i }), { target: { value: inputDeveloper.hobby } });

        //Lidando com o DatePicker. Precisa setar o value dele na "mão"
        fireEvent.click(screen.getByLabelText("birthDate"));
        fireEvent.click(screen.getByText(year));
        fireEvent.click(screen.getByText('1999'));
        fireEvent.click(screen.getByText('11'));
        fireEvent.click(screen.getByText("OK"));

        // lidando com o Select. Precisa setar o value dele na "mão"
        fireEvent.mouseDown(screen.getByLabelText('sex'));
        fireEvent.click(screen.getByText("Masculino"));


        await waitFor(() => {
            expect(screen.getByDisplayValue(inputDeveloper.name)).toBeInTheDocument();
            expect(screen.getByDisplayValue(inputDeveloper.hobby)).toBeInTheDocument();
            expect(screen.getByDisplayValue(inputDeveloper.age)).toBeInTheDocument();
            expect(screen.getByDisplayValue(inputDeveloper.sex)).toBeInTheDocument();
            expect(screen.getByDisplayValue(format(formatedBirthDate, "dd/MM/yyyy"))).toBeInTheDocument();
        });

        fireEvent.submit(screen.getByTestId("submit-button"));

        await waitFor(() => {
            expect(props.onSubmit).toBeCalledWith({
                "name": inputDeveloper.name,
                "age": inputDeveloper.age.toString(),
                "birthDate": format(formatedBirthDate, "yyyy-MM-dd"),
                "sex": inputDeveloper.sex,
                "hobby": inputDeveloper.hobby,
            });
        })

    });

    test("Deve abrir o modal com os campos vazios e o botão de salvar desabilitado assim que iniciar o cadastro de um novo dev", async () => {

        props.visible = true;
        await act(async () => {
            render(<DeveloperFormModal {...props} />)
        });

        expect(screen.getByLabelText("name")).not.toHaveValue();
        expect(screen.getByLabelText("age")).not.toHaveValue();
        expect(screen.getByLabelText("sex")).not.toHaveValue();
        expect(screen.getByLabelText("hobby")).not.toHaveValue();
        expect(screen.getByLabelText("birthDate")).not.toHaveValue();

        expect(screen.getByTestId("submit-button")).toBeDisabled();
    });

    test("Deve mostrar a mensagem de campo obrigatório quando o campo estiver vazio e 'dirty'", async () => {

        props.visible = true;
        await act(async () => {
            render(<DeveloperFormModal {...props} />)
        });

        fireEvent.change(screen.getByLabelText("name"), { target: { value: "xpto" } });
        fireEvent.change(screen.getByLabelText("name"), { target: { value: "" } });

        fireEvent.change(screen.getByLabelText("age"), { target: { value: "12" } });
        fireEvent.change(screen.getByLabelText("age"), { target: { value: "" } });

        fireEvent.change(screen.getByLabelText("hobby"), { target: { value: "hobby xpto" } });
        fireEvent.change(screen.getByLabelText("hobby"), { target: { value: "" } });

        await waitFor(() => {
            expect(screen.getAllByText("Campo obrigatório")).toHaveLength(3);
        })
    });

});