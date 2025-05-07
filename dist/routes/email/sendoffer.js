"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const User_1 = __importDefault(require("../../models/User"));
const SendOlUrl_1 = __importDefault(require("../../utils/email/SendOlUrl"));
const SendCompletionCertificate_1 = __importDefault(require("../../utils/email/SendCompletionCertificate"));
const SendTrainingCompletionCertificate_1 = __importDefault(require("../../utils/email/SendTrainingCompletionCertificate"));
//send offer letter endpoint
router.get("/ol", async (req, res) => {
    try {
        let remaining = await User_1.default.find({
            appeartest: true,
            $and: [
                { ispaid: { $ne: true } },
                { sendmail: { $ne: true } }
            ]
        });
        //if its not found
        if (remaining.length === 0) {
            return res.status(400).json({ message: "No users found to send offer letter ", success: false });
        }
        console.log("hit");
        console.log(remaining.length);
        let count = 0;
        let fail = 0;
        //if its found;
        remaining.forEach(async (user) => {
            let send = await (0, SendOlUrl_1.default)(user.email, user.name, user.olurl, user.testResult, user._id);
            console.log(send);
            if (send) {
                ++count;
                await User_1.default.findByIdAndUpdate(user._id, { sendmail: true });
            }
            else {
                ++fail;
            }
        });
        console.log(count);
        console.log(fail);
        return res.status(200).json({ message: `${count} offer letters sent successfully and ${fail} failed`, success: true, count: count, fail: fail });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
});
//send completion certificate endpoint
router.get("/cc", async (req, res) => {
    try {
        let remaining = await User_1.default.find({
            endappeartest: true,
            $and: [
                { ispaid: { $ne: false } },
                { ccsendmail: { $ne: true } }
            ]
        });
        //if its not found
        if (remaining.length === 0) {
            return res.status(400).json({ message: "No users found to send offer letter ", success: false });
        }
        console.log("hit");
        console.log(remaining.length);
        let count = 0;
        let fail = 0;
        //if its found;
        remaining.forEach(async (user) => {
            console.log(user);
            let send = await (0, SendCompletionCertificate_1.default)(user.email, user.name, user.ccurl);
            if (send) {
                ++count;
                await User_1.default.findByIdAndUpdate(user._id, { ccsendmail: true });
            }
            else {
                ++fail;
            }
        });
        console.log(count);
        console.log(fail);
        return res.status(200).json({ message: `${count} Completion certificate sent successfully and ${fail} failed`, success: true, count: count, fail: fail });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
});
//send training certificate endpoint
router.get("/tr", async (req, res) => {
    try {
        let remaining = await User_1.default.find({
            endappeartest: true,
            $and: [
                { ispaid: { $ne: false } },
                { trsendmail: { $ne: true } }
            ]
        });
        //if its not found
        if (remaining.length === 0) {
            return res.status(400).json({ message: "No users found to send offer letter ", success: false });
        }
        console.log("hit");
        console.log(remaining.length);
        let count = 0;
        let fail = 0;
        //if its found;
        remaining.forEach(async (user) => {
            console.log(user);
            let send = await (0, SendTrainingCompletionCertificate_1.default)(user.email, user.name, user.trurl);
            if (send) {
                ++count;
                await User_1.default.findByIdAndUpdate(user._id, { trsendmail: true });
            }
            else {
                ++fail;
            }
        });
        console.log(count);
        console.log(fail);
        return res.status(200).json({ message: `${count} Completion certificate sent successfully and ${fail} failed`, success: true, count: count, fail: fail });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
});
exports.default = router;
