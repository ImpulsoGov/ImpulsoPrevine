import { withUser } from "..";
import type { NextRequest } from "next/server";
import { getToken, decodeToken, getEncodedSecret } from "@/utils/token";
import type { Handler } from "../../common/Handler";

jest.mock("jose", () => {});
jest.mock("@/utils/token");

describe("withUser", () => {
    const mockHandler = jest.fn((_req, ctx) => {
        return new Promise((resolve) => {
            resolve({
                context: JSON.stringify(ctx),
                status: 200,
            } as unknown as Response);
        });
    }) as jest.MockedFunction<Handler<unknown>>;

    const mockRequest = {
        headers: {
            get: jest.fn().mockReturnValue("Bearer fake.token.value"),
        },
    } as unknown as NextRequest;

    const mockToken = "fake.jwt.token";
    const mockSecret = "encoded-secret";

    const mockDecodedPayload = {
        municipio: "123456",
        equipe: "INE001",
        perfis: [1, 2, 3],
    };

    beforeEach(() => {
        jest.clearAllMocks();

        (getToken as jest.Mock).mockReturnValue(mockToken);
        (getEncodedSecret as jest.Mock).mockReturnValue(mockSecret);
        (decodeToken as jest.Mock).mockResolvedValue({
            payload: mockDecodedPayload,
        });
    });

    it("retorna handler quando token é decodificado com sucesso", async () => {
        const wrapped = withUser(mockHandler);

        const context = {
            user: {
                municipalitySusId: "",
                teamIne: "",
                profiles: [],
            },
        };
        const response = await wrapped(mockRequest, context);

        expect(getToken).toHaveBeenCalledWith(mockRequest.headers);
        expect(getEncodedSecret).toHaveBeenCalled();
        expect(decodeToken).toHaveBeenCalledWith(mockToken, mockSecret);

        expect(mockHandler).toHaveBeenCalledWith(mockRequest, {
            user: {
                municipalitySusId: "123456",
                teamIne: "INE001",
                profiles: [1, 2, 3],
            },
        });

        expect(response).toEqual({
            context: JSON.stringify({
                user: {
                    municipalitySusId: "123456",
                    teamIne: "INE001",
                    profiles: [1, 2, 3],
                },
            }),
            status: 200,
        });
    });

    it("deve levantar erro se token invalido", async () => {
        (decodeToken as jest.Mock).mockRejectedValue(
            new Error("Invalid token")
        );

        const wrapped = withUser(mockHandler);
        const context = {
            user: {
                municipalitySusId: mockDecodedPayload.municipio,
                teamIne: mockDecodedPayload.equipe,
                profiles: mockDecodedPayload.perfis,
            },
        };

        await expect(wrapped(mockRequest, context)).rejects.toThrow(
            "Invalid token"
        );
    });
});
