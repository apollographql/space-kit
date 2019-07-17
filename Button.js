"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@emotion/core");
var colors = tslib_1.__importStar(require("./colors"));
var typography_1 = require("./typography");
exports.Button = function (_a) {
    var _b = _a.backgroundColor, backgroundColor = _b === void 0 ? colors.silver.light : _b, children = _a.children, _c = _a.disabled, disabled = _c === void 0 ? false : _c, _d = _a.disabledBackgroundColor, disabledBackgroundColor = _d === void 0 ? colors.silver.dark : _d, _e = _a.disabledTextColor, disabledTextColor = _e === void 0 ? colors.grey.light : _e, _f = _a.fab, fab = _f === void 0 ? false : _f, _g = _a.forceActiveState, forceActiveState = _g === void 0 ? false : _g, _h = _a.forceFocusState, forceFocusState = _h === void 0 ? false : _h, _j = _a.forceHoverState, forceHoverState = _j === void 0 ? false : _j, _k = _a.hidden, hidden = _k === void 0 ? false : _k, _l = _a.hiddenActiveBackgroundColor, hiddenActiveBackgroundColor = _l === void 0 ? colors.silver.dark : _l, _m = _a.hiddenFocusedColor, hiddenFocusedColor = _m === void 0 ? colors.blue.base : _m, _o = _a.hoverBackgroundColor, hoverBackgroundColor = _o === void 0 ? colors.silver.base : _o, icon = _a.icon, _p = _a.size, size = _p === void 0 ? "default" : _p, otherProps = tslib_1.__rest(_a, ["backgroundColor", "children", "disabled", "disabledBackgroundColor", "disabledTextColor", "fab", "forceActiveState", "forceFocusState", "forceHoverState", "hidden", "hiddenActiveBackgroundColor", "hiddenFocusedColor", "hoverBackgroundColor", "icon", "size"]);
    var iconSize = size === "small" ? 12 : size === "large" ? 24 : 16;
    var iconOnly = !children;
    if (fab) {
        if (!icon) {
            throw new TypeError("FAB buttons are required to have an `icon`");
        }
        else if (children) {
            throw new TypeError("FAB buttons cannot have children, only an `icon`");
        }
    }
    if (forceActiveState && forceHoverState) {
        throw new TypeError("Do not force multiple properties at once, you will get indeterminiate behavior");
    }
    var activeProperties = tslib_1.__assign({}, (hidden
        ? { backgroundColor: hiddenActiveBackgroundColor }
        : {
            boxShadow: "inset 0 0 0 1px rgba(18, 21, 26, 0.2), inset 0 -1px 0 0 rgba(18, 21, 26, 0.05), inset 0 2px 2px 0 rgba(18, 21, 26, 0.12)"
        }), { outline: 0 });
    var hoverProperties = tslib_1.__assign({ backgroundColor: hoverBackgroundColor, cursor: "pointer" }, (!hidden && {
        boxShadow: "0 5px 10px 0 rgba(18, 21, 26, 0.12), inset 0 0 0 1px rgba(18, 21, 26, 0.2), inset 0 -1px 0 0 rgba(18, 21, 26, 0.05)"
    }));
    var focusProperties = tslib_1.__assign({ boxShadow: "0 1px 4px 0 rgba(18, 21, 26, 0.08), 0 0 0 2px #bbdbff, inset 0 0 0 1px #2075d6, inset 0 -1px 0 0 rgba(18, 21, 26, 0.05)" }, (hidden && { color: hiddenFocusedColor + " !important" }));
    return (core_1.jsx("button", tslib_1.__assign({}, otherProps, { css: tslib_1.__assign({ appearance: "button", backgroundColor: hidden
                ? "transparent"
                : disabled
                    ? disabledBackgroundColor
                    : backgroundColor, borderRadius: fab ? "100%" : 4, borderWidth: 0 }, (!hidden && {
            boxShadow: "0 1px 4px 0 rgba(18, 21, 26, 0.08), inset 0 0 0 1px rgba(18, 21, 26, 0.2), inset 0 -1px 0 0 rgba(18, 21, 26, 0.05)"
        }), { minWidth: iconOnly
                ? size === "small"
                    ? 28
                    : size === "large"
                        ? 42
                        : 36
                : size === "small"
                    ? 76
                    : size === "large"
                        ? 112
                        : 100, padding: size === "small" ? "5px 8px" : size === "large" ? 8 : 7 }, (size === "small"
            ? typography_1.base.small
            : size === "large"
                ? typography_1.base.large
                : typography_1.base.base), (!disabled &&
            (forceHoverState
                ? hoverProperties
                : {
                    ":hover": hoverProperties
                })), { fontWeight: 600, outline: 0 }, (disabled && { color: disabledTextColor + " !important" }), (!disabled &&
            (forceFocusState ? focusProperties : { ":focus": focusProperties })), (!disabled && forceActiveState
            ? activeProperties
            : { ":active": activeProperties })) }),
        core_1.jsx("div", { css: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            } },
            icon && (core_1.jsx("span", { css: {
                    display: "inline-block",
                    width: iconSize,
                    height: iconSize,
                    margin: iconOnly ? "3px 0" : "0 4px 0"
                } }, icon)),
            children && core_1.jsx("span", null, children))));
};
//# sourceMappingURL=Button.js.map