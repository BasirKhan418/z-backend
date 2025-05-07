"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    token: { type: String, required: false },
    domain: { type: String, required: true },
    month: { type: String, required: true },
    testResult: { type: String, required: false },
    appeartest: { type: Boolean, required: false, default: false },
    ispaid: { type: Boolean, required: false, default: false },
    paymentid: { type: String, required: false },
    orderid: { type: String, required: false },
    answer: { type: Object, required: false },
    testcorrect: { type: String, required: false },
    testid: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Testq', required: false },
    endtestid: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Testqend', required: false },
    endtestResult: { type: String, required: false },
    endappeartest: { type: Boolean, required: false, default: false },
    endanswer: { type: Object, required: false },
    olurl: { type: String, required: false },
    sendmail: { type: Boolean, required: false, default: false },
    ccurl: { type: String, required: false },
    trurl: { type: String, required: false },
    ccsendmail: { type: Boolean, required: false, default: false },
    trsendmail: { type: Boolean, required: false, default: false },
    startdate: { type: Date, required: false },
    number: { type: Number, required: false },
    clg: { type: String, required: false },
    gender: { type: String, required: false },
    purl: { type: String, required: false },
    projects: { type: String, required: false },
    qualification: { type: String, required: false },
    ayear: { type: Number, required: false },
    country: { type: String, required: false },
    skilllevel: { type: String, required: false },
    source: { type: String, required: false },
}, { timestamps: true });
// mongoose.models is read-only and cannot be reassigned
exports.default = mongoose_1.default.models['User'] || mongoose_1.default.model('User', UserSchema);
