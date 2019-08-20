"use strict";

var _interopRequireDefault = require("/Users/a1451224/Documents/PK/Personal/dev/react-ppt-from-xls/client/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Home = _interopRequireDefault(require("./Home.js"));

var _pptGen = _interopRequireDefault(require("./pptGen.js"));

var _Auction = _interopRequireDefault(require("./Auction.js"));

var _reactRouterDom = require("react-router-dom");

var _jsxFileName = "/Users/a1451224/Documents/PK/Personal/dev/react-ppt-from-xls/client/src/App.js";

var MainMenu = function MainMenu() {
  return _react.default.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: this
  }, _react.default.createElement(_reactRouterDom.Link, {
    to: "/",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    },
    __self: this
  }, _react.default.createElement("button", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    },
    __self: this
  }, "home")), _react.default.createElement(_reactRouterDom.Link, {
    to: "/ppt",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    },
    __self: this
  }, _react.default.createElement("button", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    },
    __self: this
  }, "PPT Generator")), _react.default.createElement(_reactRouterDom.Link, {
    to: "/auction",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: this
  }, _react.default.createElement("button", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    },
    __self: this
  }, "Auction")));
};

function App() {
  return _react.default.createElement(_reactRouterDom.BrowserRouter, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    },
    __self: this
  }, _react.default.createElement("header", {
    className: "App-header",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32
    },
    __self: this
  }, _react.default.createElement("h1", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33
    },
    __self: this
  }, "Welcome to MTPL 2019"), _react.default.createElement("h2", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34
    },
    __self: this
  }, _react.default.createElement(MainMenu, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34
    },
    __self: this
  }), " ")), _react.default.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36
    },
    __self: this
  }, _react.default.createElement(_reactRouterDom.Route, {
    exact: true,
    path: "/",
    component: _Home.default,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37
    },
    __self: this
  }), _react.default.createElement(_reactRouterDom.Route, {
    exaxt: true,
    path: "/ppt",
    component: _pptGen.default,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38
    },
    __self: this
  }), _react.default.createElement(_reactRouterDom.Route, {
    exact: true,
    path: "/auction",
    component: _Auction.default,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39
    },
    __self: this
  })));
}

var _default = App;
exports.default = _default;