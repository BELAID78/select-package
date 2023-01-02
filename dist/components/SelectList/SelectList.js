"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * component for create select list
 * 
 * @param {object} 
 * @returns {React.ReactElement}
 */
function SelectList(_ref) {
  let {
    children
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("ul", {
    className: "select-list"
  }, children);
}
var _default = SelectList;
exports.default = _default;