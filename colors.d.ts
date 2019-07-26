export interface MonochromePalette {
    darker: string;
    dark: string;
    base: string;
    light: string;
    lighter: string;
}
export interface ColorPalette extends MonochromePalette {
    darkest: string;
    lightest: string;
}
export declare const pink: ColorPalette;
export declare const teal: ColorPalette;
export declare const indigo: ColorPalette;
export declare const black: MonochromePalette;
export declare const grey: MonochromePalette;
export declare const silver: MonochromePalette;
export declare const red: ColorPalette;
export declare const green: ColorPalette;
export declare const blue: ColorPalette;
export declare const orange: ColorPalette;
export declare const yellow: ColorPalette;
export declare const purple: ColorPalette;
export declare const blilet: ColorPalette;
export declare const white = "#ffffff";
