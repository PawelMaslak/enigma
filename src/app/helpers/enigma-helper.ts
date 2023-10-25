export default class EnigmaHelper {
    public static getAlphabetArray(): string[] {
        return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    }

    public static getQwertzKeyboardLayout(): string[] {
        return 'QWERTZUIOASDFGHJKPYXCVBNML'.split('');
    }

    public static getFirstRowQwertzKeyboardLayout(): string[] {
        return this.getQwertzKeyboardLayout().slice(0, 9);
    }

    public static getSecondRowQwertzKeyboardLayout(): string[] {
        return this.getQwertzKeyboardLayout().slice(9, 17);
    }

    public static getThirdRowQwertzKeyboardLayout(): string[] {
        return this.getQwertzKeyboardLayout().slice(17, 26);
    }


    public static getRingSettingsNumberArray(): number[] {
        return Array.from({ length: 26 }, (_, i) => i + 1);
    }

    public static getInternalWiringArray(internalWiring: string): string[] {
        return internalWiring.split("");
    }
}