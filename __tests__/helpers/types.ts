export type DeepPartial<TObject extends object> = {
    [Key in keyof TObject]?: TObject[Key] extends object
        ? DeepPartial<TObject[Key]>
        : TObject[Key];
};
