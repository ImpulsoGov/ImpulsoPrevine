import type { NextRequest } from "next/server";
import { catchErrors } from "..";
import type { Handler } from "../../common/Handler";
import { ZodError } from "zod";
import {
    AuthenticationError,
    AuthorizationError,
} from "@/features/errors/backend";

class MockResponse {
    status: number;
    body: unknown;
    constructor(body: unknown, init: { status: number }) {
        this.body = body;
        this.status = init.status;
    }
    static json(data: unknown, init?: { status: number }): MockResponse {
        const mockResponse = new MockResponse(data, init ?? { status: 200 });
        return mockResponse;
    }
}

global.Response = MockResponse as unknown as typeof Response;

const request = {} as NextRequest;
const context: Record<string, string> = {};

const mockHandler: jest.MockedFunction<Handler<typeof context>> = jest.fn();
const consoleErrorSpy = jest
    .spyOn(console, "error")
    .mockImplementation(() => {});

describe("catchErrors", () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it("deve retornar uma resposta com status 400 quando ocorre um erro de validação no handler", async () => {
        const errorDetails = [
            {
                code: "custom" as const,
                message: "Erro de validação",
                path: [],
                input: "",
            },
        ];
        const zodError = new ZodError(errorDetails);

        mockHandler.mockRejectedValue(zodError);

        const routeHandler = catchErrors(mockHandler);

        const response = await routeHandler(request, context);

        expect(consoleErrorSpy).toHaveBeenCalledWith(zodError);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty(
            "message",
            "Erro na validação dos parâmetros da requisição"
        );
        expect(response.body).toHaveProperty("detail", errorDetails);
    });

    it("deve retornar uma resposta com status 401 quando ocorre um erro de autenticação no handler", async () => {
        const errorMessage = "Erro de autenticação";
        const authenticationError = new AuthenticationError(errorMessage);

        mockHandler.mockRejectedValue(authenticationError);

        const routeHandler = catchErrors(mockHandler);

        const response = await routeHandler(request, context);

        expect(consoleErrorSpy).toHaveBeenCalledWith(authenticationError);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message", errorMessage);
    });

    it("deve retornar uma resposta com status 403 quando ocorre um erro de autorização no handler", async () => {
        const errorMessage = "Erro de autorização";
        const authorizationError = new AuthorizationError(errorMessage);

        mockHandler.mockRejectedValue(authorizationError);

        const routeHandler = catchErrors(mockHandler);

        const response = await routeHandler(request, context);

        expect(consoleErrorSpy).toHaveBeenCalledWith(authorizationError);
        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty("message", errorMessage);
    });

    it("deve retornar uma resposta com status 500 quando ocorre um erro inesperado no handler", async () => {
        const errorMessage = "Erro inesperado";
        const unexpectedError = new Error(errorMessage);

        mockHandler.mockRejectedValue(unexpectedError);

        const routeHandler = catchErrors(mockHandler);

        const response = await routeHandler(request, context);

        expect(consoleErrorSpy).toHaveBeenCalledWith(unexpectedError);
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty(
            "message",
            "Erro ao consultar dados"
        );
        expect(response.body).toHaveProperty("detail", errorMessage);
    });

    it("deve executar o handler normalmente quando nenhum erro é lançado", async () => {
        const responseMessage = "Success";
        const response = Response.json(
            { message: responseMessage },
            { status: 200 }
        );

        mockHandler.mockResolvedValue(response);

        const routeHandler = catchErrors(mockHandler);

        const routeHandlerResponse = await routeHandler(request, context);

        expect(consoleErrorSpy).not.toHaveBeenCalled();
        expect(routeHandlerResponse.status).toBe(200);
        expect(routeHandlerResponse.body).toHaveProperty(
            "message",
            responseMessage
        );
    });
});
