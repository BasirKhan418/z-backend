"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const otpSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
}, { timestamps: true });
// mongoose.models is read-only and cannot be reassigned
exports.default = mongoose_1.default.models['Otp'] || mongoose_1.default.model('Otp', otpSchema);
