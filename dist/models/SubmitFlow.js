"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const SubmitFlowSchema = new mongoose_1.default.Schema({
    lastdate: { type: String, required: false },
    examdate: { type: String, required: false },
    stipend: { type: String, required: false },
    grplink: { type: String, required: false },
    startdate: { type: String, required: false },
}, { timestamps: true });
exports.default = mongoose_1.default.models[' SubmitFlow'] || mongoose_1.default.model(' SubmitFlow', SubmitFlowSchema);
