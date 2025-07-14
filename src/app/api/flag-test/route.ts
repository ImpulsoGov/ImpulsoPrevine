import { diabetesNewProgram } from "@/features/common/shared/flags/flags";

export async function GET() {
    const isFlag = await diabetesNewProgram.run({
        identify: { municipalityId: "111111" }, // Example municipality ID
    });
    return isFlag
        ? Response.json({ message: "Hello World" })
        : Response.json({ message: "Flag not enabled" });
}
