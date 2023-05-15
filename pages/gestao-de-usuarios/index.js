import { TituloTexto } from "@impulsogov/design-system";
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DataGrid, GridRowModes } from '@mui/x-data-grid';
import { getSession, useSession } from "next-auth/react";
import React from "react";
import { redirectHomeNotLooged } from '../../helpers/redirectHome';
import { getData } from '../../services/cms';
import { LAYOUT } from '../../utils/QUERYS';

const COLUMNS = [
    {
        field: 'nome_usuario',
        headerName: 'Nome',
        width: 300,
        headerAlign: 'center',
        align: 'center',
        editable: true
    },
    {
        field: 'municipio',
        headerName: 'Município',
        width: 200,
        headerAlign: 'center',
        align: 'center',
        editable: true
    },
    {
        field: 'mail',
        headerName: 'E-Mail',
        width: 300,
        headerAlign: 'center',
        align: 'center',
        editable: true
    },
    {
        field: 'cpf',
        headerName: 'CPF',
        width: 200,
        headerAlign: 'center',
        align: 'center',
        editable: true
    },
    {
        field: 'cargo',
        headerName: 'Cargo',
        width: 200,
        headerAlign: 'center',
        align: 'center',
        editable: true
    },
    {
        field: 'telefone',
        headerName: 'Telefone',
        width: 200,
        headerAlign: 'center',
        align: 'center',
        editable: true
    },
    {
        field: 'equipe',
        headerName: 'Equipe (INE)',
        width: 200,
        headerAlign: 'center',
        align: 'center',
        editable: true
    },
    {
        field: 'autorizacoes',
        headerName: 'Autorizações',
        width: 300,
        headerAlign: 'center',
        align: 'center',
        renderCell: (params) => {
            return (
                <div>
                    {
                        params.value.map((autorizacao) => (
                            <Badge
                                key={ autorizacao }
                                badgeContent={ autorizacao }
                                color="secondary"
                            />
                        ))
                    }
                </div>
            );
        }
    },
    {
        field: 'editarAutorizacoes',
        headerName: 'Editar autorizações',
        width: 300,
        headerAlign: 'center',
        align: 'center',
        renderCell: (params) => {
            return (
                <button>✎</button>
            );
        }
    }
];

const data = [
    {
        "mail": "aangelicasouza24@gmail.com",
        "cpf": "06385182614",
        "nome_usuario": "Angelica Souza Toledo Andrade",
        "municipio": "Viçosa - MG",
        "cargo": "Coordenação de Equipe",
        "telefone": "31986936665",
        "equipe": "0000278130",
        "autorizacoes": ["Plataforma IP", "Plataforma IP - Coordenação de Equipe", "Plataforma IP - Capacitação"]
    },
    {
        "mail": "abpirenopolis@gmail.com",
        "cpf": "01297610105",
        "nome_usuario": "Lucilia Goulão",
        "municipio": "Pirenópolis - GO",
        "cargo": "Coordenação de APS",
        "telefone": "62992700421",
        "equipe": "0",
        "autorizacoes": ["Plataforma IP", "Plataforma IP - Coordenação de Equipe"]
    },
    {
        "mail": "adriana-bispodos-santos@hotmail.com",
        "cpf": "25426438811",
        "nome_usuario": "Adriana Bispo Dos Santos",
        "municipio": "Juquitiba - SP",
        "cargo": "Coordenação APS",
        "telefone": "11912394343",
        "equipe": "0",
        "autorizacoes": ["Plataforma IP - Coordenação de Equipe", "Plataforma IP - Capacitação"]
    },
    {
        "mail": "aguedagabriela@gmail.com",
        "cpf": "09310820489",
        "nome_usuario": "Agueda Gabriela Ferreira Miranda Galindo",
        "municipio": "Alagoinha - PE",
        "cargo": "Coordenação de Equipe",
        "telefone": "87991527468",
        "equipe": "0000134996",
        "autorizacoes": ["Plataforma IP", "Plataforma IP - Coordenação de Equipe", "Plataforma IP - Capacitação"]
    },
    {
        "mail": "aldiza_lopes@hotmail.com",
        "cpf": "01708361260",
        "nome_usuario": "Aldiza Lopes Da Silva",
        "municipio": "Lábrea - AM",
        "cargo": "Coordenação de Equipe",
        "telefone": "97991628405",
        "equipe": "0EQ01AMLAB",
        "autorizacoes": ["Plataforma IP"]
    },
    {
        "mail": "alessandraenfermeira2010@hotmail.com",
        "cpf": "03319837532",
        "nome_usuario": "Alessandra Ramos",
        "municipio": "Santo Antônio do Descoberto - GO",
        "cargo": "Coordenação de Equipe",
        "telefone": "61995058384",
        "equipe": "0000466204",
        "autorizacoes": ["Plataforma IP - Coordenação de Equipe"]
    },
    {
        "mail": "aline.santos2277@gmail.com",
        "cpf": "01512606219",
        "nome_usuario": "Aline Alves Dos Santos",
        "municipio": "Lábrea - AM",
        "cargo": "Coordenação de Equipe",
        "telefone": "97984251509",
        "equipe": "0EQ02AMLAB",
        "autorizacoes": ["Plataforma IP - Capacitação"]
    },
];

export async function getServerSideProps(ctx) {
    const session = await getSession(ctx);
    const redirect = redirectHomeNotLooged(ctx, session); //alterar para gerenciador de usuarios somente
    if (redirect) return redirect;
    const res = [
        await getData(LAYOUT)
    ];
    return {
        props: {
            res: res
        }
    };
}

function EditToolbar(props) {
    const { selectedCellParams, cellMode, cellModesModel, setCellModesModel } = props;

    const handleSaveOrEdit = () => {
        if (!selectedCellParams) {
            return;
        }
        const { id } = selectedCellParams;
        if (cellMode === 'edit') {
            setCellModesModel({
                ...cellModesModel,
                [id]: { mode: GridRowModes.View },
            });
        } else {
            setCellModesModel({
                ...cellModesModel,
                [id]: { mode: GridRowModes.Edit },
            });
        }
    };

    const handleCancel = () => {
        if (!selectedCellParams) {
            return;
        }
        const { id } = selectedCellParams;
        setCellModesModel({
            ...cellModesModel,
            [id]: {
                mode: GridRowModes.View, ignoreModifications: true
            },
        });
    };

    const handleMouseDown = (event) => {
        // Keep the focus in the cell
        event.preventDefault();
    };

    return (
        <Box
            sx={ {
                borderBottom: 1,
                borderColor: 'divider',
                p: 1,
            } }
        >
            <Button
                onClick={ handleSaveOrEdit }
                onMouseDown={ handleMouseDown }
                disabled={ !selectedCellParams }
                variant="outlined"
            >
                { cellMode === 'edit' ? 'Salvar' : 'Editar' }
            </Button>
            <Button
                onClick={ handleCancel }
                onMouseDown={ handleMouseDown }
                disabled={ cellMode === 'view' }
                variant="outlined"
                sx={ { ml: 1 } }
            >
                Cancelar
            </Button>
        </Box>
    );
}

const Index = ({ res }) => {
    const { data: session, status } = useSession();
    const [selectedCellParams, setSelectedCellParams] = React.useState(null);
    const [cellModesModel, setCellModesModel] = React.useState({});

    const handleCellFocus = React.useCallback((event) => {
        // const row = event.currentTarget.parentElement;
        const id = event.currentTarget.dataset.id;
        // const field = event.currentTarget.dataset.field;
        setSelectedCellParams({ id });
    }, []);

    const cellMode = React.useMemo(() => {
        if (!selectedCellParams) {
            return 'view';
        }
        const { id } = selectedCellParams;
        return cellModesModel[id]?.mode || 'view';
    }, [cellModesModel, selectedCellParams]);

    const handleCellKeyDown = React.useCallback(
        (params, event) => {
            if (cellMode === 'edit') {
                // Prevents calling event.preventDefault() if Tab is pressed on a cell in edit mode
                event.defaultMuiPrevented = true;
            }
        },
        [cellMode],
    );

    const handleCellEditStop = React.useCallback((params, event) => {
        event.defaultMuiPrevented = true;
    }, []);

    return (
        <>
            {
                data && session?.user.perfis.includes(2) &&
                <>
                    <TituloTexto imagem={ {
                        posicao: null,
                        url: ''
                    } }
                        titulo='Bem vindo a área de gestão de usuários'
                        texto=''
                    />

                    <div style={ { padding: 80, paddingTop: 0, height: 800, width: '100%' } }>
                        <DataGrid
                            rows={ data }
                            columns={ COLUMNS }
                            editMode="row"
                            onRowKeyDown={ handleCellKeyDown }
                            rowModesModel={ cellModesModel }
                            onRowEditStop={ handleCellEditStop }
                            onRowModesModelChange={ (model) => setCellModesModel(model) }
                            // rowHeight={ 100 }
                            slots={ {
                                toolbar: EditToolbar,
                            } }
                            slotProps={ {
                                toolbar: {
                                    cellMode,
                                    selectedCellParams,
                                    setSelectedCellParams,
                                    cellModesModel,
                                    setCellModesModel,
                                },
                                row: {
                                    onFocus: handleCellFocus,
                                },
                            } }
                            initialState={ {
                                ...data.initialState,
                                pagination: { paginationModel: { pageSize: 10 } },
                            } }
                            pageSizeOptions={ [10, 30, 45] }
                            getRowId={ (row) => row.cpf }
                            sx={ {
                                '& .MuiDataGrid-columnHeaderTitle': {
                                    textOverflow: "clip",
                                    whiteSpace: "break-spaces",
                                    lineHeight: 1,
                                    textAlign: "center"
                                },
                            } }
                        />
                    </div>
                </>
            }
        </>
    );
};

export default Index;
