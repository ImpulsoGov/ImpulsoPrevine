import type { FilterItem } from "@/services/lista-nominal/ListaNominal";
import { sanitize } from "@utils/sanitize";

export type PageHeaderProps = {
    appliedFilters: FilterItem;
    filtersLabels: Record<string, string>;
    latestProductionDate: string;
    list: string;
    fontFamily?: string;
    printLegend?: string[];
    equipesDivididas?: boolean;
};

export const PageHeader = ({
    appliedFilters,
    filtersLabels,
    latestProductionDate,
    list,
    fontFamily = "sans-serif",
    printLegend = [],
    equipesDivididas = false,
}: PageHeaderProps) => {
    return (
        <div>
            <div
                className="largura"
                style={{
                    fontFamily: `${fontFamily}, sans-serif`,
                    fontSize: "16px",
                    display: "flex",
                    flexDirection: "row",
                }}
            >
                <div>
                    <p style={{ marginTop: 0 }}>
                        <b>LISTA NOMINAL {sanitize(list)}</b>
                    </p>
                    <p>
                        <i>
                            PRODUÇÃO MAIS RECENTE RECEBIDA EM :{" "}
                            {latestProductionDate}
                        </i>
                    </p>
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
                    alignItems: "flex-end",
                    gap: "10px",
                    fontSize: "16px",
                    marginBottom: "11px",
                    fontFamily: `${fontFamily}, sans-serif`,
                }}
            >
                <p
                    style={{
                        marginBottom: 0,
                        marginTop: "16px",
                    }}
                >
                    <b>Filtros aplicados: </b>
                </p>
                {Object.keys(appliedFilters).length > 0
                    ? Object.entries(appliedFilters).map(([filter, value]) => {
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
                                      }}
                                  >
                                      {filtersLabels[filter]}:{" "}
                                      {Array.isArray(value)
                                          ? value.join(", ")
                                          : value}
                                  </div>
                              );
                      })
                    : ["Sem filtros aplicados"]}
            </div>
            {printLegend.length > 0 && (
                <div
                    style={{
                        fontSize: "15px",
                        fontFamily: `${fontFamily}, sans-serif`,
                        lineHeight: "15px",
                        marginTop: "16px",
                        marginBottom: equipesDivididas ? "40px" : "15px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                    }}
                >
                    {printLegend.map((item) => (
                        <div key={item}>{sanitize(item)}</div>
                    ))}
                </div>
            )}
        </div>
    );
};
