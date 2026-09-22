import { GrowthBookClient } from "@growthbook/growthbook";
import { captureException, captureMessage } from "@sentry/nextjs";

// Ponto único de acoplamento do IP ao GrowthBook: nenhum outro arquivo importa
// `@growthbook/growthbook`.
//
// GrowthBookClient, e não GrowthBook, porque ele é stateless — um cliente por
// isolate, contexto passado a cada avaliação. É o desenho que serve middleware.

const API_HOST = "https://cdn.growthbook.io";

// Teto para o fetch. Isto roda antes de qualquer página: indisponibilidade tem
// que virar "não redireciona", não "navegação lenta".
const TIMEOUT_MS = 1500;

// Depois de uma falha, para de tentar por um tempo. Sem isso, um GrowthBook
// fora do ar cobraria o timeout em TODA navegação, inclusive a de quem nem é de
// município migrado.
const ESPERA_APOS_FALHA_MS = 30_000;

let cliente: GrowthBookClient | undefined;
let inicializacao: Promise<boolean> | undefined;
let bloqueadoAte = 0;

const bloquear = (): void => {
    inicializacao = undefined;
    bloqueadoAte = Date.now() + ESPERA_APOS_FALHA_MS;
};

const inicializar = async (instancia: GrowthBookClient): Promise<boolean> => {
    // streaming: SSE não serve em serverless, a conexão morre com a instância.
    // Sem ele o SDK usa stale-while-revalidate, que é o que queremos.
    const resposta = await instancia.init({
        timeout: TIMEOUT_MS,
        streaming: false,
    });
    if (!resposta.success)
        captureException(
            resposta.error ?? new Error("growthbook: init não teve sucesso")
        );
    return resposta.success;
};

/**
 * Cliente pronto para avaliar, ou `undefined` quando o GrowthBook não pode
 * responder. O SDK guarda o payload em cache por até 4h e só vai à rede quando
 * ele passa de 60s, então isolate morno não paga fetch.
 */
export const obterCliente = async (): Promise<GrowthBookClient | undefined> => {
    if (Date.now() < bloqueadoAte) return undefined;

    const clientKey = process.env.GROWTHBOOK_CLIENT_KEY;
    if (!clientKey) {
        captureMessage(
            "growthbook: GROWTHBOOK_CLIENT_KEY ausente — ninguém será redirecionado ao Portal",
            "error"
        );
        bloquear();
        return undefined;
    }

    cliente ??= new GrowthBookClient({ apiHost: API_HOST, clientKey });
    inicializacao ??= inicializar(cliente);

    try {
        if (!(await inicializacao)) {
            bloquear();
            return undefined;
        }
    } catch (erro) {
        captureException(erro);
        bloquear();
        return undefined;
    }

    // Best-effort: se o refresh falhar, seguimos com o último payload bom em
    // vez de parar de redirecionar.
    try {
        await cliente.refreshFeatures({ timeout: TIMEOUT_MS });
    } catch (erro) {
        captureException(erro);
    }

    return cliente;
};
