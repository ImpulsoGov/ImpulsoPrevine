import React from "react";

export const FilterHint: React.FC = () => {
    return (
        <div
            style={{
                color: "#606E78",
                fontFamily: "Inter",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "21px",
            }}
        >
            <img
                src="https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cme2w8uq30g9l07kjph3n82k7"
                alt="Ícone de filtro"
                style={{ marginRight: "6px" }}
            />
            <span style={{ color: "#1F1F1F", fontWeight: 700 }}>
                Filtrar lista
            </span>{" "}
            selecione filtros pata refinar a busca de cidadãos
        </div>
    );
};
