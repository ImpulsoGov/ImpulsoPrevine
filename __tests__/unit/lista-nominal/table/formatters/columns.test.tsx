import { dateRenderCell } from "@/features/acf/modules/AcfDashboardPage/modules/PanelSelector/modules/dashboards/modules/table/modules/diabetes/columns.formatter";

jest.mock("@helpers/lista-nominal/renderCell", () => {
    const originalModule = jest.requireActual('@helpers/lista-nominal/renderCell');
    return {
        ...originalModule,
        renderDateTagCell: jest.fn(() => "mock renderDateTagCell"),
    }
});

describe("dateRenderCell", () => {
    it("deve renderizar o componente renderDateTagCell quando o valor for null", () => {
        const result = dateRenderCell(null);
        // render(result);

        expect(result).toMatchObject({
            type: "div",
            props: {
                children: "mock renderDateTagCell",
            },
        })
        // expect(screen.getByTestId("tag")).toBeInTheDocument();
        // expect(screen.getByTestId("tag")).toHaveTextContent("mock");
    });

});

