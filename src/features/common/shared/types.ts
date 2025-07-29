export type AreKeysNullable<TField> = {
    //{} extends Pick<T, K> checa se o campo é opcional, null extends T[K] checa se o campo é nullable
    // Esse campo é null? -> T[K] extends null
    // Esse campo aceita null? -> null extends T[K]
    [K in keyof TField]: null extends TField[K]
        ? { nullable: true }
        : { nullable: false };
};
