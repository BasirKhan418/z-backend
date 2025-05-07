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
        let user = await User_1.default.find();
        let verifybyid = user.filter((item) => item._id.toString().slice(12) === req.body.id);
        if (verifybyid.length === 0) {
            return res.status(400).json({ message: "Invalid ID", success: false });
        }
        return res.status(200).json({ data: verifybyid, success: true });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error. Please try again after sometime", success: false });
    }
});
exports.default = router;
