"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
app.use(express.json());
app.listen(4000, function () { return console.log('Server started!'); });
