"use strict";
exports.__esModule = true;
exports.UUIDService = void 0;
var uuid_1 = require("uuid");
var UUIDService = /** @class */ (function () {
    function UUIDService() {
    }
    UUIDService.generate = function () {
        return (0, uuid_1.v4)();
    };
    return UUIDService;
}());
exports.UUIDService = UUIDService;
