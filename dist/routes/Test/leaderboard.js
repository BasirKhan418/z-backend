"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const User_1 = __importDefault(require("../../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
router.post('/', async (req, res) => {
    try {
        const { token, testid, id } = req.body;
        try {
            let result = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY || "");
            // Get all users sorted by test result
            let users = await User_1.default.find({ testid: testid, appeartest: true }).sort({ testResult: -1 });
            // console.log(users);
            if (users.length == 0) {
                return res.status(200).json({
                    message: "No Leader board found",
                    success: false
                });
            }
            // Find user's rank
            let userRank = users.findIndex((user) => user._id == id);
            console.log("userrank is ", userRank);
            console.log(userRank);
            console.log(id);
            return res.status(200).json({
                message: "Leader board found",
                success: true,
                users: users.slice(0, 10),
                userRank: userRank // Return null if user not found
            });
        }
        catch (err) {
            return res.status(200).json({
                message: "Malicious activity detected. Session terminated. Please login again.",
                success: false
            });
        }
    }
    catch (err) {
        return res.status(500).json({
            message: "Something went wrong please try again after some time. ISE",
            success: false
        });
    }
});
router.get('/', async (req, res) => {
    res.status(200).json({
        message: "Leader board route working fine",
        success: true
    });
});
exports.default = router;
