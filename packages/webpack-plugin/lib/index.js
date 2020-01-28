"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _webpackPlugin = require("./webpack-plugin");

Object.keys(_webpackPlugin).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _webpackPlugin[key];
    }
  });
});