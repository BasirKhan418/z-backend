import mongoose from "mongoose";
const WhatsappSchema = new mongoose.Schema({
   domain: { type: String, required: true },
   whatsappUrl: { type: String, required: true },
}, { timestamps: true });
// mongoose.models is read-only and cannot be reassigned
export default mongoose.models['Whatsapp'] || mongoose.model('Whatsapp', WhatsappSchema );