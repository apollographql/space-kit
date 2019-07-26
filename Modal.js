"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@emotion/core");
var react_1 = require("react");
var typography = tslib_1.__importStar(require("./typography"));
var colors = tslib_1.__importStar(require("./colors"));
var modalBackdrop = core_1.css(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n\n  &:after {\n    position: fixed;\n    z-index: 10;\n    content: \"\";\n    background-color: ", ";\n    opacity: 0.7;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    right: 0;\n    z-index: -1;\n  }\n"], ["\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n\n  &:after {\n    position: fixed;\n    z-index: 10;\n    content: \"\";\n    background-color: ", ";\n    opacity: 0.7;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    right: 0;\n    z-index: -1;\n  }\n"])), colors.grey.lighter);
function assertUnreachable(value) {
    throw new TypeError("Unreachable value reached " + value);
}
var getModalWidth = function (size) {
    switch (size) {
        case "small":
            return 460;
        case "medium":
            return 600;
        case "large":
            return 800;
        default:
            throw assertUnreachable(size);
    }
};
function Modal(_a) {
    var title = _a.title, description = _a.description, children = _a.children, onClose = _a.onClose, size = _a.size, bottomLeftText = _a.bottomLeftText, primaryAction = _a.primaryAction, secondaryAction = _a.secondaryAction;
    react_1.useEffect(function () {
        function handleKeyDown(event) {
            if (event.code === "Escape" && onClose) {
                onClose();
            }
        }
        document.addEventListener("keydown", handleKeyDown);
        return function () { return document.removeEventListener("keydown", handleKeyDown); };
    });
    return (core_1.jsx("div", { onClick: onClose, css: modalBackdrop },
        core_1.jsx("div", { onClick: function (event) { return event.stopPropagation(); }, css: {
                backgroundColor: "white",
                borderRadius: 12,
                boxShadow: "0 16px 32px 0 rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(18, 21, 26, 0.04)",
                left: "50%",
                maxHeight: "100%",
                minWidth: 400,
                opacity: 1,
                overflowY: "scroll",
                padding: size === "large" ? "40px" : "32px",
                position: "absolute",
                top: "20%",
                transform: "translate(-50%)",
                width: getModalWidth(size),
                zIndex: 11,
            } },
            core_1.jsx("div", null,
                title && (core_1.jsx("div", null,
                    core_1.jsx("div", { css: tslib_1.__assign({ color: colors.black.base, marginBottom: 10 }, (size === "small"
                            ? tslib_1.__assign({}, typography.base.large, { fontWeight: 600 }) : typography.base.xxlarge)) }, title))),
                description && (core_1.jsx("div", { css: tslib_1.__assign({}, typography.base.base, { color: colors.black.base }) }, description))),
            core_1.jsx("div", { css: { marginTop: 12 } }, children),
            (primaryAction || secondaryAction || bottomLeftText) && (core_1.jsx("div", { css: {
                    alignItems: "baseline",
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: 24,
                } },
                bottomLeftText && (core_1.jsx("div", { css: { marginRight: "auto" } }, bottomLeftText)),
                secondaryAction && (core_1.jsx("div", { css: { marginRight: 12 } }, secondaryAction)),
                primaryAction && core_1.jsx("div", null, primaryAction))))));
}
exports.Modal = Modal;
var templateObject_1;
//# sourceMappingURL=Modal.js.map