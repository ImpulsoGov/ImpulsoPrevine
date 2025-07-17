import type { NextRequest } from "next/server";
import { allowProfiles } from "..";
import { PROFILE_ID } from "@/types/profile";
import { AuthorizationError } from "@/features/errors/backend";
import type { Handler } from "../../common/Handler";
import { decodeToken, getEncodedSecret, getToken } from "@/utils/token";

jest.mock("@/utils/token", () => ({
    getToken: jest.fn(),
    getEncodedSecret: jest.fn(),
    decodeToken: jest.fn(),
}));

const allowedProfiles = [PROFILE_ID.COAPS, PROFILE_ID.userManagement];
const notAllowedProfiles = [PROFILE_ID.COEQ, PROFILE_ID.impulser];
const tokenPayload = { perfis: allowedProfiles };
const token = "fake.jwt.token";
const secret = "encoded-secret";
const request = {} as NextRequest;
const context: Record<string, string> = {};

const mockGetToken = getToken as jest.Mock;
const mockGetEncodedSecret = getEncodedSecret as jest.Mock;
const mockDecodeToken = decodeToken as jest.Mock;
const mockHandler: jest.MockedFunction<Handler<typeof context>> = jest.fn();

describe("allowProfiles", () => {
    it("deve permitir acesso a usuários que possuem os perfis permitidos", async () => {
        const response = { message: "Acesso permitido" } as unknown as Response;

        mockHandler.mockResolvedValue(response);
        mockGetToken.mockReturnValue(token);
        mockGetEncodedSecret.mockReturnValue(secret);
        mockDecodeToken.mockResolvedValue({ payload: tokenPayload });

        const interceptor = allowProfiles(allowedProfiles);
        const routeHandler = interceptor(mockHandler);

        const routeHandlerResponse = await routeHandler(request, context);

        expect(routeHandlerResponse).toEqual(response);
        expect(mockHandler).toHaveBeenCalledWith(request, context);
    });

    it("deve lançar um erro de autorização quando o usuário não possue os perfis permitidos", async () => {
        mockHandler.mockResolvedValue({} as Response);
        mockGetToken.mockReturnValue(token);
        mockGetEncodedSecret.mockReturnValue(secret);
        mockDecodeToken.mockResolvedValue({ payload: tokenPayload });

        const interceptor = allowProfiles(notAllowedProfiles);
        const routeHandler = interceptor(mockHandler);

        await expect(routeHandler(request, context)).rejects.toThrow(
            AuthorizationError
        );
        expect(mockHandler).not.toHaveBeenCalled();
    });
});
