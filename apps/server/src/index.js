"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
var express_1 = require("express");
var cors_1 = require("cors");
var app = (0, express_1.default)();
// Route Imports
var youtube_router_1 = require("./routes/youtube.router");
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use("/api/youtube", youtube_router_1.default);
var port = process.env.PORT || 4000;
app.listen(port, function () {
    console.log("Server is running on port ".concat(port));
});
