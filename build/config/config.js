"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ejs_config_1 = __importDefault(require("./ejs.config"));
const mongoose_1 = __importDefault(require("mongoose"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const passport_config_1 = __importDefault(require("./passport.config"));
function config(app) {
    // config EJS
    (0, ejs_config_1.default)(app);
    // config passport
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    // config mongoose
    const MONGO_URL = (process.env.ENV === "development"
        ? process.env.MONGO_LOCAL_URL
        : process.env.MONGO_REMOTE_URL);
    const clientP = mongoose_1.default
        .connect(MONGO_URL, {
        serverSelectionTimeoutMS: 2000,
        dbName: "forklify",
    })
        .then(m => m.connection.getClient());
    // passport-session setup & cookies setup
    app.use((0, express_session_1.default)({
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        store: connect_mongo_1.default.create({
            clientPromise: clientP,
            collectionName: "sessions",
            stringify: false,
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, // equals to 1 day
        },
    }));
    // passport setup
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    (0, passport_config_1.default)();
    // add static files to passport
    app.use(express_1.default.static("src/public"));
}
exports.default = config;
