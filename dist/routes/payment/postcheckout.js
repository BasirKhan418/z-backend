"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const crypto_1 = __importDefault(require("crypto"));
const router = express_1.default.Router();
const User_1 = __importDefault(require("../../models/User"));
// Middleware to parse URL-encoded form data
router.use(express_1.default.urlencoded({ extended: true }));
router.post('/', async (req, res) => {
    console.log(req.body);
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    // Pass your key_secret here
    const key_secret = process.env.RAZORPAY_KEY_SECRET;
    // STEP 8: Verification & Send Response to User
    // Creating hmac object 
    let hmac = crypto_1.default.createHmac('sha256', key_secret || '');
    // Passing the data to be hashed
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    // Creating the hmac in the required format
    const generated_signature = hmac.digest('hex');
    if (razorpay_signature === generated_signature) {
        await User_1.default.findOneAndUpdate({ orderid: razorpay_order_id }, { ispaid: true, paymentid: razorpay_payment_id });
        res.redirect(302, `${process.env.PUBLIC_HOST}/test`);
    }
    else {
        res.status(400).json({ success: false });
    }
});
exports.default = router;
