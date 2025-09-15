import { Input } from "./index";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Componente: Input", () => {
    it("deve renderizar corretamente", () => {
        render(<Input placeholder="Input placeholder" />);

        expect(
            screen.getByPlaceholderText("Input placeholder")
        ).toBeInTheDocument();
    });

    it("deve executar a função onChange ao digitar no componente", async () => {
        const user = userEvent.setup();
        const onChangeMock = jest.fn();

        render(
            <Input placeholder="Input placeholder" onChange={onChangeMock} />
        );

        const input = screen.getByPlaceholderText("Input placeholder");
        await user.type(input, "Valor digitado");

        expect(onChangeMock).toHaveBeenCalled();
    });

    it("deve renderizar o valor correto", () => {
        render(<Input placeholder="Input placeholder" value="Valor" />);

        expect(screen.getByDisplayValue("Valor")).toBeInTheDocument();
    });

    it("deve possuir o tipo de input correto", () => {
        render(<Input type="password" placeholder="Input placeholder" />);

        const input = screen.getByPlaceholderText("Input placeholder");

        expect(input).toHaveAttribute("type", "password");
    });

    it("deve possuir os nomes de classes corretos", () => {
        render(
            <Input
                placeholder="Input placeholder"
                border="full"
                shape="rounded-left"
            />
        );

        const input = screen.getByPlaceholderText("Input placeholder");

        expect(input).toHaveClass("border-full");
        expect(input).toHaveClass("shape-rounded-left");
    });
});
