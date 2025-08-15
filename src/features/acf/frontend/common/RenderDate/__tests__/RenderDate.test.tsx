import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { RenderDate } from "..";
import type { HypertensionAcfItem } from "@/features/acf/shared/hypertension/model";
import type { GridRenderCellParams } from "@mui/x-data-grid";

describe("RenderDate", () => {
    it("Deve chamar formatDate e renderizar uma data formatada quando o value for uma string válida", () => {
        const isoString = "2000-10-17T08:30:00.000Z";
        const params = {
            value: isoString,
        } as GridRenderCellParams<HypertensionAcfItem, string | null>;
        const expectedDate = "17/10/00";
        render(<RenderDate {...params} />);
        expect(screen.getByText(expectedDate)).toBeInTheDocument();
    });
    it("Deve renderizar a string - quando receber null", () => {
        const nullValue = null;
        const params = {
            value: nullValue,
        } as GridRenderCellParams<HypertensionAcfItem, string | null>;
        render(<RenderDate {...params} />);
        expect(screen.getByText("-")).toBeInTheDocument();
    });
});
