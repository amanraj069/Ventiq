"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
async function run() {
    try {
        const res = await (0, node_fetch_1.default)('http://localhost:9000/api/ideas');
        console.log(res.status);
        const text = await res.text();
        console.log(text);
    }
    catch (err) {
        console.error(err);
    }
}
run();
//# sourceMappingURL=test-fetch.js.map