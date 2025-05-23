"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var youtube_controller_1 = require("../controllers/youtube.controller");
var urlValidation_1 = require("../middlewares/urlValidation");
var router = express_1.default.Router();
router
    .route("/video/info")
    .post(function (req, res, next) {
    (0, urlValidation_1.default)(req, res, next);
}, function (req, res) {
    (0, youtube_controller_1.getVideoInfo)(req, res);
});
router.route("/video/download").post(function (req, res, next) {
    (0, urlValidation_1.default)(req, res, next);
}, function (req, res) {
    (0, youtube_controller_1.downloadVideo)(req, res);
});
exports.default = router;
