import { captureMessage } from "@sentry/nextjs";
import { obterCliente } from "./growthbook";
import { loteSchema, mapaDeOndasSchema } from "./model";

// Municípios que já entraram no Portal Impulso. A fonte da verdade é a feature
// JSON `ondas-de-lancamento` do GrowthBook, a mesma que o Portal lê, editada
// pelo negócio a cada onda.
//
// Não existe cópia local da lista, de propósito: seria uma segunda fonte de
// verdade que envelhece, e o modo de falha dela é pior que a ausência — parte
// dos municípios seria redirecionada e parte não, conforme a cópia estivesse ou
// não atualizada.
//
// Aqui não interessa em que onda o município entrou nem quando: a pergunta é só
// "migrou?". Quem precisa de onda e data é o Portal.

const FEATURE = "ondas-de-lancamento";

const NENHUM: ReadonlySet<string> = new Set();

const quemJaMigrou = async (): Promise<ReadonlySet<string>> => {
    const cliente = await obterCliente();
    if (!cliente) return NENHUM;

    // A feature não tem regra de targeting — o valor é o mapa inteiro —, então
    // avaliar com contexto vazio deixa explícito que o usuário é irrelevante.
    const { value, source } = cliente.evalFeature<unknown>(FEATURE, {});
    if (source === "unknownFeature") {
        captureMessage(
            `growthbook: feature ${FEATURE} não encontrada — ninguém será redirecionado ao Portal`,
            "error"
        );
        return NENHUM;
    }

    const mapa = mapaDeOndasSchema.safeParse(value);
    if (!mapa.success) {
        captureMessage(
            `growthbook: mapa de ondas inválido — corrija a feature ${FEATURE}`,
            "error"
        );
        return NENHUM;
    }

    const migrados = new Set(mapa.data.demo.municipios);
    for (const bruto of mapa.data.ondas) {
        const lote = loteSchema.safeParse(bruto);
        // Lote malformado é descartado sozinho: o estrago de um typo fica na
        // onda que o tem, em vez de tirar o redirect de todo mundo.
        if (!lote.success) {
            captureMessage(
                `growthbook: lote inválido no mapa de ondas — descartado (${JSON.stringify(bruto)})`,
                "error"
            );
            continue;
        }
        for (const codigo of lote.data.municipios) migrados.add(codigo);
    }

    return migrados;
};

/**
 * O município já foi para o Portal Impulso e deve ser redirecionado.
 *
 * Responde `false` quando o GrowthBook não pode responder: a pessoa fica no IP,
 * que funciona. É o oposto do Portal, onde "não sei" nega acesso — lá o que
 * está em jogo é dado de paciente, aqui é um redirect.
 */
export const isMunicipioMigrado = async (
    municipioIdSus: string | undefined
): Promise<boolean> => {
    if (!municipioIdSus) return false;
    return (await quemJaMigrou()).has(municipioIdSus);
};
