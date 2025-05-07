"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const User_1 = __importDefault(require("../../models/User"));
const SendApplicationReceipt_1 = __importDefault(require("../../utils/email/SendApplicationReceipt"));
const SubmitFlow_1 = __importDefault(require("../../models/SubmitFlow"));
router.get("/submit", async (req, res) => {
    res.status(200).json({ message: "Welcome to the user submit route !" });
});
router.post("/submit", async (req, res) => {
    try {
        let user = await User_1.default.findOne({ email: req.body.email.toLowerCase() });
        if (user != null) {
            return res.status(400).json({ message: "Already applied for internship . Please try again with different email !", success: false });
        }
        let newuser = new User_1.default({
            name: req.body.fullName,
            email: req.body.email.toLowerCase(),
            domain: req.body.internshipProgram,
            month: req.body.duration,
            number: req.body.contactNumber,
            clg: req.body.college,
            gender: req.body.gender,
            qualification: req.body.qualification,
            ayear: req.body.currentYear,
            country: req.body.country,
            skilllevel: req.body.skillLevel,
            source: req.body.source,
        });
        await newuser.save();
        let flow = await SubmitFlow_1.default.find();
        await (0, SendApplicationReceipt_1.default)(req.body.email, req.body.fullName, req.body.internshipProgram, req.body.duration, flow[0].grplink);
        return res.status(200).json({ message: "Application submitted successfully !", success: true });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error . Please try again after sometime.", success: false });
    }
});
exports.default = router;
