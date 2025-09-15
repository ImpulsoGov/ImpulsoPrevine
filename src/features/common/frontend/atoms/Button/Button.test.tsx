import { Button } from ".";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Componente: Button", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("deve renderizar corretamente", () => {
        render(<Button>Text</Button>);

        expect(
            screen.getByRole("button", { name: "Text" })
        ).toBeInTheDocument();
    });

    it("deve executar a função onClick quando é clicado", async () => {
        const user = userEvent.setup();
        const onClickMock = jest.fn();

        render(<Button onClick={onClickMock}>Text</Button>);

        await user.click(screen.getByRole("button", { name: "Text" }));

        expect(onClickMock).toHaveBeenCalledTimes(1);
    });

    it("deve possuir as classes CSS corretas", () => {
        render(
            <Button
                theme="green"
                shape="rounded-full"
                border="full"
                hasHover={true}
            >
                Text
            </Button>
        );

        const button = screen.getByRole("button", { name: "Text" });

        expect(button).toHaveClass("theme-green-with-hover");
        expect(button).toHaveClass("shape-rounded-full");
        expect(button).toHaveClass("border-full");
    });
});
