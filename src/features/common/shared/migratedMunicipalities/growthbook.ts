import { GrowthBookClient } from "@growthbook/growthbook";
import { captureException, captureMessage } from "@sentry/nextjs";

const API_HOST = "https://cdn.growthbook.io";
const TIMEOUT_MS = 1500;
const RETRY_COOLDOWN_MS = 30_000;

let client: GrowthBookClient | undefined;
let initialization: Promise<boolean> | undefined;
let blockedUntil = 0;

const block = (): void => {
    initialization = undefined;
    blockedUntil = Date.now() + RETRY_COOLDOWN_MS;
};

const initialize = async (instance: GrowthBookClient): Promise<boolean> => {
    const response = await instance.init({
        timeout: TIMEOUT_MS,
        streaming: false,
    });
    if (!response.success)
        captureException(
            response.error ?? new Error("growthbook: init não teve sucesso")
        );
    return response.success;
};

export const getClient = async (): Promise<GrowthBookClient | undefined> => {
    if (Date.now() < blockedUntil) return undefined;

    const clientKey = process.env.GROWTHBOOK_CLIENT_KEY;
    if (!clientKey) {
        captureMessage(
            "growthbook: GROWTHBOOK_CLIENT_KEY ausente — ninguém será redirecionado ao Portal",
            "error"
        );
        block();
        return undefined;
    }

    client ??= new GrowthBookClient({ apiHost: API_HOST, clientKey });
    initialization ??= initialize(client);

    try {
        if (!(await initialization)) {
            block();
            return undefined;
        }
    } catch (error) {
        captureException(error);
        block();
        return undefined;
    }

    try {
        await client.refreshFeatures({ timeout: TIMEOUT_MS });
    } catch (error) {
        captureException(error);
    }

    return client;
};
