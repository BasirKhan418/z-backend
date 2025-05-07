"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const User_1 = __importDefault(require("../../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserLogin_1 = __importDefault(require("../../utils/email/UserLogin"));
const Otp_1 = __importDefault(require("../../models/Otp"));
const router = express_1.default.Router();
//zod validation
const emailScema = zod_1.z.object({
    email: zod_1.z.string().email(),
});
const otpScema = zod_1.z.object({
    email: zod_1.z.string().email(),
    otp: zod_1.z.string().length(6),
});
//send otp
router.post('/login', async (req, res) => {
    try {
        const { email } = req.body;
        const result = emailScema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({ error: result.error, message: "Please provide a valid email", success: false });
        }
        let user = await User_1.default.findOne({ email: email.toLowerCase() });
        if (user == null) {
            return res.status(404).json({ message: "User not found", success: false });
        }
        const resultr = await (0, UserLogin_1.default)(email.toLowerCase(), user.name);
        //if its send otp
        if (!resultr) {
            return res.status(500).json({ message: "Failed to send otp. Something went wrong", success: false });
        }
        return res.status(200).json({ message: "Otp sent successfully", success: true });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error please try again later", success: false });
    }
});
router.post('/verifyotp', async (req, res) => {
    try {
        let { email, otp } = req.body;
        let result = otpScema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({ error: result.error, message: "Please provide a valid email and otp", success: false });
        }
        let user = await Otp_1.default.findOne({ email: email, otp: otp });
        if (user == null) {
            return res.status(404).json({ message: "Invalid otp", success: false });
        }
        let token = jsonwebtoken_1.default.sign({ email: email }, process.env.JWT_SECRET_KEY || "");
        await User_1.default.findOneAndUpdate({ email: email }, { token: token });
        return res.status(200).json({ message: "Otp verified successfully", token: token, success: true });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error please try again later" });
    }
});
exports.default = router;
