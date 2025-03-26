import { cpfOrBirthDayFormatter } from "@helpers/lista-nominal/impressao/cpfFormartter";

export const CpfEIdentificacaoCondicao = ({ value }) => {
    const { cpf, identificacao_condicao: identificacaoCondicao } = value;
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                fontWeight: "500",
                lineHeight: "10.5px",
            }}
        >
            <span>{cpfOrBirthDayFormatter({ value: cpf })}</span>
            <span>{identificacaoCondicao}</span>
        </div>
    );
};
