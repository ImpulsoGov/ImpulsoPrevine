import { flag } from "flags/next";
import * as allowByUserId from "./common/allowByUserId";
import type { UserId } from "./common/allowByUserId/model";

const allowedIds = [
    "ffdb7023-fcaf-4e88-bf22-a50ab3dd2722",
    "75bbef0e-2c7c-441e-81ce-ddb32021db3f",
    "7cef18ab-5d7c-436c-bf10-8b9891b932b8",
    "3fabf432-deba-471f-8ec9-0b1cd446fb31",
    "a4a2bea5-fe36-4cab-943a-5708b234a13a",
];

export const developmentFlag = flag<boolean, UserId>({
    key: "development",
    identify: allowByUserId.identify,
    decide: allowByUserId.buildDecide(allowedIds),
});
