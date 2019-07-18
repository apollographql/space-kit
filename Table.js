"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@emotion/core");
var typography = tslib_1.__importStar(require("./typography"));
var colors = tslib_1.__importStar(require("./colors"));
function Table(_a) {
    var data = _a.data, _b = _a.density, density = _b === void 0 ? "standard" : _b, columns = _a.columns;
    var padding = density === "standard" ? 8 : density === "condensed" ? 3 : 11;
    return (core_1.jsx("table", { css: {
            borderCollapse: "collapse",
            width: "100%",
        } },
        core_1.jsx("thead", null,
            core_1.jsx("tr", { css: {
                    borderBottom: "1px solid " + colors.silver.dark
                } }, columns.map(function (_a) {
                var headerTitle = _a.headerTitle;
                return (core_1.jsx("th", { css: tslib_1.__assign({}, typography.base.xsmall, { textTransform: "uppercase", color: colors.grey.darker, fontWeight: 600, textAlign: "left", padding: padding }) }, headerTitle));
            }))),
        core_1.jsx("tbody", null, data.map(function (item, index) { return (core_1.jsx("tr", { key: index }, columns.map(function (_a) {
            var render = _a.render;
            return (core_1.jsx("td", { css: {
                    borderBottom: "1px solid " + colors.silver.dark,
                    padding: padding
                } }, render(item, index, data)));
        }))); }))));
}
exports.Table = Table;
//# sourceMappingURL=Table.js.map