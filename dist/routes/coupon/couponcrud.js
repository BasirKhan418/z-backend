"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const Coupon_1 = __importDefault(require("../../models/Coupon"));
router.post('/create', async (req, res) => {
    try {
        let coupon = new Coupon_1.default({
            name: req.body.name,
            code: req.body.code,
            discountPercentage: req.body.discountPercentage,
            couponLimit: req.body.couponLimit,
            totalClaimed: req.body.totalClaimed,
        });
        await coupon.save();
        return res.status(200).json({ data: coupon, success: true, message: "Coupon created successfully" });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error. Please try again after sometime", success: false });
    }
});
//get all coupons
router.get('/getall', async (req, res) => {
    try {
        let coupons = await Coupon_1.default.find();
        return res.status(200).json({ data: coupons, success: true, message: "Coupons fetched successfully" });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error. Please try again after sometime", success: false });
    }
});
//update coupon
router.put('/update', async (req, res) => {
    try {
        let coupon = await Coupon_1.default.findOneAndUpdate({ _id: req.body._id }, {
            name: req.body.name,
            code: req.body.code,
            discountPercentage: req.body.discountPercentage,
            couponLimit: req.body.couponLimit,
            totalClaimed: req.body.totalClaimed,
        }, { new: true });
        return res.status(200).json({ data: coupon, success: true, message: "Coupon updated successfully" });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error. Please try again after sometime", success: false });
    }
});
//verify coupon
router.post('/verify', async (req, res) => {
    try {
        let coupon = await Coupon_1.default.findOne({ code: req.body.code });
        if (!coupon) {
            return res.status(400).json({ message: "Invalid Coupon", success: false });
        }
        if (coupon.totalClaimed >= coupon.couponLimit) {
            return res.status(400).json({ message: "Coupon limit reached", success: false });
        }
        await Coupon_1.default.findOneAndUpdate({
            code: req.body.code
        }, { $inc: { totalClaimed: 1 } });
        return res.status(200).json({ data: coupon, success: true, message: "Coupon verified successfully" });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error. Please try again after sometime", success: false });
    }
});
exports.default = router;
