import { type Payload, decodeToken } from "@/utils/token";
import type { PayloadProperty } from "../../../flags/modules/common/model";

export const propertyFromHeader = async (
    authHeader: string,
    secret: string,
    propertyName: keyof Payload //todas as chaves de payload são strings
): Promise<PayloadProperty | undefined> => {
    const tokenHeader = authHeader.split(" ")[1];
    if (!tokenHeader) {
        return undefined;
    }
    try {
        const secretUint8 = new TextEncoder().encode(secret);
        const decodedToken = await decodeToken(tokenHeader, secretUint8);
        const payload = decodedToken.payload as Payload;
        if (propertyName in payload) {
            return payload[propertyName];
        }
        return undefined;
    } catch (_error) {
        return undefined;
    }
};
