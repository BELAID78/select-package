"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Component for create select header 
 * 
 * @param {object}
 * @returns {React.ReactElement}
 */
function SelectHeader(_ref) {
  let {
    children,
    handleListClick
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "select-header",
    onClick: handleListClick
  }, children);
}
var _default = SelectHeader;
exports.default = _default;