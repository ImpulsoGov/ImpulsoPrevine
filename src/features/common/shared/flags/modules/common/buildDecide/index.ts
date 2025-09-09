type DecideFn<TEntity> = (decideParams: { entities?: TEntity }) => boolean;
export const buildDecide = <TEntity>(
    allowList: Array<TEntity>
): DecideFn<TEntity> => {
    return ({ entities }: { entities?: TEntity }): boolean => {
        return entities !== undefined && allowList.includes(entities);
    };
};
