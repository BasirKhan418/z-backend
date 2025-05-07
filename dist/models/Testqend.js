"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const TestQuestionSchemaend = new mongoose_1.default.Schema({
    testname: { type: mongoose_2.Schema.Types.String, ref: 'Testend', default: '' },
    testid: { type: mongoose_2.Schema.Types.ObjectId, ref: 'Testend', default: '' },
    question1: [{ type: Object, required: true }],
    question2: [{ type: Object, default: [{ question: "", option1: "", option2: "", option3: "", option4: "", answer: "" }] }],
    question3: [{ type: Object, default: [{ question: "", }] }],
    question4: [{ type: Object, default: [{ question: "", }] }],
}, { timestamps: true });
exports.default = mongoose_1.default.models['Testqend'] || mongoose_1.default.model('Testqend', TestQuestionSchemaend);
