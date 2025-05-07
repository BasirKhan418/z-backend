"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const razorpay_1 = __importDefault(require("razorpay"));
const router = express_1.default.Router();
const User_1 = __importDefault(require("../../models/User"));
router.post('/', async (req, res) => {
    let rand = Math.floor(Math.random() * 10000000);
    var instance = new razorpay_1.default({
        key_id: process.env.RAZORPAY_KEY_ID || "",
        key_secret: process.env.RAZORPAY_KEY_SECRET || ""
    });
    var options = {
        amount: req.body.amount * 100, // amount in the smallest currency unit
        currency: "INR",
        receipt: `${rand}`
    };
    try {
        const order = await new Promise((resolve, reject) => {
            instance.orders.create(options, (err, order) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(order);
                }
            });
        });
        console.log(order);
        let updateuser = await User_1.default.findOneAndUpdate({ email: req.body.email }, { orderid: order.id });
        return res.status(200).json({ success: true, order });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
});
exports.default = router;
