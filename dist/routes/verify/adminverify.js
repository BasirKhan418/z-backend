"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const Admin_1 = __importDefault(require("../../models/Admin"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        let { token } = req.body;
        if (!token) {
            return res.status(400).json({ message: "Please provide a token", success: false });
        }
        try {
            let decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY || "");
            console.log(decoded);
            let user = await Admin_1.default.findOne({ email: decoded.email });
            console.log(user);
            if (user == null) {
                return res.status(404).json({ message: "User not found", success: false });
            }
            if (user.token != token) {
                return res.status(401).json({ message: "Login detected in another device", success: true, an: true });
            }
            return res.status(200).json({ message: "Valid user", success: true, user });
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
