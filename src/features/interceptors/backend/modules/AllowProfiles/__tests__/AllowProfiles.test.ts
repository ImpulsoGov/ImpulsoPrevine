import type { NextRequest } from "next/server";
import { allowProfiles } from "..";
import { PROFILE_ID } from "@/types/profile";
import { AuthorizationError } from "@/features/errors/backend";
import type { Handler } from "../../common/Handler";
import { decodeToken, getEncodedSecret, getToken } from "@/utils/token";
import { userHasAnyAllowedProfile } from "../modules/UserHasAnyAllowedProfile";

jest.mock("../modules/UserHasAnyAllowedProfile", () => ({
    userHasAnyAllowedProfile: jest.fn(),
}));
jest.mock("@/utils/token", () => ({
    getToken: jest.fn(),
    getEncodedSecret: jest.fn(),
    decodeToken: jest.fn(),
}));

const allowedProfiles = [PROFILE_ID.COAPS, PROFILE_ID.userManagement];
const token = "fake.jwt.token";
const secret = "encoded-secret";
const request = {} as NextRequest;
const context: Record<string, string> = {};

const mockUserHasAnyAllowedProfile = userHasAnyAllowedProfile as jest.Mock;
const mockGetToken = getToken as jest.Mock;
const mockGetEncodedSecret = getEncodedSecret as jest.Mock;
const mockDecodeToken = decodeToken as jest.Mock;
const mockHandler: jest.MockedFunction<Handler<typeof context>> = jest.fn();

describe("allowProfiles", () => {
    it("deve permitir acesso quando o usuário possui todos os perfis permitidos", async () => {
        const userProfiles = [...allowedProfiles];
        const response = { message: "Acesso permitido" } as unknown as Response;

        mockHandler.mockResolvedValue(response);
        mockUserHasAnyAllowedProfile.mockReturnValue(true);
        mockGetToken.mockReturnValue(token);
        mockGetEncodedSecret.mockReturnValue(secret);
        mockDecodeToken.mockResolvedValue({
            payload: { perfis: userProfiles },
        });

        const interceptor = allowProfiles(allowedProfiles);
        const routeHandler = interceptor(mockHandler);

        const routeHandlerResponse = await routeHandler(request, context);

        expect(routeHandlerResponse).toEqual(response);
        expect(mockHandler).toHaveBeenCalledWith(request, context);
    });

    it("deve lançar um erro de autorização quando o usuário não possui os perfis permitidos", async () => {
        const userProfiles = [PROFILE_ID.COEQ, PROFILE_ID.impulser];

        mockHandler.mockResolvedValue({} as Response);
        mockUserHasAnyAllowedProfile.mockReturnValue(false);
        mockGetToken.mockReturnValue(token);
        mockGetEncodedSecret.mockReturnValue(secret);
        mockDecodeToken.mockResolvedValue({
            payload: { perfis: userProfiles },
        });

        const interceptor = allowProfiles(allowedProfiles);
        const routeHandler = interceptor(mockHandler);

        await expect(routeHandler(request, context)).rejects.toThrow(
            AuthorizationError
        );
        expect(mockHandler).not.toHaveBeenCalled();
    });
});
