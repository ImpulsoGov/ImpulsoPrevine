import { decodeToken, type Payload } from "@/utils/token";
import { propertyFromHeader } from "..";

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

describe("propertyFromHeader", () => {
    const mockSecret = "my-secret";
    const mockToken = "fake.jwt.token";
    const mockMunicipio = "1234567";
    const mockProperty = "id";
    const buildHeader = (token: string): string => `Bearer ${token}`;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("deve retornar a propriedade quando o token for válido", async () => {
        const property = "municipio";
        mockedDecodeToken.mockResolvedValueOnce({
            payload: { municipio: mockMunicipio },
            protectedHeader: {
                alg: "HS256",
                typ: "JWT",
            },
        });

        const result = await propertyFromHeader(
            buildHeader(mockToken),
            mockSecret,
            property
        );

        expect(mockedDecodeToken).toHaveBeenCalledWith(
            mockToken,
            new TextEncoder().encode(mockSecret)
        );
        expect(result).toBe(mockMunicipio);
    });

    it("deve retornar undefined se o header estiver malformado (sem token)", async () => {
        const result = await propertyFromHeader(
            "Bearer",
            mockSecret,
            mockProperty
        );
        expect(result).toBeUndefined();
    });

    it("deve retornar undefined se decodeToken lançar erro", async () => {
        mockedDecodeToken.mockRejectedValueOnce(new Error("Invalid token"));

        const result = await propertyFromHeader(
            buildHeader(mockToken),
            mockSecret,
            mockProperty
        );

        expect(result).toBeUndefined();
    });

    it("deve retornar undefined se a propriedade não estiver presente no payload", async () => {
        const property = "municipio";
        mockedDecodeToken.mockResolvedValueOnce({
            payload: {},
            protectedHeader: {
                alg: "HS256",
                typ: "JWT",
            },
        });

        const result = await propertyFromHeader(
            buildHeader(mockToken),
            mockSecret,
            property
        );

        expect(result).toBeUndefined();
    });

    it("deve retornar undefined se a propriedade não for um campo do payload", async () => {
        const property = "nao existe no payload" as keyof Payload; //Compilador consegue inferir que essa propriedade não é uma chave do payload
        mockedDecodeToken.mockResolvedValueOnce({
            payload: { municipio: true },
            protectedHeader: {
                alg: "HS256",
                typ: "JWT",
            },
        });

        const result = await propertyFromHeader(
            buildHeader(mockToken),
            mockSecret,
            property
        );

        expect(result).toBeUndefined();
    });
});
