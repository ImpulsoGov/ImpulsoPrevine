import { PROFILE_ID } from "@/types/profile";
import type { JWTToken } from "@/utils/token";
import { jest } from "@jest/globals";
import merge from "lodash.merge";
import type { DeepPartial } from "./types";

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

export const decodedToken = (overrides: DeepPartial<JWTToken>): JWTToken => {
    const defaultToken = {
        payload: {
            id: "123",
            sub: "some_sub",
            perfis: [PROFILE_ID.impulser],
            equipe: "equipe",
            municipio: "111111",
        },
        protectedHeader: { alg: "" },
    };
    const merged = merge(defaultToken, overrides);

    return merged;
};
