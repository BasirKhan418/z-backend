import express from 'express';
import Razorpay from 'razorpay';
const router = express.Router();
import User from '../../models/User';
router.post('/', async (req, res):Promise<any>=> {
    let rand = Math.floor(Math.random() * 10000000);

    var instance = new Razorpay({ 
      key_id: process.env.RAZORPAY_KEY_ID ||"", 
      key_secret: process.env.RAZORPAY_KEY_SECRET||"" 
    });
    var options = {
      amount: req.body.amount * 100,  // amount in the smallest currency unit
      currency: "INR",
      receipt: `${rand}`
    };
  
    try {
      interface RazorpayOrder {
        id: string;
        [key: string]: any;
      }
      const order = await new Promise<RazorpayOrder>((resolve, reject) => {
        instance.orders.create(options, (err, order) => {
          if (err) {
            reject(err);
          } else {
            resolve(order);
          }
        });
      });
       console.log(order);
       let updateuser = await User.findOneAndUpdate({email:req.body.email},{orderid:order.id});
      return res.status(200).json({ success: true, order });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Something went wrong" });
    }
});
export default router;