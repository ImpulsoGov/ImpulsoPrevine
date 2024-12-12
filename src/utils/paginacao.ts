// Arquivo para simular a paginação de dados
type PaginatedResponse = {
  data: Record<string, string | number | Date | Record<string, string | null | undefined>>[];
  // currentPage: number;
  // totalPages: number;
  totalRows: number;
};

const data = {
  data:[
    {
        nome: 'Nome 1',
        cpf: '123.456.789-00',
        identificacao_condicao: 'Condição 1',
        dt_consulta_mais_recente: {
            text: null,
            theme: "pending"
        },
        prazo_proxima_consulta: {
            text: "Em dia",
            theme: "success"
        },
        dt_afericao_pressao_mais_recente: {
            text: null,
            theme: "pending"
        },
        prazo_proxima_afericao_pa: {
            text: "Em dia",
            theme: "success"
        },
        acs_nome_cadastro: 'ACS 1'
    },
    {
        nome: 'Nome 2',
        cpf: '123.456.789-01',
        identificacao_condicao: 'Condição 2',
        dt_consulta_mais_recente: {
            text: "22/09/21",
        },
        prazo_proxima_consulta: {
            text: "Até 30/04/23",
            theme: "warning"
        },
        dt_afericao_pressao_mais_recente: {
            text: "22/02/21",
        },
        prazo_proxima_afericao_pa: {
            text: "Até 30/04/23",
            theme: "warning"
        },
        acs_nome_cadastro: 'ACS 2'
    },
    {
        nome: 'Nome 3',
        cpf: '123.456.789-02',
        identificacao_condicao: 'Condição 3',
        dt_consulta_mais_recente: {
            text: null,
            theme: "pending"
        },
        prazo_proxima_consulta: {
            text: "Até 30/04/23",
            theme: "warning"
        },
        dt_afericao_pressao_mais_recente: {
            text: "22/02/21",
        },
        prazo_proxima_afericao_pa: {
            text: "Até 30/04/23",
            theme: "success"
        },
        acs_nome_cadastro: 'ACS 3'
    },
    {
        nome: 'Nome 4',
        cpf: '123.456.789-00',
        identificacao_condicao: 'Condição 1',
        dt_consulta_mais_recente: {
            text: null,
            theme: "pending"
        },
        prazo_proxima_consulta: {
            text: "Até 30/04/23",
            theme: "warning"
        },
        dt_afericao_pressao_mais_recente: {
            text: "22/02/21",
        },
        prazo_proxima_afericao_pa: {
            text: "Até 30/04/23",
            theme: "success"
        },
        acs_nome_cadastro: 'ACS 1'
    },
    {
        nome: 'Nome 5',
        cpf: '123.456.789-01',
        identificacao_condicao: 'Condição 2',
        dt_consulta_mais_recente: {
            text: null,
            theme: "pending"
        },
        prazo_proxima_consulta: {
            text: "Até 30/04/23",
            theme: "warning"
        },
        dt_afericao_pressao_mais_recente: {
            text: "22/02/21",
        },
        prazo_proxima_afericao_pa: {
            text: "Até 30/04/23",
            theme: "success"
        },
        acs_nome_cadastro: 'ACS 2'
    },
    {
        nome: 'Nome 6',
        cpf: '123.456.789-02',
        identificacao_condicao: 'Condição 3',
        dt_consulta_mais_recente: {
            text: null,
            theme: "pending"
        },
        prazo_proxima_consulta: {
            text: "Até 30/04/23",
            theme: "warning"
        },
        dt_afericao_pressao_mais_recente: {
            text: "22/02/21",
        },
        prazo_proxima_afericao_pa: {
            text: "Até 30/04/23",
            theme: "success"
        },
        acs_nome_cadastro: 'ACS 3'
    },
    {
        nome: 'Nome 7',
        cpf: '123.456.789-00',
        identificacao_condicao: 'Condição 1',
        dt_consulta_mais_recente: {
            text: null,
            theme: "pending"
        },
        prazo_proxima_consulta: {
            text: "Até 30/04/23",
            theme: "warning"
        },
        dt_afericao_pressao_mais_recente: {
            text: "22/02/21",
        },
        prazo_proxima_afericao_pa: {
            text: "Até 30/04/23",
            theme: "success"
        },
        acs_nome_cadastro: 'ACS 1'
    },
    {
        nome: 'Nome 8',
        cpf: '123.456.789-01',
        identificacao_condicao: 'Condição 2',
        dt_consulta_mais_recente: {
            text: null,
            theme: "pending"
        },
        prazo_proxima_consulta: {
            text: "Até 30/04/23",
            theme: "warning"
        },
        dt_afericao_pressao_mais_recente: {
            text: "22/02/21",
        },
        prazo_proxima_afericao_pa: {
            text: "Até 30/04/23",
            theme: "success"
        },
        acs_nome_cadastro: 'ACS 2'
    },
    {
        nome: 'Nome 9',
        cpf: '123.456.789-02',
        identificacao_condicao: 'Condição 3',
        dt_consulta_mais_recente: {
            text: null,
            theme: "pending"
        },
        prazo_proxima_consulta: {
            text: "Até 30/04/23",
            theme: "warning"
        },
        dt_afericao_pressao_mais_recente: {
            text: "22/02/21",
        },
        prazo_proxima_afericao_pa: {
            text: "Até 30/04/23",
            theme: "success"
        },
        acs_nome_cadastro: 'ACS 3'
    }
  ],
  totalRows: 9
}

export function paginateArray(
  // array: T[],
  page: number = 1,
  pageSize: number = 10
): Promise<PaginatedResponse> {
  return new Promise((resolve) => {
    // Simular tempo de espera da requisição
    setTimeout(() => {
      // Validar tamanho da página
      if (pageSize < 1) {
        throw new Error("PageSize must be greater than 0.");
      }

      // const totalItems = array.length;
      // const totalPages = Math.ceil(totalItems / pageSize);

      // Garantir que a página seja válida (página 0 retorna a primeira página)
      // const validPage = Math.max(1, Math.min(page, totalPages));
      const startIndex = page * pageSize;
      const endIndex = startIndex + pageSize;

      // Fatia o array
      const requestData = data.data.slice(startIndex, endIndex);

      resolve({
        data: requestData,
        // currentPage: validPage,
        // totalPages,
        totalRows: data.totalRows,
      });
    }, 2000); // 2 segundo de atraso
  });
}