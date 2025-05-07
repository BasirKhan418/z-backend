import mongoose from "mongoose";
const otpSchema = new mongoose.Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
}, { timestamps: true });
// mongoose.models is read-only and cannot be reassigned

export default mongoose.models['Otp'] || mongoose.model('Otp', otpSchema);