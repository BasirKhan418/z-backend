import mongoose from "mongoose";
const CouponSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
    discountPercentage: { type: Number, required: true },
    couponLimit: { type: Number, required: true },
    totalClaimed: { type: Number, required: true },
}, { timestamps: true });
// mongoose.models is read-only and cannot be reassigned

export default mongoose.models['Coupon'] || mongoose.model('Coupon', CouponSchema);