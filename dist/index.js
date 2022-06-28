import { getProperty } from "dot-prop";
export function generateAccessor(injectionData, typeHintDictionary, placeholder = /\{([0-9]+)\}/g) {
    return (lang, path, option) => {
        const value = getProperty(injectionData[lang], path, `(NO TRANSLATE KEY)[${path}]`);
        const returnString = value.toString();
        const filled = returnString.replace(placeholder, (_, group) => {
            const index = Number(group);
            return option?.variables?.[index] ?? "[N/A]".toString();
        });
        return option?.nl2br ? filled.replace(/\r?\n/g, "<br />") : filled;
    };
}
export function generateLockedAccessor(lang, accessor) {
    return (path, option) => accessor(lang, path, option);
}
