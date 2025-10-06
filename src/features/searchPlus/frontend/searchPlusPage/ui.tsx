import React from "react";

export const UI: React.FC = () => {
    return (
        <>
            <div id="ig-wrap">
                <div className="ig-card">
                    <div className="ig-row">
                        <strong id="ig-title"></strong>
                        <span className="ig-hint" id="ig-sub"></span>
                    </div>
                    <div className="ig-row">
                        <input
                            id="ig-file"
                            type="file"
                            accept=".csv,text/csv"
                        />
                        <span
                            id="ig-badge"
                            className="ig-badge"
                            style={{ display: "none" }}
                        >
                            <svg viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M20 7L9 18l-5-5"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <span id="ig-badge-text">CSV carregado: </span>
                        </span>
                        <span className="ig-spacer"></span>
                        <div className="ig-ddcol">
                            <div
                                id="ig-dd-c"
                                className="ig-dd"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <button
                                    type="button"
                                    id="ig-dd-trigger-c"
                                    className="ig-dd-trigger"
                                >
                                    <span className="ig-dd-label">
                                        Filtrar consultas
                                    </span>
                                    <span className="ig-dd-right">
                                        <span
                                            id="ig-dd-count-c"
                                            className="ig-dd-badge"
                                        ></span>
                                        <svg
                                            className="ig-dd-chev"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z"
                                                clip-rule="evenodd"
                                            ></path>
                                        </svg>
                                    </span>
                                </button>
                                <div
                                    className="ig-dd-panel"
                                    role="menu"
                                    aria-label="Filtrar consultas"
                                >
                                    <div className="ig-dd-title">Situações</div>
                                    <label className="ig-dd-opt">
                                        <input type="checkbox" id="c-atr" />
                                        <span>Atrasada</span>
                                    </label>
                                    <label className="ig-dd-opt">
                                        <input type="checkbox" id="c-ven" />
                                        <span>Vence dentro do quadri</span>
                                    </label>
                                    <label className="ig-dd-opt">
                                        <input type="checkbox" id="c-emd" />
                                        <span>Em dia</span>
                                    </label>
                                    <label className="ig-dd-opt">
                                        <input type="checkbox" id="c-nun" />
                                        <span>Nunca realizado</span>
                                    </label>
                                    <div className="ig-dd-actions">
                                        <button
                                            type="button"
                                            id="ig-dd-clear-c"
                                            className="ig-dd-clear"
                                        >
                                            Limpar
                                        </button>
                                        <button
                                            type="button"
                                            id="ig-dd-apply-c"
                                            className="ig-dd-apply"
                                        >
                                            Aplicar
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div
                                id="ig-dd-p"
                                className="ig-dd"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <button
                                    type="button"
                                    id="ig-dd-trigger-p"
                                    className="ig-dd-trigger"
                                >
                                    <span className="ig-dd-label">
                                        Filtrar aferição de PA
                                    </span>
                                    <span className="ig-dd-right">
                                        <span
                                            id="ig-dd-count-p"
                                            className="ig-dd-badge"
                                        ></span>
                                        <svg
                                            className="ig-dd-chev"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z"
                                                clip-rule="evenodd"
                                            ></path>
                                        </svg>
                                    </span>
                                </button>
                                <div
                                    className="ig-dd-panel"
                                    role="menu"
                                    aria-label="Filtrar aferição de PA"
                                >
                                    <div className="ig-dd-title">Situações</div>
                                    <label className="ig-dd-opt">
                                        <input type="checkbox" id="p-atr" />
                                        <span>Atrasada</span>
                                    </label>
                                    <label className="ig-dd-opt">
                                        <input type="checkbox" id="p-ven" />
                                        <span>Vence dentro do quadri</span>
                                    </label>
                                    <label className="ig-dd-opt">
                                        <input type="checkbox" id="p-emd" />
                                        <span>Em dia</span>
                                    </label>
                                    <label className="ig-dd-opt">
                                        <input type="checkbox" id="p-nun" />
                                        <span>Nunca realizado</span>
                                    </label>
                                    <div className="ig-dd-actions">
                                        <button
                                            type="button"
                                            id="ig-dd-clear-p"
                                            className="ig-dd-clear"
                                        >
                                            Limpar
                                        </button>
                                        <button
                                            type="button"
                                            id="ig-dd-apply-p"
                                            className="ig-dd-apply"
                                        >
                                            Aplicar
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div
                                id="ig-dd-w"
                                className="ig-dd"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <button
                                    type="button"
                                    id="ig-dd-trigger-w"
                                    className="ig-dd-trigger"
                                >
                                    <span className="ig-dd-label">
                                        Filtrar peso/altura
                                    </span>
                                    <span className="ig-dd-right">
                                        <span
                                            id="ig-dd-count-w"
                                            className="ig-dd-badge"
                                        ></span>
                                        <svg
                                            className="ig-dd-chev"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z"
                                                clip-rule="evenodd"
                                            ></path>
                                        </svg>
                                    </span>
                                </button>
                                <div
                                    className="ig-dd-panel"
                                    role="menu"
                                    aria-label="Filtrar peso/altura"
                                >
                                    <div className="ig-dd-title">Situações</div>
                                    <label className="ig-dd-opt">
                                        <input type="checkbox" id="w-atr" />
                                        <span>Atrasada</span>
                                    </label>
                                    <label className="ig-dd-opt">
                                        <input type="checkbox" id="w-ven" />
                                        <span>Vence dentro do quadri</span>
                                    </label>
                                    <label className="ig-dd-opt">
                                        <input type="checkbox" id="w-emd" />
                                        <span>Em dia</span>
                                    </label>
                                    <label className="ig-dd-opt">
                                        <input type="checkbox" id="w-nun" />
                                        <span>Nunca realizado</span>
                                    </label>
                                    <div className="ig-dd-actions">
                                        <button
                                            type="button"
                                            id="ig-dd-clear-w"
                                            className="ig-dd-clear"
                                        >
                                            Limpar
                                        </button>
                                        <button
                                            type="button"
                                            id="ig-dd-apply-w"
                                            className="ig-dd-apply"
                                        >
                                            Aplicar
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div
                                id="ig-dd-v"
                                className="ig-dd"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <button
                                    type="button"
                                    id="ig-dd-trigger-v"
                                    className="ig-dd-trigger"
                                >
                                    <span className="ig-dd-label">
                                        Filtrar visita domiciliar
                                    </span>
                                    <span className="ig-dd-right">
                                        <span
                                            id="ig-dd-count-v"
                                            className="ig-dd-badge"
                                        ></span>
                                        <svg
                                            className="ig-dd-chev"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z"
                                                clip-rule="evenodd"
                                            ></path>
                                        </svg>
                                    </span>
                                </button>
                                <div
                                    className="ig-dd-panel"
                                    role="menu"
                                    aria-label="Filtrar visita domiciliar"
                                >
                                    <div className="ig-dd-title">Situações</div>
                                    <label className="ig-dd-opt">
                                        <input type="checkbox" id="v-atr" />
                                        <span>Atrasada</span>
                                    </label>
                                    <label className="ig-dd-opt">
                                        <input type="checkbox" id="v-ven" />
                                        <span>Vence dentro do quadri</span>
                                    </label>
                                    <label className="ig-dd-opt">
                                        <input type="checkbox" id="v-emd" />
                                        <span>Em dia</span>
                                    </label>
                                    <label className="ig-dd-opt">
                                        <input type="checkbox" id="v-nun" />
                                        <span>Nunca realizado</span>
                                    </label>
                                    <div className="ig-dd-actions">
                                        <button
                                            type="button"
                                            id="ig-dd-clear-v"
                                            className="ig-dd-clear"
                                        >
                                            Limpar
                                        </button>
                                        <button
                                            type="button"
                                            id="ig-dd-apply-v"
                                            className="ig-dd-apply"
                                        >
                                            Aplicar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ig-row ig-actions">
                        <button
                            id="ig-go"
                            className="ig-btn ig-primary"
                            disabled
                        >
                            Gerar PDF
                        </button>
                        <button
                            id="ig-reset"
                            className="ig-btn ig-primary"
                            style={{ display: "none" }}
                        >
                            Transformar outro arquivo
                        </button>
                    </div>
                    <div className="ig-row">
                        <progress
                            id="ig-prog"
                            max="100"
                            value="0"
                            hidden
                        ></progress>
                        <span id="ig-st" className="ig-muted"></span>
                    </div>
                </div>
            </div>
        </>
    );
};
