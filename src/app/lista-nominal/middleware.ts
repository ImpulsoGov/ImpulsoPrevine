// import { NextResponse } from "next/server";
// import { allowedMunicipalitiesIdFlag } from "./flags";
// import { precomputeFlags } from "./flags";
// import { getPrecomputed, precompute } from "flags/next";

// export const allowByMunicipality = async (
//     municipalityId: string | undefined = undefined
// ): Promise<NextResponse | undefined> => {
//     console.log("allowByMunicipality", municipalityId);
//     const allowedMunicipalitiesId = await precompute(precomputeFlags);
//     // const allowedMunicipalitiesId = await allowedMunicipalitiesIdFlag();
//     console.log("allowedMunicipalitiesId", allowedMunicipalitiesId);
//     // if (!allowedMunicipalitiesId.includes(municipalityId || "")) {
//     //     return NextResponse.json(
//     //         { error: "Página não encontrada" },
//     //         { status: 404 }
//     //     );
//     // }
//     return NextResponse.json(
//         { error: "Página não encontrada" },
//         { status: 404 }
//     );
// };
