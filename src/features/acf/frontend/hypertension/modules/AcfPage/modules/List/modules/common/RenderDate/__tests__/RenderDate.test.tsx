import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { RenderDate } from "../RenderDate";

describe("RenderDate", () => {
    it("Deve chamar formatDate e renderizar uma data formatada quando o value for uma string válida", () => {
        const isoString = "2000-10-17T08:30:00.000Z";
        const expectedDate = "17/10/00";
        render(<RenderDate value={isoString} />);
        expect(screen.getByText(expectedDate)).toBeInTheDocument();
    });
    it("Deve renderizar a string - quando receber null ou uma data inválida", () => {
        const nullValue = null;
        render(<RenderDate value={nullValue} />);
        expect(screen.getByText("-")).toBeInTheDocument();
    });
});
