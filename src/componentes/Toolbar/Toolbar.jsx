import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { GridToolbarExport } from "@mui/x-data-grid";

function Toolbar({ selectedRowId, rowMode, save, edit, cancel, add }) {
    const handleMouseDown = (event) => {
        event.preventDefault();
    };

    return (
        <Box
            sx={{
                borderBottom: 1,
                borderColor: "divider",
                p: 1,
            }}
        >
            <Button
                onClick={add}
                onMouseDown={handleMouseDown}
                disabled={rowMode === "edit"}
                variant="outlined"
                sx={{ ml: 1 }}
            >
                Adicionar
            </Button>

            <Button
                onClick={rowMode === "edit" ? save : edit}
                onMouseDown={handleMouseDown}
                disabled={!selectedRowId}
                variant="outlined"
                sx={{ ml: 1 }}
            >
                {rowMode === "edit" ? "Salvar" : "Editar"}
            </Button>

            <Button
                onClick={cancel}
                onMouseDown={handleMouseDown}
                disabled={rowMode === "view"}
                variant="outlined"
                sx={{ ml: 1 }}
            >
                Cancelar
            </Button>

            <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
        </Box>
    );
}

export default Toolbar;
