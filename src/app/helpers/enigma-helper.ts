export default class EnigmaHelper {
    public static getAlphabetArray(): string[] {
        return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    }

    public static getRingSettingsNumberArray(): number[] {
        return Array.from({ length: 26 }, (_, i) => i + 1);
    }

    public static getInternalWiringArray(internalWiring: string): string[] {
        return internalWiring.split("");
    }
}