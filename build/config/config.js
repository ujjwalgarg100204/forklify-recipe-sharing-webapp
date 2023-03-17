"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ejs_config_1 = __importDefault(require("./ejs.config"));
function config(app) {
	// config EJS
	(0, ejs_config_1.default)(app);
	// add static files to express
	app.use(express_1.default.static("src/public"));
}
exports.default = config;
