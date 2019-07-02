import React from "react";
import * as CSS from "csstype";
interface Props {
    backgroundColor?: CSS.BackgroundColorProperty;
    hoverBackgroundColor?: CSS.BackgroundColorProperty;
    children?: React.ReactNode;
    className?: string;
    disabled?: boolean;
    disabledBackgroundColor?: CSS.BackgroundColorProperty;
    disabledTextColor?: CSS.BackgroundColorProperty;
    fab?: boolean;
    forceActiveState?: boolean;
    forceFocusState?: boolean;
    forceHoverState?: boolean;
    hidden?: boolean;
    hiddenActiveBackgroundColor?: CSS.BackgroundColorProperty;
    hiddenFocusedColor?: CSS.ColorProperty;
    icon?: React.ReactElement;
    size?: "default" | "small" | "large";
    style?: React.CSSProperties;
}
export declare const Button: React.FC<Props>;
export {};
