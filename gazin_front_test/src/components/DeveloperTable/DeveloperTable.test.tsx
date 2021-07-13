import { render, waitFor, screen, cleanup, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import DeveloperTable, { DeveloperTableProps } from ".";

describe("<DeveloperTable />", () => {
    let props: DeveloperTableProps;

    beforeEach(() => {
        cleanup();
        props = {
            developers: [],
            onAddDeveloperClick: jest.fn(),
            onDelete: jest.fn(),
            onEditClick: jest.fn()
        }
    });

    test("Deve mostrar o botão de adicionar desenvolvedor habilitado'", async () => {
        await act(async () => {
            render(<DeveloperTable {...props} />)
        });
        expect(screen.getByTestId("add-developer-button")).toBeEnabled();
    });
    
    test("Deve mostrar a tabela com os campos e com a mensagem de 'Nenhum desenvolvedor cadastrado'", async () => {
        await act(async () => {
            render(<DeveloperTable {...props} />)
        });
        expect(screen.getByText("ID")).toBeInTheDocument();
        expect(screen.getByText("Nome")).toBeInTheDocument();
        expect(screen.getByText("Idade")).toBeInTheDocument();
        expect(screen.getByText("Sexo")).toBeInTheDocument();
        expect(screen.getByText("Hobby")).toBeInTheDocument();
        expect(screen.getByText("Data de Nascimento")).toBeInTheDocument();
        expect(screen.getByText("Ações")).toBeInTheDocument();
        expect(screen.getByText("Nenhum desenvolvedor cadastrado")).toBeInTheDocument();
    });

    test("Deve mostrar a tabela com o unico desenvolvedor cadastrado'", async () => {
        props.developers = [
            {
                age: 12,
                birthDate: "1999-09-09",
                hobby: "Joga bola",
                name: "Diego",
                sex: "Masculino",
                id: "123"
            }
        ]
        await act(async () => {
            render(<DeveloperTable {...props} />)
        });
        expect(screen.getByText("ID")).toBeInTheDocument();
        expect(screen.getByText("Nome")).toBeInTheDocument();
        expect(screen.getByText("Idade")).toBeInTheDocument();
        expect(screen.getByText("Sexo")).toBeInTheDocument();
        expect(screen.getByText("Hobby")).toBeInTheDocument();
        expect(screen.getByText("Data de Nascimento")).toBeInTheDocument();
        expect(screen.getByText("Ações")).toBeInTheDocument();
        
        expect(screen.queryByText("Nenhum desenvolvedor cadastrado")).not.toBeInTheDocument();

        expect(screen.getByText("Diego")).toBeInTheDocument();
        expect(screen.getByText("Masculino")).toBeInTheDocument();
        expect(screen.getByText("123")).toBeInTheDocument();
        expect(screen.getByText("Joga bola")).toBeInTheDocument();
        expect(screen.getByText("12")).toBeInTheDocument();

        expect(screen.getAllByTestId("edit-button")).toHaveLength(1);
        expect(screen.getAllByTestId("delete-button")).toHaveLength(1);
    });

    test("Deve chamar a funcão de editar passando o desenvolvedor atual'", async () => {
        props.developers = [
            {
                age: 12,
                birthDate: "1999-09-09",
                hobby: "Joga bola",
                name: "Diego",
                sex: "Masculino",
                id: "123"
            }
        ]
        await act(async () => {
            render(<DeveloperTable {...props} />)
        });
        
        const btn = screen.getByTestId("edit-button");

        fireEvent.click(btn);
        expect(props.onEditClick).toHaveBeenCalledWith(props.developers[0]);
    });

    test("Deve chamar a funcão de deletar passando o desenvolvedor atual'", async () => {
        props.developers = [
            {
                age: 12,
                birthDate: "1999-09-09",
                hobby: "Joga bola",
                name: "Diego",
                sex: "Masculino",
                id: "123"
            }
        ]
        await act(async () => {
            render(<DeveloperTable {...props} />)
        });
        
        const btn = screen.getByTestId("delete-button");

        fireEvent.click(btn);
        expect(props.onDelete).toHaveBeenCalledWith(props.developers[0]);
    });
});