import { type Payload, decodeToken } from "@/utils/token";
import type { PayloadProperty } from "@features/common/shared/flags/modules/common/model";

export const propertyFromHeader = async (
    authHeader: string,
    secret: string,
    propertyName: keyof Payload
): Promise<PayloadProperty | null> => {
    const tokenHeader = authHeader.split(" ")[1];
    if (!tokenHeader) {
        return null;
    }
    const secretUint8 = new TextEncoder().encode(secret);
    const decodedToken = await decodeToken(tokenHeader, secretUint8);
    const payload = decodedToken.payload as Payload;
    if (propertyName in payload) {
        return payload[propertyName];
    }
    return null;
};
