import { getProperty } from "dot-prop";

type OptionType = {
  nl2br?: boolean;
};

type Dict = { [key: string]: Dict | string | number };

export function generateAccessor<T extends { [key: string]: Dict }, S extends Dict>(injectionData: T, typeHintDictionary: S) {
  return (lang: keyof T & string, path: I18nTypeHints<typeof typeHintDictionary>, option?: OptionType): string => {
    const value = getProperty(injectionData[lang], path, `(NO TRANSLATE KEY)[${path}]`);
    if (typeof value === "string" || typeof value === "number") return option?.nl2br ? value.toString().replace(/\r?\n/g, "<br />") : value.toString();
    return (value as any).toString();
  };
}



export function generateLockedAccessor<T extends ReturnType<typeof generateAccessor<{[key:Parameters<T>[0] & string]:Dict},{}>>>(lang:Parameters<T>[0], accessor: T) {
  return (path: Parameters<T>[1]) => accessor(lang, path);
}



//limited depth level for performance
type LevelLeaf<T extends Dict> = {
  [Key in keyof T & string]: `${Key}`;
}[keyof T & string];

type Level4<T extends Dict> = LevelLeaf<T>;

type Level3<T extends Dict> = {
  [Key in keyof T & string]: T[Key] extends Dict ? `${Key}.${Level4<T[Key]>}` : `${Key}`;
}[keyof T & string];

type Level2<T extends Dict> = {
  [Key in keyof T & string]: T[Key] extends Dict ? `${Key}.${Level3<T[Key]>}` : `${Key}`;
}[keyof T & string];

type Level1<T extends Dict> = {
  [Key in keyof T & string]: T[Key] extends Dict ? `${Key}.${Level2<T[Key]>}` : `${Key}`;
}[keyof T & string];

type Level0<T extends Dict> = {
  [Key in keyof T & string]: T[Key] extends Dict ? `${Key}.${Level1<T[Key]>}` : `${Key}`;
}[keyof T & string];

export type I18nTypeHints<T extends Dict> = {
  [Key in keyof T & string]: T[Key] extends Dict ? `${Key}.${Level0<T[Key]>}` : `${Key}`;
}[keyof T & string];
