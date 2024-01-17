import { DataGrid } from '@mui/x-data-grid';
import React, { useMemo, useState, useEffect } from 'react';
import { v4 as uuidV4 } from 'uuid';
import Pagination from '@mui/material/Pagination';
import styles from './TabelaDesempenhoEquipes.module.css';
import { Spinner } from '@impulsogov/design-system';

const TabelaDesempenhoEquipesComSeletor = ({
  selectedIndicadores,
  setSelectedIndicadores,
  selectedNovoIndicador,
  setSelectedNovoIndicador,
  selectedNovoIndicadorequipe,
  setSelectedNovoIndicadorequipe,
  selectedNovoIndicadorperiodo,
  setSelectedNovoIndicadorperiodo,
  TabDesempenhos,
}) => {

  const [showNovoCheckboxescnes, setShowNovoCheckboxescnes] = useState(false);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [showNovoCheckboxesequipe, setShowNovoCheckboxesequipe] = useState(false);
  const [showNovoCheckboxesperiodo, setShowNovoCheckboxesperiodo] = useState(false);

  const handleNovoCheckboxChangecnes = (value) => {
    let updatedSelectedNovoIndicador;
    if (selectedNovoIndicador.includes(value)) {
      updatedSelectedNovoIndicador = selectedNovoIndicador.filter(indicador => indicador !== value);
    } else {
      updatedSelectedNovoIndicador = [...selectedNovoIndicador, value];
    }

    const teamsForSelectedCnes = TabDesempenhos
      .filter(item => updatedSelectedNovoIndicador.includes(item.cnes_nome))
      .map(item => item.equipe_status);

    setSelectedNovoIndicador(updatedSelectedNovoIndicador);
    setSelectedIndicadores(teamsForSelectedCnes);

    if (updatedSelectedNovoIndicador.length === 0) {
      // Se sim, marque todos automaticamente
      setSelectedNovoIndicadorequipe([...new Set(TabDesempenhos.map(item => item.equipe_nome))]);
      setSelectedNovoIndicador([...new Set(TabDesempenhos.map(item => item.cnes_nome))]);
      setSelectedIndicadores([...new Set(TabDesempenhos.map(item => item.equipe_status))]);
    }

  };
  const handleExclusiveNovoCheckboxChangecnes = (value) => {

    const updatedSelectedNovoIndicador = [value];

    const teamsForSelectedCnes = TabDesempenhos
      .filter(item => updatedSelectedNovoIndicador.includes(item.cnes_nome))
      .map((item => item.equipe_nome) && (item => item.equipe_status));

    setSelectedNovoIndicador(updatedSelectedNovoIndicador);
    setSelectedIndicadores(teamsForSelectedCnes);
  };

  const handleCheckboxChange = (value) => {
    let updatedSelectedIndicadores;
    if (selectedIndicadores.includes(value)) {

      updatedSelectedIndicadores = selectedIndicadores.filter(indicador => indicador !== value);
    } else {

      updatedSelectedIndicadores = [...selectedIndicadores, value];
    }

    const filtered = TabDesempenhos
      .filter(item => updatedSelectedIndicadores.includes(item.equipe_status))
      .map((item => item.equipe_nome));

    setSelectedIndicadores(updatedSelectedIndicadores);
    setSelectedNovoIndicadorequipe(filtered);

    if (updatedSelectedIndicadores.length === 0) {
      // Se sim, marque todos automaticamente
      setSelectedNovoIndicadorequipe([...new Set(TabDesempenhos.map(item => item.equipe_nome))]);
      setSelectedNovoIndicador([...new Set(TabDesempenhos.map(item => item.cnes_nome))]);
      setSelectedIndicadores([...new Set(TabDesempenhos.map(item => item.equipe_status))]);
    }

  };
  const handleExclusiveCheckboxChange = (value) => {

    const updatedSelectedIndicadores = [value];

    const filtered = TabDesempenhos
    .filter(item => updatedSelectedIndicadores.includes(item.equipe_status))
    .map(item => item.equipe_nome);

    setSelectedIndicadores(updatedSelectedIndicadores);
    setSelectedNovoIndicadorequipe(filtered);
  };

  const handleNovoCheckboxChangeequipe = (value) => {
    let updatedSelectedNovoIndicadorequipe;
    if (selectedNovoIndicadorequipe.includes(value)) {
      updatedSelectedNovoIndicadorequipe = selectedNovoIndicadorequipe.filter(indicador => indicador !== value);
    } else {
      updatedSelectedNovoIndicadorequipe = [...selectedNovoIndicadorequipe, value];
    }

    const teamsForSelectedequipe = TabDesempenhos
      .filter(item => updatedSelectedNovoIndicadorequipe.includes(item.equipe_nome))
      .map(item => item.data_inicio);

    setSelectedNovoIndicadorequipe(updatedSelectedNovoIndicadorequipe);
    setSelectedNovoIndicadorperiodo(teamsForSelectedequipe);


    if (updatedSelectedNovoIndicadorequipe.length === 0) {
      // Se sim, marque todos automaticamente
      setSelectedNovoIndicadorequipe([...new Set(TabDesempenhos.map(item => item.equipe_nome))]);
      setSelectedNovoIndicador([...new Set(TabDesempenhos.map(item => item.cnes_nome))]);
      setSelectedIndicadores([...new Set(TabDesempenhos.map(item => item.equipe_status))]);
      setSelectedNovoIndicadorperiodo([...new Set(TabDesempenhos.map(item => item.data_inicio))]);
    }

  };
  const handleExclusiveNovoCheckboxChangesequipe = (value) => {

    const updatedSelectedNovoIndicadorequipe = [value];

    const teamsForSelectedequipe = TabDesempenhos
      .filter(item => updatedSelectedNovoIndicadorequipe.includes(item.equipe_nome))
      .map(item => item.data_inicio);

    setSelectedNovoIndicadorequipe(updatedSelectedNovoIndicadorequipe);
    setSelectedNovoIndicadorperiodo(teamsForSelectedequipe);
  };

  const handleNovoCheckboxChangeperiodo = (value) => {
    let updatedSelectedNovoIndicadorperiodo;
    if (selectedNovoIndicadorperiodo.includes(value)) {
      updatedSelectedNovoIndicadorperiodo = selectedNovoIndicadorperiodo.filter(indicador => indicador !== value);
    } else {
      updatedSelectedNovoIndicadorperiodo = [...selectedNovoIndicadorperiodo, value];
    }

    const teamsForSelectedperiodo = TabDesempenhos
      .filter(item => updatedSelectedNovoIndicadorperiodo.includes(item.data_inicio))
      .map(item => item.equipe_nome);

    setSelectedNovoIndicadorperiodo(updatedSelectedNovoIndicadorperiodo);
    setSelectedNovoIndicadorequipe(teamsForSelectedperiodo);


    if (updatedSelectedNovoIndicadorperiodo.length === 0) {
      // Se sim, marque todos automaticamente
      setSelectedIndicadores([...new Set(TabDesempenhos.map(item => item.data_inicio))]);
      setSelectedNovoIndicadorequipe([...new Set(TabDesempenhos.map(item => item.equipe_nome))]);
    }

  };
  const handleExclusiveNovoCheckboxChangesperiodo = (value) => {

    const updatedSelectedNovoIndicadorperiodo = [value];

    const teamsForSelectedperiodo = TabDesempenhos
      .filter(item => updatedSelectedNovoIndicadorperiodo.includes(item.data_inicio))
      .map(item => item.equipe_nome);

    setSelectedNovoIndicadorperiodo(updatedSelectedNovoIndicadorperiodo);
    setSelectedNovoIndicadorequipe(teamsForSelectedperiodo);
  };

  const selectAllTeams = () => {

    setSelectedIndicadores([...new Set(TabDesempenhos.map(item => item.equipe_status))]);
    setSelectedNovoIndicador([...new Set(TabDesempenhos.map(item => item.cnes_nome))]);
    setSelectedNovoIndicadorequipe([...new Set(TabDesempenhos.map(item => item.equipe_nome))]);
    setSelectedNovoIndicadorperiodo([...new Set(TabDesempenhos.map(item => item.data_inicio))]);

  };

  return (
    <div>
      <div className={styles.textContainer}>
        <div className={`${styles.selectorBox} ${styles.estabelecimentoSelector}`}>
          <div className={styles.selectorHeader} onClick={() => setShowNovoCheckboxescnes(!showNovoCheckboxescnes)}>
            <span>Estabelecimento </span>
            <div className={styles.arrowIcon}>{showNovoCheckboxescnes ? '▼' : '▼'}</div>
          </div>
          {showNovoCheckboxescnes && (
            <div className={styles.checkboxes}>
              <button className={styles.button} onClick={selectAllTeams}>Selecionar Todos</button>
              {selectedNovoIndicador.filter((indicador, index, self) => self.indexOf(indicador) === index).map((indicador, index) => (
                <div key={index} className={styles.checkboxItem}>
                  <label>
                    <button className={styles.button} onClick={() => handleExclusiveNovoCheckboxChangecnes(indicador)}>Apenas</button>
                    <input
                      type="checkbox"
                      value={indicador}
                      checked={selectedNovoIndicador.includes(indicador)}
                      onChange={(e) => handleNovoCheckboxChangecnes(e.target.value)}
                    />
                    {indicador}
                  </label>
                </div>
              ))
              }
            </div>
          )}
        </div>
        <div className={`${styles.selectorBox} ${styles.equipeStatusSelector}`}>
          <div className={styles.selectorHeader} onClick={() => setShowCheckboxes(!showCheckboxes)}>
            <span >Status da Equipe</span>
            <div className={styles.arrowIcon}>{showCheckboxes ? '▼' : '▼'}</div>
          </div>
          {showCheckboxes && (
            <div className={styles.checkboxes}>
              <button className={styles.button} onClick={selectAllTeams}>Selecionar Todos</button>
              {selectedIndicadores.filter((indicador, index, self) => self.indexOf(indicador) === index).map((indicador, index) => (
                <div key={index} className={styles.checkboxItem}>
                  <label>
                    <button className={styles.button} onClick={() => handleExclusiveCheckboxChange(indicador)}>Apenas</button>
                    <input
                      type="checkbox"
                      value={indicador}
                      checked={selectedIndicadores.includes(indicador)}
                      onChange={(e) => handleCheckboxChange(e.target.value)}
                    />
                    {indicador}
                  </label>
                </div>
              ))
              }
            </div>
          )}
        </div>
        <div className={`${styles.selectorBox} ${styles.EquipeSelector}`}>
          <div className={styles.selectorHeader} onClick={() => setShowNovoCheckboxesequipe(!showNovoCheckboxesequipe)}>
            <span>Equipe </span>
            <div className={styles.arrowIcon}>{showNovoCheckboxesequipe ? '▼' : '▼'}</div>
          </div>
          {showNovoCheckboxesequipe && (
            <div className={styles.checkboxes}>
              <button className={styles.button} onClick={selectAllTeams}>Selecionar Todos</button>
              {selectedNovoIndicadorequipe.filter((indicador, index, self) => self.indexOf(indicador) === index).map((indicador, index) => (
                <div key={index} className={styles.checkboxItem}>
                  <label>
                    <button className={styles.button} onClick={() => handleExclusiveNovoCheckboxChangesequipe(indicador)}>Apenas</button>
                    <input
                      type="checkbox"
                      value={indicador}
                      checked={selectedNovoIndicadorequipe.includes(indicador)}
                      onChange={(e) => handleNovoCheckboxChangeequipe(e.target.value)}
                    />
                    {indicador}
                  </label>
                </div>
              ))
              }
            </div>
          )}
        </div>
        <div className={`${styles.selectorBox} ${styles.PeriodoSelector}`}>
          <div className={styles.selectorHeader} onClick={() => setShowNovoCheckboxesperiodo(!showNovoCheckboxesperiodo)}>
            <span>Período </span>
            <div className={styles.arrowIcon}>{showNovoCheckboxesperiodo ? '▼' : '▼'}</div>
          </div>
          {showNovoCheckboxesperiodo && (
            <div className={styles.checkboxes}>
              <button className={styles.button} onClick={selectAllTeams}>Selecionar Todos</button>
              {selectedNovoIndicadorperiodo.filter((indicador, index, self) => self.indexOf(indicador) === index).map((indicador, index) => (
                <div key={index} className={styles.checkboxItem}>
                  <label>
                    <button className={styles.button} onClick={() => handleExclusiveNovoCheckboxChangesperiodo(indicador)}>Apenas</button>
                    <input
                      type="checkbox"
                      value={indicador}
                      checked={selectedNovoIndicadorperiodo.includes(indicador)}
                      onChange={(e) => handleNovoCheckboxChangeperiodo(e.target.value)}
                    />
                    {indicador}
                  </label>
                </div>
              ))
              }
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const TabelaDesempenhoEquipes = ({ TabDesempenhos }) => {
  const [selectedIndicadores, setSelectedIndicadores] = useState(
    [...new Set(TabDesempenhos.map(item => item.equipe_status))]
  );

  const [selectedNovoIndicador, setSelectedNovoIndicador] = useState(
    [...new Set(TabDesempenhos.map(item => item.cnes_nome))]
  );

  const [selectedNovoIndicadorequipe, setSelectedNovoIndicadorequipe] = useState(
    [...new Set(TabDesempenhos.map(item => item.equipe_nome))]
  );

  const [selectedNovoIndicadorperiodo, setSelectedNovoIndicadorperiodo] = useState(
    [...new Set(TabDesempenhos.map(item => item.data_inicio))]
  );

  const [page, setPage] = useState(1);
  const rowsPerPage = 25;

  const mapearStatusParaEmoji = (status) => {

    switch (status.toLowerCase()) {
      case 'homologadas':
        return '⚠️';
      case 'válidas':
        return '✔️';
      case 'cadastradas':
        return '❌';
      default:
        return status;
    }
  };

  const colunas = useMemo(() => [
    {
      field: 'data_inicio',
      headerName: 'Periodo',
      flex: 2,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word', overflowWrap: 'break-word', padding: "15px" }}>
          {params.value}
        </div>
      ),
      cellClassName: 'multi-line-cell',
      align: 'justify',
      headerAlign: 'center',
      headerClassName: styles.cabecalho,
    },
    {
      field: 'equipe_nome',
      headerName: 'Equipe',
      flex: 2,
      align: 'center',
      headerAlign: 'center',
      headerClassName: styles.cabecalho,
    },
    {
      field: 'equipe_id_ine',
      headerName: 'INE',
      flex: 2,
      align: 'center',
      headerAlign: 'center',
      headerClassName: styles.cabecalho,
    },
    {
      field: 'equipe_status',
      headerName: 'Status da Equipe',
      flex: 1,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word', overflowWrap: 'break-word', padding: "15px" }}>
          {mapearStatusParaEmoji(params.value)}
        </div>
      ),
      align: 'center',
      headerAlign: 'center',
      description: (
        <div>
          <div>✔️ - Equipes Válidas</div>
          <div>⚠️ - Equipes Homologadas</div>
          <div>❌ - Equipes Cadastradas</div>
        </div>
      ),
      headerClassName: styles.cabecalho,
    },
    {
      field: 'cadastros_com_pontuacao',
      headerName: 'Cadastros com ponderação',
      flex: 1.5,
      align: 'center',
      headerAlign: 'center',
      headerClassName: styles.cabecalho,
    },
    {
      field: 'cadastro_total',
      headerName: 'Total de cadastros',
      flex: 1.5,
      align: 'center',
      headerAlign: 'center',
      headerClassName: styles.cabecalho,
    },
  ]);

  const obterNomeMes = (numeroMes) => {
    const nomesMeses = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return nomesMeses[numeroMes - 1];
  };

  const linhasPaginadas = useMemo(() => {
    if (!Array.isArray(TabDesempenhos)) {
      return [];
    }

    const dadosOrdenados = [...TabDesempenhos].sort((a, b) => {
      const dataA = new Date(a.data_inicio);
      const dataB = new Date(b.data_inicio);
      return dataB - dataA;
    });

    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    const dadosFiltrados = dadosOrdenados.filter(item => {
      return (
        selectedIndicadores.includes(item.equipe_status) &&
        selectedNovoIndicador.includes(item.cnes_nome) &&
        selectedNovoIndicadorequipe.includes(item.equipe_nome) &&
        selectedNovoIndicadorperiodo.includes(item.data_inicio)
      );
    });

    return dadosFiltrados.slice(startIndex, endIndex).map(({ data_inicio, equipe_nome, equipe_id_ine, equipe_status, cadastros_com_pontuacao, cadastro_total }) => {
      
      const [ano, mes, dia] = data_inicio ? data_inicio.split('-') : "";
      const mesNome = obterNomeMes(Number(mes));

      const dataFormatada = `${ano}-${mesNome}-${dia}`;

      return {
        id: uuidV4(),
        data_inicio: dataFormatada,
        equipe_nome,
        equipe_id_ine,
        equipe_status,
        cadastros_com_pontuacao,
        cadastro_total,
      };
    });
  }, [TabDesempenhos, page, selectedIndicadores, selectedNovoIndicador, selectedNovoIndicadorequipe, selectedNovoIndicadorperiodo]);

  useEffect(() => setSelectedIndicadores([...new Set(TabDesempenhos.map(item => item.equipe_status))]), [TabDesempenhos]);
  useEffect(() => setSelectedNovoIndicador([...new Set(TabDesempenhos.map(item => item.cnes_nome))]), [TabDesempenhos]);
  useEffect(() => setSelectedNovoIndicadorequipe([...new Set(TabDesempenhos.map(item => item.equipe_nome))]), [TabDesempenhos]);
  useEffect(() => setSelectedNovoIndicadorperiodo([...new Set(TabDesempenhos.map(item => item.data_inicio))]), [TabDesempenhos]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div className={styles['tabelaContainer']}>
      {selectedIndicadores.length === 0 ? (
        <Spinner />
      ) : (
        <div  >
          <TabelaDesempenhoEquipesComSeletor
            selectedIndicadores={selectedIndicadores}
            setSelectedIndicadores={setSelectedIndicadores}
            TabDesempenhos={TabDesempenhos}
            selectedNovoIndicador={selectedNovoIndicador}
            setSelectedNovoIndicador={setSelectedNovoIndicador}
            selectedNovoIndicadorequipe={selectedNovoIndicadorequipe}
            setSelectedNovoIndicadorequipe={setSelectedNovoIndicadorequipe}
            selectedNovoIndicadorperiodo={selectedNovoIndicadorperiodo}
            setSelectedNovoIndicadorperiodo={setSelectedNovoIndicadorperiodo}
           />

          <DataGrid
            sx={{
              '& .MuiDataGrid-columnHeaderTitle': {
                fontWeight: 'bold',
                fontSize: '14px',
                lineHeight: '1rem',
                whiteSpace: 'normal',
                textAlign: 'center',
              },
              '& .MuiDataGrid-toolbarContainer': {
                backgroundColor: '#1B1C1E',
              },
              '& .MuiDataGrid-cell': {
                fontSize: '14px',
                lineHeight: '1rem',
                whiteSpace: 'normal',
              },
              '& .MuiButton-root': {
                color: '#D4DBE7',
              },
              '& .MuiButton-outlined': {
                borderColor: '#D4DBE7',
              },

            }}

            rows={linhasPaginadas}
            columns={colunas}
            pagination
            rowsPerPageOptions={[10, 25, 50]}
            onPageChange={handleChangePage}
            autoHeight
            hideFooter
            disableColumnMenu
            getRowHeight={() => 'auto'}
            headerHeight={150}

          />

        </div>


      )}
      <div className={styles['paginacao']}>
        <Pagination
          count={Math.ceil(TabDesempenhos.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
        />
      </div>

    </div>

  );




};

export default TabelaDesempenhoEquipes;