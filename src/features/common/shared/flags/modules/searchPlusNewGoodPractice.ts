import { flag } from "flags/next";
import * as allowByUserId from "./common/allowByUserId";

const allowedUsersIds = [
    //time interno
    "ffdb7023-fcaf-4e88-bf22-a50ab3dd2722",
    "0ae5c4dd-16d3-48dd-81c2-ca4198674574",
    "75bbef0e-2c7c-441e-81ce-ddb32021db3f",
    "7cef18ab-5d7c-436c-bf10-8b9891b932b8",
    "3fabf432-deba-471f-8ec9-0b1cd446fb31",
    "c806dadf-e374-4422-a339-7635528fa2b4",
    "89921c52-a9d5-4a92-ab66-12d44c7817f0",
    "93fdf574-4c52-4392-a319-d3e1f3e40c52",
];

export const searchPlusNewGoodPractice = flag<boolean, allowByUserId.UserId>({
    key: "searchPlusNewGoodPractice",
    identify: allowByUserId.identify,
    decide: allowByUserId.buildDecide(allowedUsersIds),
});
