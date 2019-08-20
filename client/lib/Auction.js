"use strict";

var _interopRequireDefault = require("/Users/a1451224/Documents/PK/Personal/dev/react-ppt-from-xls/client/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _readExcelFile = _interopRequireDefault(require("read-excel-file"));

var _modern = _interopRequireDefault(require("exceljs/modern.browser"));

var _jsxFileName = "/Users/a1451224/Documents/PK/Personal/dev/react-ppt-from-xls/client/src/Auction.js";

function Auction() {
  return _react.default.createElement(PlayerData, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    },
    __self: this
  });
}

;

var test = function test() {
  //'/Users/a1451224/Documents/PK/Personal/dev/react-ppt-from-xls/src/auctionData/auctionData.xlsx'
  // read from a file
  var workbook = new _modern.default.Workbook();
  workbook.xlsx.readFile('/Users/a1451224/Documents/PK/Personal/dev/react-ppt-from-xls/src/auctionData/auctionData.xlsx').then(function () {
    alert('am here');
  });
};

var PlayerData = function PlayerData() {
  var sf = "121";
  return _react.default.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    },
    __self: this
  }, _react.default.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    },
    __self: this
  }, _react.default.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    },
    __self: this
  }, _react.default.createElement("h1", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: this
  }, _react.default.createElement("center", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: this
  }, "AUCTION2 ", sf))), _react.default.createElement("center", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    },
    __self: this
  }, _react.default.createElement("h1", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    },
    __self: this
  }, _react.default.createElement("button", {
    onClick: test,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32
    },
    __self: this
  }, "Test Button")))));
};

var _default = Auction;
exports.default = _default;