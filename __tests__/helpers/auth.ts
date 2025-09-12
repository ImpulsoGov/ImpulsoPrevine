import { PROFILE_ID } from "@/types/profile";
import type { JWTToken } from "@/utils/token";
import { jest } from "@jest/globals";

export const mockDecodeToken = (): jest.Mock<() => Promise<JWTToken>> => {
    const mockedDecodeToken = jest.fn<() => Promise<JWTToken>>();

    jest.doMock("@/utils/token", () => {
        return {
            ...jest.requireActual<typeof import("@/utils/token")>(
                "@/utils/token"
            ),
            decodeToken: mockedDecodeToken,
        };
    });

    return mockedDecodeToken;
};

export const decodedToken = (
    payloadOverrides: Partial<JWTToken["payload"]>
): JWTToken => {
    return {
        payload: {
            id: "123",
            sub: "some_sub",
            perfis: [PROFILE_ID.impulser],
            equipe: "equipe",
            municipio: "111111",
            ...payloadOverrides,
        },
        protectedHeader: { alg: "" },
    };
};
