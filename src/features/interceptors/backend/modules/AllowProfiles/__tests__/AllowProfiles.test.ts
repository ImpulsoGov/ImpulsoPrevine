import type { NextRequest } from "next/server";
import { allowProfiles } from "..";
import { PROFILE_ID } from "@/types/profile";
import { AuthorizationError } from "@/features/errors/backend";

const allowedProfiles = [PROFILE_ID.COAPS, PROFILE_ID.userManagement];
const notAllowedProfiles = [PROFILE_ID.COEQ, PROFILE_ID.impulser];

jest.mock("@/utils/token", () => ({
    getToken: jest.fn().mockReturnValue("mocked-token"),
    getEncodedSecret: jest
        .fn()
        .mockReturnValue(new TextEncoder().encode("mocked-secret")),
    decodeToken: jest.fn().mockResolvedValue({
        payload: {
            perfis: [8, 2],
        },
    }),
}));

describe("allowProfiles", () => {
    it("deve permitir acesso a usuários que possuen os perfis permitidos", async () => {
        const response = { message: "Acesso permitido" };
        const context = {};
        const request = {} as NextRequest;
        const handler = jest.fn().mockResolvedValue(response);
        const interceptor = allowProfiles(allowedProfiles);
        const routeHandler = interceptor(handler);

        const routeHandlerResponse = await routeHandler(request, context);

        expect(routeHandlerResponse).toEqual(response);
        expect(handler).toHaveBeenCalledWith(request, context);
    });

    it("deve negar acesso a usuários que não possuen os perfis permitidos", async () => {
        const context = {};
        const request = {} as NextRequest;
        const handler = jest.fn();
        const interceptor = allowProfiles(notAllowedProfiles);
        const routeHandler = interceptor(handler);

        await expect(routeHandler(request, context)).rejects.toThrow(
            AuthorizationError
        );
        expect(handler).not.toHaveBeenCalled();
    });
});
