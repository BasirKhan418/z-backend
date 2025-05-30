"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const AdminSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    token: { type: String, required: false },
}, { timestamps: true });
// mongoose.models is read-only and cannot be reassigned
exports.default = mongoose_1.default.models['Admin'] || mongoose_1.default.model('Admin', AdminSchema);
