import { render, waitFor, screen, cleanup, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import ConfirmationDialog, { ConfirmationDialogProps } from ".";

describe("<ConfirmationDialog />", () => {
    let props: ConfirmationDialogProps;

    beforeEach(() => {
        cleanup();
        props = {
            onConfirm: jest.fn(),
            onDismiss: jest.fn(),
            open: true,
        };
    });

    test("Deve mostrar o dialog quando open for igual a 'true'", async () => {
        props.title = "Titulo do meu dialog";
        props.message = "Mensagem do meu dialog";

        await act(async () => {
            render(<ConfirmationDialog {...props} />)
        });
        expect(screen.getByText("Titulo do meu dialog")).toBeInTheDocument();
    });
    test("Não deve mostrar o dialog quando open for igual a 'false'", async () => {
        props.title = "Titulo do meu dialog";
        props.open = false;

        await act(async () => {
            render(<ConfirmationDialog {...props} />)
        });
        expect(screen.queryByText("Titulo do meu dialog")).not.toBeInTheDocument();
    });

    test("Deve mostrar o dialog com a mensagem e o titulo e com os botões de 'Sim' e 'Não'", async () => {
        props.title = "Titulo do meu dialog";
        props.message = "Mensagem do meu dialog";

        await act(async () => {
            render(<ConfirmationDialog {...props} />)
        });
        expect(screen.getByText("Titulo do meu dialog")).toBeInTheDocument();
        expect(screen.getByText("Mensagem do meu dialog")).toBeInTheDocument();

        expect(screen.getByText("Sim")).toBeInTheDocument();
        expect(screen.getByText("Não")).toBeInTheDocument();
    });

    test("Deve chamar a função onDismiss ao clicar no botão 'Não'", async () => {
        props.title = "Titulo do meu dialog";
        props.message = "Mensagem do meu dialog";

        await act(async () => {
            render(<ConfirmationDialog {...props} />)
        });
        
        const btn = screen.getByText("Não");
        fireEvent.click(btn);
        expect(props.onDismiss).toHaveBeenCalled();
    });

    test("Deve chamar a função onConfirm ao clicar no botão 'Sim'", async () => {
        props.title = "Titulo do meu dialog";
        props.message = "Mensagem do meu dialog";

        await act(async () => {
            render(<ConfirmationDialog {...props} />)
        });
        
        const btn = screen.getByText("Sim");
        fireEvent.click(btn);
        expect(props.onConfirm).toHaveBeenCalled();
    });
});