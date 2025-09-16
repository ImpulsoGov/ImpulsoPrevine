/**
 * @jest-environment node
 */
import { NextRequest } from "next/server";
import type { RequestInit } from "next/dist/server/web/spec-extension/request";
import merge from "lodash.merge";

//TODO: Suportar SearchParams
export const request = (
    url: string,
    method: string,
    overrides?: Partial<RequestInit>
): NextRequest => {
    const init = {
        method,
        headers: {
            authorization: "Bearer some-token",
            "Content-Type": "application/json",
        },
    };
    const merged = merge(init, overrides);
    return new NextRequest(url, merged);
};
