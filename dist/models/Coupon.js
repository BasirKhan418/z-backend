"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CouponSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
    discountPercentage: { type: Number, required: true },
    couponLimit: { type: Number, required: true },
    totalClaimed: { type: Number, required: true },
}, { timestamps: true });
// mongoose.models is read-only and cannot be reassigned
exports.default = mongoose_1.default.models['Coupon'] || mongoose_1.default.model('Coupon', CouponSchema);
