import { render, screen } from "@testing-library/react";
import { NameFormatter } from "..";

describe("NameFormatter", () => {
    it("renderiza a tag data-testid=empty-return quando `value` é string vazia", () => {
        render(<NameFormatter value="" />);
        const emptyDiv = screen.getByTestId("empty-return");
        expect(emptyDiv).toBeInTheDocument();
        expect(emptyDiv).toHaveTextContent("");
    });
    it("renderiza a tag data-testid=name-return quando value é uma string populada", () => {
        const name = "JOSÉ DA SILVA";
        const formattedName = "José da Silva";

        render(<NameFormatter value={name} />);

        const nameDiv = screen.getByTestId("name-return");
        expect(nameDiv).toBeInTheDocument();
        expect(nameDiv).toHaveTextContent(formattedName);
    });
});
