"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = __importDefault(require("./config/config"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
// apply all the configuration
(0, config_1.default)(app);
app.get("/", (req, res) => {
	res.render("pages/index");
});
app.listen(PORT, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
