import { render, screen, waitFor } from "@testing-library/react";
import { Home } from "../src/app/Home";
jest.mock("@impulsogov/design-system", () => ({
    FormConsultoria: (props) => <div>FormConsultoria Mock</div>,
    TituloSmallTexto: (props) => <div>TituloSmallTexto Mock</div>,
    ParceriasTexto: (props) => <div>ParceriasTexto Mock</div>,
    CardIP: (props) => <div>CardIP Mock</div>,
    Grid12Col: (props) => <div>Grid12Col Mock</div>,
    NovoTituloTexto: (props) => <div>NovoTituloTexto Mock</div>,
    ImagensFull2: (props) => <div>ImagensFull2 Mock</div>,
    Margem: (props) => <div>Margem Mock</div>,
}));

test("deve renderizar o componente Home com os elementos dinâmicos", async () => {
    render(<Home />); // Aguarda o carregamento do componente dinâmico
    await waitFor(() => {
        expect(screen.getByText("FormConsultoria Mock")).toBeInTheDocument();
        expect(screen.getByText("ParceriasTexto Mock")).toBeInTheDocument();
        expect(screen.getAllByText("Margem Mock")[0]).toBeInTheDocument();
    });
});
