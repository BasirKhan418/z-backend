"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const User_1 = __importDefault(require("../../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Testq_1 = __importDefault(require("../../models/Testq"));
const Test_1 = __importDefault(require("../../models/Test"));
const Testend_1 = __importDefault(require("../../models/Testend"));
const Testqend_1 = __importDefault(require("../../models/Testqend"));
function getMonthDifferenceFromNow(dateString) {
    const givenDate = new Date(dateString);
    const now = new Date();
    // Calculate the difference in years and months
    let yearsDiff = now.getFullYear() - givenDate.getFullYear();
    let monthsDiff = now.getMonth() - givenDate.getMonth();
    // Adjust if the current month is before the given month in the same year
    let totalMonths = yearsDiff * 12 + monthsDiff;
    return totalMonths < 1 ? 0 : totalMonths;
}
router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        let { token } = req.body;
        if (!token) {
            return res.status(400).json({ message: "Please provide a token", success: false });
        }
        try {
            let decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY || "");
            let user = await User_1.default.findOne({ email: decoded.email });
            var statusfortest;
            if (user == null) {
                return res.status(404).json({ message: "User not found", success: false });
            }
            if (user != null) {
                if (user.startdate == undefined || user.startdate == "" || user.startdate == null) {
                    console.log("start date is undefined");
                    statusfortest = "start";
                }
                let res = getMonthDifferenceFromNow(user.startdate);
                console.log(res);
                if (user.month == "1 Month" && res >= 1 && user.ispaid) {
                    statusfortest = "end";
                }
                else if (user.month == "2 Month" && res >= 2 && user.ispaid) {
                    statusfortest = "end";
                }
                else if (user.month == "3 Month" && res >= 3 && user.ispaid) {
                    statusfortest = "end";
                }
                else if (user.appeartest && user.ispaid) {
                    statusfortest = "mid";
                }
                else {
                    statusfortest = "start";
                }
            }
            console.log(statusfortest);
            if (user.token != token) {
                return res.status(401).json({ message: "Login detected in another device", success: true, an: true, status: statusfortest });
            }
            //if test is start
            if (statusfortest == "start") {
                let allTests;
                if (user.domain == "Data Science") {
                    allTests = await Test_1.default.findOne({ testtitle: "Data Science & Machine Learning" });
                }
                else if (user.domain == "Software Development") {
                    allTests = await Test_1.default.findOne({ testtitle: "Web Development" });
                }
                else {
                    allTests = await Test_1.default.findOne({ testtitle: user.domain });
                }
                if (allTests == null) {
                    return res.status(404).json({ message: "Valid user", success: true, user, testStatus: false, test: allTests, status: statusfortest });
                }
                let TestQuestions = await Testq_1.default.findOne({ testid: allTests._id }).populate('testid');
                if (TestQuestions == null) {
                    return res.status(404).json({ message: "Valid user", success: true, user, testStatus: false, test: TestQuestions, status: statusfortest });
                }
                return res.status(200).json({ message: "Valid user", success: true, user, test: TestQuestions, testStatus: true, status: statusfortest });
            }
            //else test is end
            else {
                console.log(user.domain);
                let allTests;
                if (user.domain == "Data Science") {
                    allTests = await Test_1.default.findOne({ testtitle: "Data Science & Machine Learning" });
                }
                else if (user.domain == "Software Development") {
                    allTests = await Test_1.default.findOne({ testtitle: "Web Development" });
                }
                else {
                    console.log("i am here");
                    allTests = await Testend_1.default.findOne({ testtitle: user.domain });
                }
                if (allTests == null) {
                    return res.status(404).json({ message: "Valid user", success: true, user, testStatus: false, test: allTests, status: statusfortest });
                }
                let TestQuestions = await Testqend_1.default.findOne({ testid: allTests._id }).populate('testid');
                if (TestQuestions == null) {
                    return res.status(404).json({ message: "Valid user", success: true, user, testStatus: false, test: TestQuestions, status: statusfortest });
                }
                console.log("all test found", allTests);
                console.log(statusfortest);
                return res.status(200).json({ message: "Valid user", success: true, user, test: TestQuestions, testStatus: true, status: statusfortest });
            }
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Malicious activity or tampering detected", success: false });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error please try again later", success: false });
    }
});
exports.default = router;
