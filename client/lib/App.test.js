"use strict";

var _interopRequireDefault = require("/Users/a1451224/Documents/PK/Personal/dev/react-ppt-from-xls/client/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _App = _interopRequireDefault(require("./App"));

var _jsxFileName = "/Users/a1451224/Documents/PK/Personal/dev/react-ppt-from-xls/client/src/App.test.js";
it('renders without crashing', function () {
  var div = document.createElement('div');

  _reactDom.default.render(_react.default.createElement(_App.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    },
    __self: this
  }), div);

  _reactDom.default.unmountComponentAtNode(div);
});