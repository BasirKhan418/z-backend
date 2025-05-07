"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const User_1 = __importDefault(require("../../models/User"));
router.get('/newleads', async (req, res) => {
    try {
        let find = await User_1.default.find({
            $and: [
                { $or: [{ appeartest: undefined }, { appeartest: false }] },
                { $or: [{ sendmail: undefined }, { sendmail: false }] }
            ]
        });
        return res.status(200).json({ data: find, success: true });
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error . Please try again after sometime", success: false });
    }
});
router.get('/accepted', async (req, res) => {
    try {
        let find = await User_1.default.find({ ispaid: true, appeartest: true });
        return res.status(200).json({ data: find, success: true });
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error . Please try again after sometime", success: false });
    }
});
router.get('/mailsended', async (req, res) => {
    try {
        let find = await User_1.default.find({
            $or: [
                { ispaid: undefined },
                { ispaid: false }
            ],
            sendmail: true
        });
        return res.status(200).json({ data: find, success: true });
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error . Please try again after sometime", success: false });
    }
});
exports.default = router;
