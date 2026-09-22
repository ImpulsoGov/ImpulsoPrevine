import { z } from "zod";

// As chaves abaixo são o contrato com quem edita o JSON no GrowthBook, e por
// isso seguem em português. Tudo que o mapa tem além delas — `onda`,
// `liberada_em`, `conecta` — é recorte que só o Portal usa, e o zod descarta.

const codigosIbge = z.array(z.string().regex(/^\d{6}$/));

// Cada entrada de `ondas` é um lote, não uma onda: uma mesma onda pode sair em
// dois dias. Aqui isso não importa — só quem entrou.
export const loteSchema = z.object({ municipios: codigosIbge });

// `ondas` entra como desconhecido de propósito: cada lote é validado sozinho,
// em quemJaMigrou. Uma validação que reprovasse o mapa inteiro transformaria um
// typo numa onda em "ninguém é redirecionado".
export const mapaDeOndasSchema = z.object({
    ondas: z.array(z.unknown()),
    demo: z
        .object({ municipios: codigosIbge.default([]) })
        .default({ municipios: [] }),
});
