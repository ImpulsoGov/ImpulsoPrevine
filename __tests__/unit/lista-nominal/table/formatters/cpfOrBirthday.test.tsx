import { CpfOrBirthdayFormatter } from '@/features/acf/modules/AcfDashboardPage/modules/PanelSelector/modules/dashboards/modules/table/modules/diabetes/modules/columns/columns.formatter';
import { render, screen } from '@testing-library/react';

jest.mock('@/helpers/lista-nominal/renderCell', () => ({
  RenderDateTagCell: jest.fn(() => <span>MOCK_TAG</span>),
}));

describe('CpfOrBirthdayFormatter', () => {
  it('renderiza a tag data-testid=empty-return quando `value` é string vazia', () => {
    render(<CpfOrBirthdayFormatter value="" />);
    const emptyDiv = screen.getByTestId('empty-return');
    expect(emptyDiv).toBeInTheDocument();
    expect(emptyDiv).toHaveTextContent('');
  });

  it('renderiza a tag data-testid=fallback-return quando length < 11 e a entrada não é vazia', () => {
    const raw = '12345';
    render(<CpfOrBirthdayFormatter value={raw} />);
    const emptyDiv = screen.getByTestId('fallback-return');
    expect(emptyDiv).toBeInTheDocument();
    expect(emptyDiv).toHaveTextContent(raw);

  });

  it('renderiza a tag data-testid=cpf-return quando length === 11', () => {
    const cpfRaw = '12345678900';
    const formattedCpf = '123.456.789-00';

    render(<CpfOrBirthdayFormatter value={cpfRaw} />);

    const cpfDiv = screen.getByTestId('cpf-return');
    expect(cpfDiv).toBeInTheDocument();
    expect(cpfDiv).toHaveTextContent(formattedCpf);
  });

  it('renderiza a tag data-testid=birthday-return quando entrada length > 11', () => {
    const dateRaw = '2023-01-18T00:00:00.000Z';
    const formattedDate = '18/01/23';

    render(<CpfOrBirthdayFormatter value={dateRaw} />);

    const birthDiv = screen.getByTestId('birthday-return');
    expect(birthDiv).toBeInTheDocument();
    expect(birthDiv).toHaveTextContent(formattedDate);
  });

  it('renderiza a tag data-testid=empty-return quando entrada é null', () => {
    const dateRaw = null;

    render(<CpfOrBirthdayFormatter value={dateRaw} />);

    const birthDiv = screen.getByTestId('empty-return');
    expect(birthDiv).toBeInTheDocument();
    expect(birthDiv).toHaveTextContent("");
  });

  it('renderiza a tag data-testid=fallback-return quando entrada é null como string', () => {
    const dateRaw = "null";

    render(<CpfOrBirthdayFormatter value={dateRaw} />);

    const birthDiv = screen.getByTestId('fallback-return');
    expect(birthDiv).toBeInTheDocument();
    expect(birthDiv).toHaveTextContent("null");
  });
});
