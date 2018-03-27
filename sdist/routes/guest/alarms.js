"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
router.route('/')
    .get(function (req, res) {
    res.render('guest/alarms');
});
module.exports = router;
//# sourceMappingURL=alarms.js.map