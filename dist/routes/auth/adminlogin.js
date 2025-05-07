"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Admin_1 = __importDefault(require("../../models/Admin"));
const router = express_1.default.Router();
const AdminLogin_1 = __importDefault(require("../../utils/email/AdminLogin"));
const Otp_1 = __importDefault(require("../../models/Otp"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
router.post('/signup', async (req, res) => {
    try {
        let { email, name, token, password } = req.body;
        // let result = await AdminAuth(token);
        // if(!result){
        //     return res.status(401).json({message:"Unauthorized access ",success:false});
        // }
        if (!email || !name) {
            return res.status(400).json({ message: "Please provide email and name", success: false });
        }
        if (password != process.env.ADMIN_SIGNUP) {
            return res.status(400).json({ message: "Please provide a valid password", success: false });
        }
        let newAdmin = new Admin_1.default({ email, name });
        await newAdmin.save();
        return res.status(200).json({ message: "Admin created successfully", success: true });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error please try again later", success: false });
    }
});
router.post('/login', async (req, res) => {
    try {
        let { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Please provide email", success: false });
        }
        let admin = await Admin_1.default.findOne({ email: email });
        if (admin == null) {
            return res.status(404).json({ message: "Admin not found", success: false });
        }
        let result = await (0, AdminLogin_1.default)(email, admin.name);
        if (!result) {
            return res.status(500).json({ message: "Failed to send otp. Something went wrong", success: false });
        }
        return res.status(200).json({ message: "Otp sent successfully!", success: true });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error please try again later", success: false });
    }
});
router.post('/verifyotp', async (req, res) => {
    try {
        let { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({ message: "Please provide a valid email and otp", success: false });
        }
        let user = await Otp_1.default.findOne({ email: email, otp: otp });
        if (user == null) {
            return res.status(404).json({ message: "Invalid otp", success: false });
        }
        let token = jsonwebtoken_1.default.sign({ email: email }, process.env.JWT_SECRET_KEY || "");
        await Admin_1.default.findOneAndUpdate({ email: email }, { token: token });
        return res.status(200).json({ message: "Otp verified successfully", token: token, success: true });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error please try again later" });
    }
});
exports.default = router;
