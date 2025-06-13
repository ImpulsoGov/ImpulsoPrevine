import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { DateRenderCell } from "..";

// 1) Mock do RenderDateTagCell para simplificar o teste
jest.mock("@/features/acf/frontend/common/TableTag", () => {
    return {
        iconDetailsMap: { pending: {} },
        TableTag: jest.fn(() => <span data-testid="TABLE_TAG">MOCK_TAG</span>),
    };
});

describe("DateRenderCell", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("deve renderizar RenderDateTagCell quando value for null", () => {
        render(<DateRenderCell value={null} />);

        // verifica se a div com data-testid="tag" existe
        const tagWrapper = screen.getByTestId("tag");
        expect(tagWrapper).toBeInTheDocument();

        // verifica se o conteúdo mockado aparece
        expect(screen.getByTestId("TABLE_TAG")).toBeInTheDocument();
    });

    it("deve chamar formatDate e renderizar data formatada quando value for uma string válida", () => {
        const isoString = "2025-04-16T08:30:00.000Z";
        render(<DateRenderCell value={isoString} />);
        const expectedDateString = "16/04/25";
        expect(screen.getByText(expectedDateString)).toBeInTheDocument();
    });
});
