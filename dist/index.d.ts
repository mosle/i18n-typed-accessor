declare type OptionType = {
    nl2br?: boolean;
};
declare type Dict = {
    [key: string]: Dict | string | number;
};
export declare function generateAccessor<T extends {
    [key: string]: Dict;
}, S extends Dict>(injectionData: T, typeHintDictionary: S): (lang: keyof T & string, path: I18nTypeHints<typeof typeHintDictionary>, option?: OptionType) => string;
export declare function generateLockedAccessor<T extends ReturnType<typeof generateAccessor<{
    [key: Parameters<T>[0] & string]: Dict;
}, {}>>>(lang: Parameters<T>[0], accessor: T): (path: Parameters<T>[1]) => string;
declare type LevelLeaf<T extends Dict> = {
    [Key in keyof T & string]: `${Key}`;
}[keyof T & string];
declare type Level4<T extends Dict> = LevelLeaf<T>;
declare type Level3<T extends Dict> = {
    [Key in keyof T & string]: T[Key] extends Dict ? `${Key}.${Level4<T[Key]>}` : `${Key}`;
}[keyof T & string];
declare type Level2<T extends Dict> = {
    [Key in keyof T & string]: T[Key] extends Dict ? `${Key}.${Level3<T[Key]>}` : `${Key}`;
}[keyof T & string];
declare type Level1<T extends Dict> = {
    [Key in keyof T & string]: T[Key] extends Dict ? `${Key}.${Level2<T[Key]>}` : `${Key}`;
}[keyof T & string];
declare type Level0<T extends Dict> = {
    [Key in keyof T & string]: T[Key] extends Dict ? `${Key}.${Level1<T[Key]>}` : `${Key}`;
}[keyof T & string];
export declare type I18nTypeHints<T extends Dict> = {
    [Key in keyof T & string]: T[Key] extends Dict ? `${Key}.${Level0<T[Key]>}` : `${Key}`;
}[keyof T & string];
export {};
