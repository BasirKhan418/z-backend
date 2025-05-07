"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const User_1 = __importDefault(require("../../models/User"));
const mongoose_1 = __importDefault(require("mongoose"));
router.post('/', async (req, res) => {
    try {
        console.log(req.body.emails);
        let data = await User_1.default.deleteMany({
            _id: {
                $in: req.body.emails.map((id) => new mongoose_1.default.Types.ObjectId(id))
            }
        });
        console.log(data);
        return res.status(200).json({ message: "Leads Deleted Successfully", success: true });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
});
exports.default = router;
