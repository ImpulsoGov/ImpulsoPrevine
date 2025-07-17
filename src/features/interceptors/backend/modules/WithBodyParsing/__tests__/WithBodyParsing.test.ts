import type { Handler } from "../../common/Handler";
import type { NextRequest } from "next/server";
import type { ZodType } from "zod/v4";
import { withBodyParsing } from "..";

const mockSchemaParse = jest.fn();
const mockRequestJson = jest.fn();
const mockHandler: jest.MockedFunction<Handler<unknown>> = jest.fn();

const request = {
    json: mockRequestJson,
} as unknown as NextRequest;

describe("withBodyParsing", () => {
    it("deve adicionar o conteúdo do body ao contexto passado ao handler", async () => {
        const body = { key: "value" };
        const parsedBody = { parsedKey: "parsedValue" };
        const schema = {
            parse: mockSchemaParse.mockReturnValue(parsedBody),
        } as unknown as ZodType;
        const response = { message: "Success" } as unknown as Response;
        const initialContext = {
            parsedBody: {} as unknown as ZodType,
            params: {},
        };
        const finalContext = {
            parsedBody,
            params: {},
        };

        mockRequestJson.mockResolvedValue(body);
        mockHandler.mockResolvedValue(response);

        const interceptor = withBodyParsing(schema);
        const routeHandler = interceptor(mockHandler);
        const routeHandlerResponse = await routeHandler(
            request,
            initialContext
        );

        expect(mockRequestJson).toHaveBeenCalled();
        expect(mockSchemaParse).toHaveBeenCalledWith(body);
        expect(mockHandler).toHaveBeenCalledWith(request, finalContext);
        expect(routeHandlerResponse).toEqual(response);
    });
});
