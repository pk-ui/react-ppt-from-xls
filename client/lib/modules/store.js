"use strict";

var _interopRequireDefault = require("/Users/a1451224/Documents/PK/Personal/dev/react-ppt-from-xls/client/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("/Users/a1451224/Documents/PK/Personal/dev/react-ppt-from-xls/client/node_modules/@babel/runtime/helpers/esm/toConsumableArray"));

var _redux = require("redux");

function configureStore() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      state = _ref.state,
      _ref$middlewares = _ref.middlewares,
      middlewares = _ref$middlewares === void 0 ? [] : _ref$middlewares,
      _ref$enhancers = _ref.enhancers,
      enhancers = _ref$enhancers === void 0 ? [] : _ref$enhancers;

  var middlewareEnhancer = _redux.applyMiddleware.apply(void 0, (0, _toConsumableArray2.default)(middlewares));

  var composedEnhancers = _redux.compose.apply(void 0, [middlewareEnhancer].concat((0, _toConsumableArray2.default)(enhancers)));

  var store = (0, _redux.createStore)(state, composedEnhancers);
  return store;
}

var _default = configureStore;
exports.default = _default;