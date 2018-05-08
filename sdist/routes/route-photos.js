"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logic_photos_1 = require("../logic/logic-photos");
var express = require("express");
var photoRouter = express.Router();
photoRouter.route('/photos')
    .get(function (req, res) {
    var svc = new logic_photos_1.default(req.querySvc);
    svc.getPhotos()
        .then(function (albums) {
        res.json(albums);
    })
        .catch(function (e) {
        console.log(e);
        res.json({
            status: "FAILED",
            error: e
        });
    });
});
exports.default = photoRouter;
//# sourceMappingURL=route-photos.js.map