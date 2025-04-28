import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RenderDateTagCell } from '@/helpers/lista-nominal/renderCell';
import { DateRenderCell } from '@/features/acf/modules/AcfDashboardPage/modules/PanelSelector/modules/dashboards/modules/table/modules/diabetes/modules/columns/columns.formatter';

// 1) Mock do RenderDateTagCell para simplificar o teste
jest.mock('@/helpers/lista-nominal/renderCell', () => ({
  RenderDateTagCell: jest.fn(() => <span>MOCK_TAG</span>),
}));

describe('DateRenderCell', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar RenderDateTagCell quando value for null', () => {
    render(<DateRenderCell value={null} />);

    // verifica se a div com data-testid="tag" existe
    const tagWrapper = screen.getByTestId('tag');
    expect(tagWrapper).toBeInTheDocument();

    // verifica se o conteúdo mockado aparece
    expect(screen.getByText('MOCK_TAG')).toBeInTheDocument();
    // o componente interno foi chamado
    expect(RenderDateTagCell).toHaveBeenCalledTimes(1);
  });
  it('deve chamar formatDate e renderizar data formatada quando value for uma string válida', () => {
    const isoString = '2025-04-16T08:30:00.000Z';
    render(<DateRenderCell value={isoString} />);
    const expectedDateString = '16/04/25';
    expect(screen.getByText(expectedDateString)).toBeInTheDocument();
  });
});

