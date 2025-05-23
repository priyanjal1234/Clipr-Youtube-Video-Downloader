"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var valid_url_1 = require("valid-url");
function urlValidation(req, res, next) {
    try {
        var videoUrl = req.body.videoUrl;
        if (!videoUrl)
            return res.status(400).json({ message: "Video url is required" });
        if (!valid_url_1.default.isUri(videoUrl))
            return res.status(401).json({ message: "Url is invalid" });
        var ytRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//;
        if (!ytRegex.test(videoUrl)) {
            return res
                .status(401)
                .json({ message: "Only Youtube Urls are required" });
        }
        next();
    }
    catch (error) {
        return res.status(500).json({
            message: error instanceof Error
                ? error.message
                : "Error validating the video url",
        });
    }
}
exports.default = urlValidation;
