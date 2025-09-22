import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { GenericRenderDate } from "..";

describe("RenderDate", () => {
    it("Deve chamar formatDate e renderizar uma data formatada quando o value for uma string válida", () => {
        const isoString = "2000-10-17T08:30:00.000Z";
        const expectedDate = "17/10/00";
        render(<GenericRenderDate value={isoString} />);
        expect(screen.getByText(expectedDate)).toBeInTheDocument();
    });
    it("Deve renderizar a string - quando receber null", () => {
        const nullValue = null;
        render(<GenericRenderDate value={nullValue} />);
        expect(screen.getByText("-")).toBeInTheDocument();
    });
});
