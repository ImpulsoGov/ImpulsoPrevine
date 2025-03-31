import type { DatabaseClient } from "../../database/databaseClient";
export type DiabetesCsfItem = {
    name: string,
    lastExamDueAt: string,
    // biome-ignore lint/style/useNamingConvention: CPF
    CPF: string,
    municipality: string
}
export class DiabetesCsfRepository {
    constructor(private readonly dbClient: DatabaseClient) { }
    async findByMunicipality(municipality: string): Promise<DiabetesCsfItem | null> {
        const result = await this.dbClient.query<DiabetesCsfItem>('SELECT * FROM tabela WHERE municipio = $1', [municipality]);
        return result ? result : null;
    }
}