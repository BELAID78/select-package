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
function SelectHeaderTitle(_ref) {
  let {
    label,
    selectedValue,
    isOpen
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("span", {
    className: "select-header-title"
  }, selectedValue !== null && selectedValue.value !== null ? selectedValue.value : label), /*#__PURE__*/_react.default.createElement("svg", {
    className: isOpen ? 'select-header-caret up' : 'select-header-caret',
    fill: "currentColor",
    viewBox: "0 0 16 16"
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
  })));
}
var _default = SelectHeaderTitle;
exports.default = _default;