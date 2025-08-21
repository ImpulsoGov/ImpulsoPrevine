import { decode } from "next-auth/jwt";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { propertyFromCookie } from "../logic";

jest.mock("next-auth/jwt", () => ({
    decode: jest.fn(),
}));
jest.mock("jose", () => ({}));
jest.mock("@/utils/token", () => ({
    getToken: jest.fn().mockReturnValue("mocked-token"),
    getEncodedSecret: jest
        .fn()
        .mockReturnValue(new TextEncoder().encode("mocked-secret")),
}));

const mockDecode = decode as jest.MockedFunction<typeof decode>;

describe("municipalityIdSusFromCookie", () => {
    const secret = "test-secret";

    const mockCookies = (cookieValue?: string): ReadonlyRequestCookies => {
        return {
            get: (_name: string) => {
                return cookieValue ? { value: cookieValue } : undefined;
            },
        } as unknown as ReadonlyRequestCookies;
    };

    afterEach(() => {
        jest.clearAllMocks();
        delete process.env.ENV;
    });

    it("retorna undefined quando cookies é undefined", async () => {
        const result = await propertyFromCookie(undefined, secret);
        expect(result).toBeUndefined();
    });

    it("retorna undefined quando token não está presente", async () => {
        const result = await propertyFromCookie(mockCookies(undefined), secret);
        expect(result).toBeUndefined();
    });

    it("retorna undefined quando decode retorna undefined", async () => {
        mockDecode.mockResolvedValueOnce(null);
        const result = await propertyFromCookie(
            mockCookies("fake-token"),
            secret
        );
        expect(result).toBeUndefined();
        expect(mockDecode).toHaveBeenCalledWith({
            token: "fake-token",
            secret: secret,
        });
    });

    it("retorna municipio_id_sus quando decode retorna token válido", async () => {
        const mockMunicipioId = "123456";
        mockDecode.mockResolvedValueOnce({
            user: {
                municipio_id_sus: mockMunicipioId,
            },
        });

        const result = await propertyFromCookie(
            mockCookies("valid-token"),
            secret
        );
        expect(result).toBe(mockMunicipioId);
    });

    it("usa o cookie correto baseado na ENV", async () => {
        const mockMunicipioId = "654321";
        mockDecode.mockResolvedValueOnce({
            user: { municipio_id_sus: mockMunicipioId },
        });

        // development
        process.env.ENV = "development";
        const resultDev = await propertyFromCookie(
            mockCookies("dev-token"),
            secret
        );
        expect(mockDecode).toHaveBeenCalledWith({
            token: "dev-token",
            secret: secret,
        });

        // production
        process.env.ENV = "production";
        mockDecode.mockResolvedValueOnce({
            user: { municipio_id_sus: mockMunicipioId },
        });
        const resultProd = await propertyFromCookie(
            mockCookies("prod-token"),
            secret
        );
        expect(mockDecode).toHaveBeenCalledWith({
            token: "prod-token",
            secret: secret,
        });

        expect(resultDev).toBe(mockMunicipioId);
        expect(resultProd).toBe(mockMunicipioId);
    });
});
