export const breadcrumb = {
    breadcrumb: [
        {
            label: "Inicio",
            link: "/inicio",
        },
        {
            label: "Hipertensão",
            link: "/lista=hipertensao",
        },
    ],
};

export const header = {
    title: "Hipertensão",
    tooltip: (
        <div>
            <p>Legenda </p>
            <p> Tipo de diagnóstico: </p>
            <p>
                <b>Autorreferido </b> - a condição foi identificada como
                "autorreferida" quando é relatada pelo usuário na realização do
                Cadastro Individual.
            </p>
            <p>
                <b>Diagnóstico Clínico</b> - a condição foi identificada como
                "diagnóstico clínico" por haver atendimento individual
                confirmando o diagnóstico.
            </p>
        </div>
    ),
    text: "A lista nominal de hipertensão reúne os cidadãos que possuem a condição, seja por diagnóstico clínico ou autorreferido, e traz a situação da consulta e da solicitação de hemoblogina, que devem ser realizadas a cada seis meses para acompanhamento. Além disso, você encontrará também o nome profissional responsável pelo cidadão, para facilitar a organização da busca ativa. Utilize os filtros para segmentar a lista como preferir.",
};
