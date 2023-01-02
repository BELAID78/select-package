"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Component for create select list item
 * 
 * @param {object}
 * @returns {React.ReactElement}
 */
function SelectListItem(_ref) {
  let {
    selectedValue,
    item,
    dataKey,
    handleItemClick
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("li", {
    onClick: () => handleItemClick(item),
    className: item[dataKey.value] === selectedValue.value ? 'select-list-item active' : 'select-list-item'
  }, item[dataKey.value]);
}
var _default = SelectListItem;
exports.default = _default;