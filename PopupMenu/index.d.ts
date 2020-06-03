import React from "react";
import { AbstractTooltip } from "../AbstractTooltip";
import { Menu } from "../Menu";
interface Props extends Pick<React.ComponentProps<typeof AbstractTooltip>, "children" | "content" | "maxWidth" | "placement" | "trigger" | "fallbackPlacements" | "popperOptions">, Omit<React.ComponentProps<typeof Menu>, "children"> {
    /**
     * `className` to apply to the
     * [`tippyjs-react`](https://github.com/atomiks/tippyjs-react) tooltip. @see
     * https://github.com/atomiks/tippyjs-react#classname-string
     */
    className?: string;
    style?: React.CSSProperties;
    /**
     * Close menu automatically when a `MenuItem` is clicked
     *
     * @default true
     */
    closeOnMenuItemClick?: boolean;
}
/**
 * Component that wraps `Menu` and adds popup functionality
 *
 * All props of `Menu` are included as a convenience and not required. You can
 * choose to wrap `content` with `Menu` if you'd like because `Menu` does not
 * add anything to the DOM and `Menu` does not have any defaults, so nested
 * `Menu`s do not override values unless they are explicitly set.
 */
export declare const PopupMenu: React.FC<Props>;
export {};
