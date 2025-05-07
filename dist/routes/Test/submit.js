"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const User_1 = __importDefault(require("../../models/User"));
const Testq_1 = __importDefault(require("../../models/Testq"));
const SubmitFlow_1 = __importDefault(require("../../models/SubmitFlow"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
router.post('/submit', async (req, res) => {
    try {
        const { token, answers, testid } = req.body;
        console.log(token, answers, testid);
        try {
            let decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY || "");
            let findTest = await Testq_1.default.findById({ _id: testid });
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
            function convertToISO(dateStr) {
                // Split the date string by '/'
                const [day, month, year] = dateStr.split('/');
                // Create a new Date object
                // Note: months in JS Date are 0-indexed, so we subtract 1 from month
                const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
                // Convert to ISO string (this will give you the full ISO format)
                return date.toISOString();
            }
            const totalp = Math.floor((totalcorrect / total) * 100);
            console.log(totalp, totalcorrect, total);
            let date = await SubmitFlow_1.default.find({});
            let startdate = convertToISO(date[0].startdate);
            let user = await User_1.default.findOneAndUpdate({ email: decoded.email }, { testResult: totalp, appeartest: true, testcorrect: `${totalcorrect}/${total}`, testid: testid, startdate: startdate });
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
