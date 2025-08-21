import { decodeToken } from "@/utils/token";
import { municipalityIdSusFromHeader } from "../logic";

jest.mock("next-auth/jwt", () => ({}));
jest.mock("jose", () => ({}));
jest.mock("@/utils/token", () => ({
    getToken: jest.fn().mockReturnValue("mocked-token"),
    getEncodedSecret: jest
        .fn()
        .mockReturnValue(new TextEncoder().encode("mocked-secret")),
    decodeToken: jest.fn(),
}));

const mockedDecodeToken = decodeToken as jest.Mock;

describe("municipalityIdSusFromHeader", () => {
    const mockSecret = "my-secret";
    const mockToken = "fake.jwt.token";
    const mockMunicipio = "1234567";

    const buildHeader = (token: string): string => `Bearer ${token}`;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("deve retornar o município quando o token for válido", async () => {
        mockedDecodeToken.mockResolvedValueOnce({
            payload: { municipio: mockMunicipio },
            protectedHeader: {
                alg: "HS256",
                typ: "JWT",
            },
        });

        const result = await municipalityIdSusFromHeader(
            buildHeader(mockToken),
            mockSecret
        );

        expect(mockedDecodeToken).toHaveBeenCalledWith(
            mockToken,
            new TextEncoder().encode(mockSecret)
        );
        expect(result).toBe(mockMunicipio);
    });

    it("deve retornar undefined se o header estiver malformado (sem token)", async () => {
        const result = await municipalityIdSusFromHeader("Bearer", mockSecret);
        expect(result).toBeUndefined();
    });

    it("deve retornar undefined se decodeToken lançar erro", async () => {
        mockedDecodeToken.mockRejectedValueOnce(new Error("Invalid token"));

        const result = await municipalityIdSusFromHeader(
            buildHeader(mockToken),
            mockSecret
        );

        expect(result).toBeUndefined();
    });

    it("deve retornar undefined se municipio não estiver presente no payload", async () => {
        mockedDecodeToken.mockResolvedValueOnce({
            payload: {},
            protectedHeader: {
                alg: "HS256",
                typ: "JWT",
            },
        });

        const result = await municipalityIdSusFromHeader(
            buildHeader(mockToken),
            mockSecret
        );

        expect(result).toBeUndefined();
    });

    it("deve retornar undefined se municipio não for uma string", async () => {
        mockedDecodeToken.mockResolvedValueOnce({
            payload: { municipio: true },
            protectedHeader: {
                alg: "HS256",
                typ: "JWT",
            },
        });

        const result = await municipalityIdSusFromHeader(
            buildHeader(mockToken),
            mockSecret
        );

        expect(result).toBeUndefined();
    });
});
