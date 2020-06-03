'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _tslib = require('../../_tslib-bcbe0269.js');
var colors = require('../../colors/colors.js');
require('../../fonts/fonts.js');
var base$1 = require('../../base-1dde5d6e.js');
require('../../mono-f4fb9dce.js');
var core = require('@emotion/core');
var React = require('react');
var React__default = _interopDefault(React);
require('../../tippy-5e220ef0.js');

var TippyPopupMenuStyles = function () { return (React__default.createElement(core.Global, { styles: core.css({
        ".bg-black": {
            backgroundColor: colors.colors.black.base + " !important",
        },
        ".text-white": {
            color: colors.colors.white + " !important",
        },
        "*[data-tippy-root]": {},
        ".tippy-box": {
            "&[data-theme=space-kit-menu]": _tslib.__assign(_tslib.__assign({}, base$1.small), { boxShadow: "0 3px 4px 0 rgba(18, 21, 26, 0.04), 0 4px 8px 0 rgba(18, 21, 26, 0.08), 0 0 0 1px rgba(18, 21, 26, 0.08)", backgroundColor: colors.colors.white, borderRadius: 4, color: colors.colors.black.base, padding: 6, margin: 2, minWidth: 190, ".tippy-content": {
                    padding: "0",
                } }),
        },
    }) })); };

exports.TippyPopupMenuStyles = TippyPopupMenuStyles;
//# sourceMappingURL=TippyPopupMenuStyles.js.map
