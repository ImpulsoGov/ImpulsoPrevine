import { diabetesNewProgram } from "@/features/common/shared/flags/flags";

export async function GET() {
    const isFlag = await diabetesNewProgram();
    return isFlag
        ? Response.json({ message: "Hello World" })
        : Response.json({ message: "Flag not enabled" });
}
