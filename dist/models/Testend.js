"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TestSchemaend = new mongoose_1.default.Schema({
    testname: { type: String, required: true },
    testtype: { type: String, required: true },
    testdate: { type: String, required: true },
    testenddate: { type: String, required: true },
    testtitle: { type: String, required: true },
    testdescription: { type: String, required: true },
    testbenefits: [{ type: String, required: true }],
}, { timestamps: true });
exports.default = mongoose_1.default.models['Testend'] || mongoose_1.default.model('Testend', TestSchemaend);
