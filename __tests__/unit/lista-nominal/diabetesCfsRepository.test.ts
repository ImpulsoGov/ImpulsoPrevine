import type { DatabaseClient } from '../../../database/databaseClient';
import { DiabetesCsfRepository } from '@/repositories/diabetesCfsRepository';
import type { DiabetesCsfItem } from '@/repositories/diabetesCfsRepository';

const createMockDatabaseClient = (): jest.Mocked<DatabaseClient> => ({
    query: jest.fn(),
});

describe('Repository', () => {
    const mockDbClient = createMockDatabaseClient();
    const mockRepository = new DiabetesCsfRepository(mockDbClient);
    it('Should return an item by municipality', async () => {
        const diabetesItem: DiabetesCsfItem = {
            name: 'Johnny',
            lastExamDueAt: '12/12/2022',
            // biome-ignore lint/style/useNamingConvention: CPF
            CPF: '1234567891011',
            municipality: 'Rio de Janeiro'
        };
        mockDbClient.query.mockResolvedValueOnce(diabetesItem);
        const item = await mockRepository.findByMunicipality('Rio de Janeiro');
        // Verifica se o item retornado é o item mockado e como foi a chamada 
        expect(item).toEqual(diabetesItem);
        expect(mockDbClient.query).toHaveBeenCalledWith(
            'SELECT * FROM tabela WHERE municipio = $1',
            ['Rio de Janeiro']
        );
    })
});