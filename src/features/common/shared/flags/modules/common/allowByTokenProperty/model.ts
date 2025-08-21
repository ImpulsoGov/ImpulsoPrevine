import type { Payload } from "@/utils/token";
import type { CookieToken } from "../model";

export type MunicipalityIdSus = string | undefined;

export type UserProperty = CookieToken["user"][keyof CookieToken["user"]];

export type PayloadProperty = Payload[keyof Payload];
