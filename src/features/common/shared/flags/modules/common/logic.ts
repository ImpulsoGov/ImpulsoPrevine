type DecideFn<TEntity> = (decideParams: { entities?: TEntity }) => boolean;
//TODO: adicionar testes de unidade e mover para um lugar mais adequado
export const buildDecide = <TEntity>(
    allowList: Array<TEntity>
): DecideFn<TEntity> => {
    return ({ entities }: { entities?: TEntity }): boolean => {
        return entities !== undefined && allowList.includes(entities);
    };
};
