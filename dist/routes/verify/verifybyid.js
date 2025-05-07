"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const User_1 = __importDefault(require("../../models/User"));
router.post('/', async (req, res) => {
    try {
        const user = await User_1.default.findById(req.body.id);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }
        return res.status(200).json({
            message: "User found",
            success: true,
            user: user
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
});
exports.default = router;
