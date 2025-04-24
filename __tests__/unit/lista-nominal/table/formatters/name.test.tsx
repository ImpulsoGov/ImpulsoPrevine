import { nameFormatter, NameFormatter } from "@/features/acf/modules/AcfDashboardPage/modules/PanelSelector/modules/dashboards/modules/table/modules/diabetes/name.formatter";
import { render, screen } from '@testing-library/react';
describe("nameFormatter", () => {
    it("formata corretamente um nome sem preposições ", () => {
        expect(nameFormatter('SEVERINO BILL')).toBe('Severino Bill');
    });

    it("formata corretamente um único nome", () => {
        expect(nameFormatter('mariazinha')).toBe('Mariazinha');
    });
    
    it("formata corretamente um nome com preposições", () => {
        expect(nameFormatter('ANA MARIA DA SILVA E SOUZA')).toBe('Ana Maria da Silva e Souza');
    });
});

describe("NameFormatter", () => {
it('renderiza a tag data-testid=empty-return quando `value` é string vazia', () => {
    render(<NameFormatter value="" />);
    const emptyDiv = screen.getByTestId('empty-return');
    expect(emptyDiv).toBeInTheDocument();
    expect(emptyDiv).toHaveTextContent('');
  });
});