import { captureException, captureMessage } from "@sentry/nextjs";
import { getClient } from "./growthbook";
import { batchSchema, waveMapSchema } from "./model";

const FEATURE = "ondas-de-lancamento";

const NONE: ReadonlySet<string> = new Set();

const loadMigratedMunicipalities = async (): Promise<ReadonlySet<string>> => {
    const client = await getClient();
    if (!client) return NONE;

    let evaluation: { value: unknown; source: string };
    try {
        evaluation = client.evalFeature<unknown>(FEATURE, {});
    } catch (error) {
        captureException(error);
        return NONE;
    }

    const { value, source } = evaluation;
    if (source === "unknownFeature") {
        captureMessage(
            `growthbook: feature ${FEATURE} não encontrada — ninguém será redirecionado ao Portal`,
            "error"
        );
        return NONE;
    }

    const waveMap = waveMapSchema.safeParse(value);
    if (!waveMap.success) {
        captureMessage(
            `growthbook: mapa de ondas inválido — corrija a feature ${FEATURE}`,
            "error"
        );
        return NONE;
    }

    const migrated = new Set<string>();
    for (const raw of waveMap.data.ondas) {
        const batch = batchSchema.safeParse(raw);
        if (!batch.success) {
            captureMessage(
                `growthbook: lote inválido no mapa de ondas — descartado (${JSON.stringify(raw)})`,
                "error"
            );
            continue;
        }
        for (const code of batch.data.municipios) migrated.add(code);
    }

    return migrated;
};

export const isMigratedMunicipality = async (
    municipalityIdSus: string | undefined
): Promise<boolean> => {
    if (!municipalityIdSus) return false;
    return (await loadMigratedMunicipalities()).has(municipalityIdSus);
};
