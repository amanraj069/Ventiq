"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configuration = exports.ConfigModule = void 0;
var config_module_1 = require("./config.module");
Object.defineProperty(exports, "ConfigModule", { enumerable: true, get: function () { return config_module_1.ConfigModule; } });
var configuration_1 = require("./configuration");
Object.defineProperty(exports, "configuration", { enumerable: true, get: function () { return __importDefault(configuration_1).default; } });
//# sourceMappingURL=index.js.map