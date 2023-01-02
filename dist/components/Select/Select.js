"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.test.js");
require("core-js/modules/es.string.starts-with.js");
var _react = _interopRequireWildcard(require("react"));
var _SelectHeader = _interopRequireDefault(require("../SelectHeader/SelectHeader"));
var _SelectHeaderTitle = _interopRequireDefault(require("../SelectHeaderTitle/SelectHeaderTitle"));
var _SelectList = _interopRequireDefault(require("../SelectList/SelectList"));
var _SelectListItem = _interopRequireDefault(require("../SelectListItem/SelectListItem"));
require("./select.css");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Component for create custom select 
 * 
 * @param {object}
 * @returns {React.DOMElement}
 */
function Select(_ref) {
  let {
    tabIndex,
    label,
    modifier,
    data,
    dataKey,
    zIndex
  } = _ref;
  /**
   * current select value and how we can modifie it
   */
  const {
    currentValue,
    valueModifier
  } = modifier;

  /**
   * select value state 
   */
  const [selectedValue, setSelectedValue] = (0, _react.useState)({
    value: currentValue
  });

  /**
   * is select open state
   */
  const [isOpen, setIsOpen] = (0, _react.useState)(false);

  /**
   * ref to that select
   */
  const selectRef = (0, _react.useRef)();

  /**
   * handle click on select list item 
   * 
   * @param {object} item 
   * @returns {void}
   */
  const handleItemClick = item => {
    setSelectedValue(item);
    valueModifier(item.value);
    setIsOpen(false);
  };

  /**
   * handle the open or close the select 
   * 
   * @returns {void}
   */
  const handleListClick = () => {
    setIsOpen(isOpen => !isOpen);
  };

  /**
   * handle the click on any DOM element to close the select 
   * 
   * @param {Event} e
   * @returns {void}
   */
  const handleDomClick = e => {
    if (!selectRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  /**
   * scroll to specific position
   * 
   * @param {number} index 
   * @returns {void}
   */
  const showElementByScroll = index => {
    const activeElement = selectRef.current.querySelector('.select-list-item.active').scrollHeight;
    selectRef.current.querySelector('.select-list').scrollTo({
      top: activeElement * index,
      behavior: 'smooth'
    });
  };

  /**
   * add keyup event to handle search open or close select  
   */
  (0, _react.useEffect)(() => {
    /**
     * when press Space or Enter on the focused select show the content
     * 
     * @param {Event} e 
     * @returns {void}
     */
    const handlePressKey = e => {
      const {
        code,
        key
      } = e;
      if (!selectRef.current.contains(e.target)) {
        setIsOpen(false);
      }
      if (selectRef.current.contains(e.target) && (code === 'Space' || code === 'Enter')) {
        handleListClick();
      }
      if (selectRef.current.contains(e.target) && code === 'ArrowUp') {
        handleUpArrow();
      }
      if (selectRef.current.contains(e.target) && code === 'ArrowDown') {
        handleDownArrow();
      }
      if (selectRef.current.contains(e.target) && /[a-zA-Z]/g.test(key) && key !== 'Tab' && key !== 'ArrowUp' && key !== 'ArrowDown') {
        handleSearch(key);
      }
    };

    /**
     * handle press up arrow to show the previous item
     * 
     * @returns {void}
     */
    const handleUpArrow = () => {
      let currentIndex = data.findIndex(item => item[dataKey.value] === selectedValue[dataKey.value]);
      currentIndex = currentIndex !== undefined ? currentIndex - 1 : 0;
      if (currentIndex < 0) {
        currentIndex = data.length - 1;
      }
      setSelectedValue(data[currentIndex]);
      if (isOpen) {
        showElementByScroll(currentIndex);
      }
    };

    /**
     * handle press up arrow to show the next item
     * 
     * @returns {void}
     */
    const handleDownArrow = () => {
      let currentIndex = data.findIndex(item => item[dataKey.value] === selectedValue[dataKey.value]);
      currentIndex = currentIndex !== undefined ? currentIndex + 1 : 0;
      if (currentIndex >= data.length) {
        currentIndex = 0;
      }
      setSelectedValue(data[currentIndex]);
      if (isOpen) {
        showElementByScroll(currentIndex);
      }
    };

    /**
     * search for specific letter 
     * 
     * @param {string} letter 
     * @returns {void}
     */
    const handleSearch = letter => {
      let currentIndex = data.findIndex(item => item[dataKey.value].toLowerCase().startsWith(letter.toLowerCase()));
      if (currentIndex === -1) {
        currentIndex = 0;
      }
      setSelectedValue(data[currentIndex]);
      if (isOpen) {
        showElementByScroll(currentIndex);
      }
    };
    document.addEventListener('keyup', handlePressKey);
    return () => {
      document.removeEventListener('keyup', handlePressKey);
    };
  }, [selectedValue, isOpen, data, dataKey]);

  /**
   * add click event to any DOM element to close the select 
   */
  (0, _react.useEffect)(() => {
    document.addEventListener('click', handleDomClick);
    return () => {
      document.removeEventListener('click', handleDomClick);
    };
  }, []);
  return /*#__PURE__*/_react.default.createElement("div", {
    tabIndex: tabIndex,
    ref: selectRef,
    className: "select-input",
    style: {
      zIndex
    }
  }, /*#__PURE__*/_react.default.createElement(_SelectHeader.default, {
    handleListClick: handleListClick
  }, /*#__PURE__*/_react.default.createElement(_SelectHeaderTitle.default, {
    label: label,
    selectedValue: selectedValue,
    isOpen: isOpen
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: isOpen ? 'select-content show' : 'select-content'
  }, /*#__PURE__*/_react.default.createElement(_SelectList.default, null, /*#__PURE__*/_react.default.createElement("li", {
    onClick: () => handleItemClick({
      id: 'select-default-key',
      value: null
    }),
    className: "select-list-item",
    key: "select-default-key"
  }, label), data.map(item => /*#__PURE__*/_react.default.createElement(_SelectListItem.default, {
    selectedValue: selectedValue,
    key: item[dataKey.id],
    item: item,
    dataKey: dataKey,
    handleItemClick: handleItemClick
  })))));
}
var _default = Select;
exports.default = _default;