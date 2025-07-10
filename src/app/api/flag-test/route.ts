import { allowedMunicipalitiesIdFlag } from "@/features/common/shared/flags/flags";

export async function GET() {
    const isFlag = await allowedMunicipalitiesIdFlag.run({
        identify: { municipalityId: "111111X" }, // Example municipality ID
    });
    return isFlag
        ? Response.json({ message: "Hello World" })
        : Response.json({ message: "Flag not enabled" });
}
