"use strict";
exports.__esModule = true;
var express_1 = require("express");
var cors_1 = require("cors");
var constants_1 = require("./constants");
// import {Plot, Record_t} from "./plot_";
var panel_1 = require("./panel");
var request_1 = require("./request");
var app = (0, express_1["default"])();
app.use((0, cors_1["default"])());
app.use(express_1["default"].static(__dirname + '/static/'));
app.get('/', function (req, res) {
    var key = constants_1.constants.KEY;
    (0, request_1.loadPage)(panel_1.PANELS.HOME).then(function (content) {
        res.send(content.content);
    });
});
app.get('/article/:name', function (req, res) {
    console.log("article endpoint");
    var name = req.params.name;
    var key = constants_1.constants.KEY;
    console.log(name);
    (0, request_1.loadPage)(panel_1.PANELS.ARTICLE)
        .then(function (content) {
        res.send(content.content);
    });
});
// Listen to the App Engine-specified port, or 8080 otherwise
var PORT = process.env.PORT || 8080;
var localhost = "localhost";
app.listen(PORT, function () {
    console.log(__dirname);
    console.log("Server listening on port ... ".concat(PORT, "..."));
});
