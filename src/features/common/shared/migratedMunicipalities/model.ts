import { z } from "zod";

const ibgeCodeList = z.array(z.string().regex(/^\d{6}$/));

export const batchSchema = z.object({ municipios: ibgeCodeList });

export const waveMapSchema = z.object({
    ondas: z.array(z.unknown()),
});
