"use strict";

var _interopRequireDefault = require("/Users/a1451224/Documents/PK/Personal/dev/react-ppt-from-xls/client/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("/Users/a1451224/Documents/PK/Personal/dev/react-ppt-from-xls/client/node_modules/@babel/runtime/helpers/interopRequireWildcard");

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _App = _interopRequireDefault(require("./App"));

var serviceWorker = _interopRequireWildcard(require("./serviceWorker"));

var _jsxFileName = "/Users/a1451224/Documents/PK/Personal/dev/react-ppt-from-xls/client/src/index.js";

_reactDom.default.render(_react.default.createElement(_App.default, {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 7
  },
  __self: void 0
}), document.getElementById('root')); // If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA


serviceWorker.unregister();