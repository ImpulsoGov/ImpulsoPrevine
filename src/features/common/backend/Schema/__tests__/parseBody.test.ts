/**
 * @jest-environment node
 */

import type { z } from "zod/v4";
import { parseBody } from "..";
import * as httpHelpers from "@tests/helpers/http";

const url = "http://localhost:3000/endpoint";

describe("parseBody", () => {
    it("Deve retornar o body parseado se o parse for um sucesso", async () => {
        const body = { key: "value" };
        const request = httpHelpers.request(url, "POST", {
            body: JSON.stringify(body),
        });
        const schema = {
            parse: jest.fn().mockReturnValue({ ...body }),
        } as unknown as z.ZodType;
        const parsedBody = await parseBody(request, schema);

        expect(parsedBody).toEqual(body);
    });

    it("Deve lançar erro se o parse falhar", async () => {
        const errorMessage = "Body inválido";
        const request = httpHelpers.request(url, "POST", {
            body: JSON.stringify({}),
        });
        const schema = {
            parse: jest.fn(() => {
                throw new Error(errorMessage);
            }),
        } as unknown as z.ZodType;

        await expect(parseBody(request, schema)).rejects.toThrow(errorMessage);
    });
});
