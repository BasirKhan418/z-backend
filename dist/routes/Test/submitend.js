"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const User_1 = __importDefault(require("../../models/User"));
const Testqend_1 = __importDefault(require("../../models/Testqend"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
router.post('/submit', async (req, res) => {
    try {
        const { token, answers, testid } = req.body;
        console.log(token, answers, testid);
        try {
            let decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY || "");
            let findTest = await Testqend_1.default.findById({ _id: testid });
            if (findTest == null) {
                return res.status(200).json({ message: "Test not found", success: false });
            }
            let totalcorrect = 0;
            let total = findTest.question1.length;
            findTest.question1.map((item, index) => {
                if (item.answer == answers[index]) {
                    totalcorrect++;
                }
            });
            const totalp = Math.floor((totalcorrect / total) * 100);
            console.log(totalp, totalcorrect, total);
            let user = await User_1.default.findOneAndUpdate({ email: decoded.email }, { endtestResult: totalp, endappeartest: true, testcorrect: `${totalcorrect}/${total}`, endtestid: testid });
            if (user == null) {
                return res.status(200).json({ message: "User not found try again", success: false });
            }
            return res.status(200).json({ message: "Test submitted successfully", success: true });
        }
        catch (err) {
            return res.status(500).json({ message: "Malicious activity detected. Session terminated.Please login again.", success: false });
        }
    }
    catch (err) {
        return res.status(500).json({ message: "Something went wrong please try again after some time.ISE", success: false });
    }
});
router.get('/submit', async (req, res) => {
    res.status(200).json({ message: "Test route working fine", success: true });
});
exports.default = router;
