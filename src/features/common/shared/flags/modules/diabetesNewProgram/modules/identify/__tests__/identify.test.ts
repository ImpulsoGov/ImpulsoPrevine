import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { identify } from "..";
import {
    municipalityIdSusFromHeader,
    municipalityIdSusFromCookie,
} from "../../getMunicipalityIdSus/getMunicipalityIdSus";

// Mock das funções usadas internamente
jest.mock("../../getMunicipalityIdSus/getMunicipalityIdSus");
jest.mock("next-auth/jwt", () => ({}));
jest.mock("jose", () => ({}));

const mockHeader = municipalityIdSusFromHeader as jest.MockedFunction<
    typeof municipalityIdSusFromHeader
>;
const mockCookie = municipalityIdSusFromCookie as jest.MockedFunction<
    typeof municipalityIdSusFromCookie
>;

describe("identify", () => {
    const mockCookies = { get: jest.fn() } as unknown as ReadonlyRequestCookies;

    beforeEach(() => {
        jest.clearAllMocks();
        process.env.NEXTAUTH_SECRET = "fake-secret";
    });

    it("chama municipalityIdSusFromHeader quando o header 'authorization' está presente", async () => {
        const authToken = "Bearer token";
        const expectedMunicipality = "123456";

        const headers = new Headers({ authorization: authToken });
        mockHeader.mockResolvedValue(expectedMunicipality);

        const result = await identify({ headers, cookies: mockCookies });

        expect(mockHeader).toHaveBeenCalledWith(authToken, "fake-secret");
        expect(mockCookie).not.toHaveBeenCalled();
        expect(result).toBe(expectedMunicipality);
    });

    it("chama municipalityIdSusFromCookie quando o header 'authorization' está ausente", async () => {
        const expectedMunicipality = "654321";

        const headers = new Headers(); // sem authorization
        mockCookie.mockResolvedValue(expectedMunicipality);

        const result = await identify({ headers, cookies: mockCookies });

        expect(mockCookie).toHaveBeenCalledWith(mockCookies, "fake-secret");
        expect(mockHeader).not.toHaveBeenCalled();
        expect(result).toBe(expectedMunicipality);
    });
});
