import mongoose from "mongoose";
const AdminSchema = new mongoose.Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    token: { type: String, required: false },
}, { timestamps: true });
// mongoose.models is read-only and cannot be reassigned

export default mongoose.models['Admin'] || mongoose.model('Admin', AdminSchema );