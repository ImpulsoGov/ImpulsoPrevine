import { sanitize } from "@utils/sanitize";
import type { ReactElement } from "react";
import { useContext } from "react";
import type { AppliedFilters } from "@features/acf/frontend/common/WithFilters";
import {
    FiltersContext,
    type FiltersContextType,
} from "@features/acf/frontend/common/WithFilters/context";

export type PageHeaderProps = {
    // latestProductionDate: string;
    listTitle: string;
    printCaption?: Array<ReactElement>;
    filtersLabels: Record<string, string>;
};

export const PageHeader: React.FC<PageHeaderProps> = ({
    filtersLabels,
    // latestProductionDate, não vamos usar agora
    listTitle,
    printCaption = [],
}) => {
    const { selectedValues } = useContext(
        FiltersContext
    ) as FiltersContextType<AppliedFilters>;
    const appliedFilters = selectedValues ?? {};
    return (
        <div>
            <div
                className="largura"
                style={{
                    fontFamily: `Inter, sans-serif`,
                    fontSize: "16px",
                    display: "flex",
                    flexDirection: "row",
                }}
            >
                <div>
                    <p style={{ marginTop: 0 }}>
                        <b>{sanitize(listTitle)}</b>
                    </p>
                    {/* <p>
                        <i>
                            PRODUÇÃO MAIS RECENTE RECEBIDA EM :{" "}
                            {latestProductionDate}
                        </i>
                    </p> */}
                </div>
                <div
                    style={{
                        width: "fit-content",
                        height: "fit-content",
                        marginLeft: "auto",
                    }}
                >
                    <img
                        src="https://media.graphassets.com/3HLHjLzQQDmQIxkp7Ifq"
                        alt="logo"
                        width="150px"
                        height="45px"
                    />
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: "10px",
                    fontSize: "16px",
                    marginBottom: "11px",
                    fontFamily: `Inter, sans-serif`,
                }}
            >
                <div
                    style={{
                        marginTop: "4px",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <div>
                        <b>Filtros aplicados:</b>
                    </div>
                    {Object.values<string | Array<string>>(appliedFilters).some(
                        (value) => value.length > 0
                    ) ? (
                        (
                            Object.entries(appliedFilters) as Array<
                                [
                                    keyof AppliedFilters,
                                    AppliedFilters[keyof AppliedFilters],
                                ]
                            >
                        ).map(([filter, value]) => {
                            if (value.length > 0)
                                return (
                                    <div
                                        key={filter}
                                        style={{
                                            border: "solid 1px #757574",
                                            borderRadius: "5px",
                                            padding: "6px",
                                            fontSize: "11px",
                                            backgroundColor: "#F5F5F5",
                                            marginLeft: "8px",
                                            display: "flex",
                                            gap: "8px",
                                        }}
                                    >
                                        {filtersLabels[filter]}:{" "}
                                        {Array.isArray(value)
                                            ? value.join(", ")
                                            : value}
                                    </div>
                                );
                        })
                    ) : (
                        <div style={{ marginLeft: "8px" }}>
                            Sem filtros aplicados
                        </div>
                    )}
                </div>
            </div>
            {printCaption.length > 0 && (
                <div
                    style={{
                        fontSize: "15px",
                        fontFamily: `Inter, sans-serif`,
                        lineHeight: "15px",
                        marginTop: "16px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                    }}
                >
                    {printCaption.map((item, index) => (
                        <div key={index}>{item}</div>
                    ))}
                </div>
            )}
        </div>
    );
};
