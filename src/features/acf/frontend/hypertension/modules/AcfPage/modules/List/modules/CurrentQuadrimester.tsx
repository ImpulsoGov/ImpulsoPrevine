import React from "react";
import { getCurrentQuadrimester } from "@/features/acf/frontend/common/GetCurrentQuadrimester";

export const CurrentQuadrimester: React.FC<{ date?: Date }> = ({
    date = new Date(),
}) => {
    // TODO: pensar se faz sentido usar a mesma instancia de data para calcular o quadrimestre e ano
    const quadrimester = getCurrentQuadrimester(date).toString();
    const year = date.getFullYear().toString();
    return (
        <div
            style={{
                fontSize: "26px",
                fontWeight: 400,
                color: "#1F1F1F",
                fontFamily: "Inter",
                marginBottom: "5px",
            }}
        >
            {`${quadrimester}° Quadrimestre de ${year}`}
        </div>
    );
};
