export const sx = {
    "& .breakable-content": {
        whiteSpace: "break-spaces",
        paddingTop: "8px",
        paddingBottom: "8px",
    },
    "& .LowerHeader": {
        backgroundColor: "#F0F4F6",
        paddingTop: "15px",
        paddingBottom: "15px",
        height: "85px",
    },
    "& .UpperHeader": {
        backgroundColor: "#CBD7DE",
        color: "#535C63",
        fontFamily: "Inter",
        fontSize: "18px",
        fontStyle: "normal",
        fontWeight: 500,
        lineHeight: "24px",
        border: "none",
        textAlign: "center",
        height: "30px",
        borderRight: "1px solid #ACACAC",
    },
    "& .MuiDataGrid-cell": {
        wordBreak: "break-word",
        display: "flex",
        alignItems: "center",
        paddingRight: "0px",
        margin: "0px",
    },
    "& .MuiDataGrid-cellContent": {
        minHeight: 60,
        margin: "2px 0px 2px 0px",
    },
    "& .MuiDataGrid-columnHeaderTitle": {
        textOverflow: "clip",
        whiteSpace: "break-spaces",
        lineHeight: "17.5px",
        textAlign: "left",
        fontFamily: "Inter, sans-serif !important",
        fontSize: "14.5px !important",
        fontWeight: 400,
        color: "#606E78",
        overflow: "clip",
    },
    "& .MuiDataGrid-columnHeaderTitleContainer": {
        display: "flex",
        alignItems: "center",
        whiteSpace: "normal",
    },
    "& .MuiDataGrid-columnHeaderTitleContainerContent": {
        width: "100%",
    },

    "& .MuiDataGrid-columnHeaders": {
        backgroundColor: "#F0F4F6",
        borderBottom: "1px solid #0000001F",
    },
    "& .MuiDataGrid-columnHeader": {
        display: "flex",
        alignItems: "center",
        whiteSpace: "normal",
    },

    "& .MuiDataGrid-row": {
        fontFamily: "Inter, sans-serif !important",
        fontSize: "14.5px !important",
        fontWeight: "350",
        backgroundColor: "#FFF",
        color: "#000000DE",
        width: "98%",
    },
    "& .MuiDataGrid-root": {
        border: "none",
        borderWidth: "0px",
        backgroundColor: "red",
    },
    "& .MuiDataGrid-iconSeparator": {
        display: "none",
    },
    ".MuiDataGrid-iconButtonContainer": {
        visibility: "visible",
        width: "30px",
    },
    ".MuiDataGrid-sortIcon": {
        opacity: "1 !important",
        display: "inline-flex",
        alignItems: "center",
    },
    ".MuiDataGrid-columnHeader--sorted .MuiDataGrid-sortIcon": {
        color: "#1E8E76 !important", // Define a cor do ícone quando a ordenação está ativa
    },
    ".MuiDataGrid-columnHeader--filledGroup .MuiDataGrid-columnHeaderTitleContainer":
        {
            border: "none",
        },
    border: 0,
};
