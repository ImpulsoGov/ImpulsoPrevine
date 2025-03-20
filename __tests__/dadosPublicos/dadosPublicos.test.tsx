import { render, screen } from '@testing-library/react';
import dadosPublicosPage from '../../src/app/analise/page';
import { getServerSession } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { PROFILE_ID, } from '@/types/profile';

// Mocks para as dependências
jest.mock('next/dynamic', () => () => {
    const mod = require('../../src/app/analise/Analise');
    return mod.Analise;
});

jest.mock('next-auth', () => ({
  getServerSession: jest.fn(),
}));


jest.mock('../../src/app/analise/Analise', () => ({
    Analise: jest.fn(() => <div data-testid="analise-component">Analise Component</div>),
}));

const clientSession = {
  user: { 
      id: "xxxxxxxx", 
      nome: "usuarioNome",
      mail: "usuario@mail.com",
      cargo: "impulser", 
      municipio: "Impulsolandia - BR",
      equipe: "equipe1", 
      municipio_id_sus: "1111111", 
      perfis: [PROFILE_ID.impulser,PROFILE_ID.COAPS], 
      access_token: "token",  
  },
  status: 'authenticated',
  expires: '1',
};

describe('dadosPublicos', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renderiza dados públicos quando o usuário não está logado', () => {
    // Simula ausência de sessão
    (getServerSession as jest.Mock).mockResolvedValue(null);

    const pageElement = dadosPublicosPage();
    render(pageElement);

    expect(screen.getByTestId('analise-component')).toBeInTheDocument();
  });

  test('renderiza página de dados públicos quando o usuário está logado', () => {
    // Simula sessão com usuário
    (getServerSession as jest.Mock).mockResolvedValue({
      user: { perfis: [PROFILE_ID.impulser], municipio_id_sus: '123', access_token: 'token' },
    });
  
    const pageElement = dadosPublicosPage();

    render(
              <SessionProvider session={clientSession}>
                {pageElement}
              </SessionProvider>
            );

    expect(screen.getByTestId('analise-component')).toBeInTheDocument();
  });
});
//   test('renderiza SuportError quando unificarSituacaoPorIndicadores é null', async () => {
//     // Simula sessão com usuário e perfis APS
//     (getServerSession as jest.Mock).mockResolvedValue({
//       user: { perfis: [5], municipio_id_sus: '123', access_token: 'token' },
//     });
//     (InicioAPSRequest as jest.Mock).mockResolvedValue([{ some: 'data' }]);
//     // Simula falha ao unificar dados
//     (unificarSituacaoPorIndicadores as jest.Mock).mockResolvedValue(null);

//     const pageElement = await InicioPage();
//     render(pageElement);

//     expect(screen.getByTestId('suport-error')).toBeInTheDocument();
//   });

//   test('renderiza Inicio quando unificarSituacaoPorIndicadores retorna dados válidos para perfil APS', async () => {
//     const validData = { indicator: 'value' };

//     (getServerSession as jest.Mock).mockResolvedValue({
//       user: { perfis: [8], municipio_id_sus: '123', access_token: 'token' },
//     });
//     const clientSession = {
//         user: { 
//             id: "xxxxxxxx", 
//             nome: "usuarioNome",
//             mail: "usuario@mail.com",
//             cargo: "impulser", 
//             municipio: "Impulsolandia - BR",
//             equipe: "equipe1", 
//             municipio_id_sus: "1111111", 
//             perfis: [5,8], 
//             access_token: "token",  
//         },
//         status: 'authenticated',
//         expires: '1',
//       };
//     (InicioAPSRequest as jest.Mock).mockResolvedValue([{ some: 'data' }]);
//     (unificarSituacaoPorIndicadores as jest.Mock).mockResolvedValue(validData);

//     const pageElement = await InicioPage();
//     render(
//         <SessionProvider session={clientSession}>
//           {pageElement}
//         </SessionProvider>
//       );

//     expect(screen.getByTestId('inicio-component')).toBeInTheDocument();
//   });

//   test('renderiza Inicio quando unificarSituacaoPorIndicadores retorna dados válidos para perfil Equipe', async () => {
//     const validData = { indicator: 'value' };

//     (getServerSession as jest.Mock).mockResolvedValue({
//       user: { perfis: [9], municipio_id_sus: '123', equipe: 'equipe1', access_token: 'token' },
//     });
//     (InicioEquipeRequest as jest.Mock).mockResolvedValue([{ some: 'data' }]);
//     (unificarSituacaoPorIndicadores as jest.Mock).mockResolvedValue(validData);

//     const pageElement = await InicioPage();
//     render(pageElement);

//     expect(screen.getByTestId('inicio-component')).toBeInTheDocument();
//   });

//   test('deve renderizar SuportError quando unificarSituacaoPorIndicadores retorna objeto vazio', async () => {
//     // Configura a sessão com usuário e perfil válido (por exemplo, perfil APS)
//     (getServerSession as jest.Mock).mockResolvedValue({
//       user: { perfis: [5], municipio_id_sus: '123', access_token: 'token' },
//     });

//     // Simula o retorno válido do request APS
//     (InicioAPSRequest as jest.Mock).mockResolvedValue([{ some: 'data' }]);

//     // Simula que unificarSituacaoPorIndicadores retorna um objeto vazio
//     (unificarSituacaoPorIndicadores as jest.Mock).mockResolvedValue({});

//     // Obtém o elemento retornado pela função assíncrona
//     const pageElement = await InicioPage();
//     render(pageElement);

//     // Verifica se o componente SuportError foi renderizado
//     expect(screen.getByTestId('suport-error')).toBeInTheDocument();
//   });
// });