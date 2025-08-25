import type { Payload } from "@/utils/token";
import { propertyFromHeader } from "../../../auth";
import type { PayloadProperty } from "./model";

export const safePropertyFromHeader = async (
    authHeader: string,
    secret: string,
    property: keyof Payload
): Promise<PayloadProperty | undefined> => {
    try {
        return (
            (await propertyFromHeader(authHeader, secret, property)) ??
            undefined
        );
    } catch (_error) {
        return undefined;
    }
};
