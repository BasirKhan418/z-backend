import mongoose from "mongoose";
const TestSchemaend = new mongoose.Schema({
    testname: { type: String, required: true },
    testtype: { type: String, required: true },
    testdate: { type: String, required: true },
    testenddate: { type: String, required: true },
    testtitle: { type: String, required: true },
    testdescription: { type: String, required: true },
    testbenefits: [{ type: String, required: true }],
}, { timestamps: true });
export default mongoose.models['Testend'] || mongoose.model('Testend', TestSchemaend  );