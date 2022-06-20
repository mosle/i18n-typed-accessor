import { getProperty } from "dot-prop";
export function generateAccessor(injectionData, typeHintDictionary) {
    return (lang, path, option) => {
        const value = getProperty(injectionData[lang], path, `(NO TRANSLATE KEY)[${path}]`);
        if (typeof value === "string" || typeof value === "number")
            return option?.nl2br ? value.toString().replace(/\r?\n/g, "<br />") : value.toString();
        return value.toString();
    };
}
export function generateLockedAccessor(lang, accessor) {
    return (path) => accessor(lang, path);
}
