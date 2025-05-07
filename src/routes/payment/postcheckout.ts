import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
const router = express.Router();
import User from '../../models/User';

// Middleware to parse URL-encoded form data
router.use(express.urlencoded({ extended: true }));

router.post('/', async (req, res) => {
    console.log(req.body);
    
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Pass your key_secret here
    const key_secret = process.env.RAZORPAY_KEY_SECRET;     

    // STEP 8: Verification & Send Response to User

    // Creating hmac object 
    let hmac = crypto.createHmac('sha256', key_secret || ''); 

    // Passing the data to be hashed
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
      
    // Creating the hmac in the required format
    const generated_signature = hmac.digest('hex');
      
    if (razorpay_signature === generated_signature) {
        await User.findOneAndUpdate(
            { orderid: razorpay_order_id }, 
            { ispaid: true, paymentid: razorpay_payment_id }
        );

        res.redirect(302, `${process.env.PUBLIC_HOST}/test`);
    } else {
        res.status(400).json({ success: false });
    }
});

export default router;
