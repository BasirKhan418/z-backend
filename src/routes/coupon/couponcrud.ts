import express from "express";
import { Request, Response } from "express";
const router = express.Router();
import Coupon from '../../models/Coupon';
router.post('/create', async (req:Request, res:Response): Promise<any> => {
    try{
        let coupon = new Coupon({
            name: req.body.name,
            code: req.body.code,
            discountPercentage: req.body.discountPercentage,
            couponLimit: req.body.couponLimit,
            totalClaimed: req.body.totalClaimed,
        });
        await coupon.save();
        return res.status(200).json({data:coupon, success:true,message:"Coupon created successfully"});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"Internal Server Error. Please try again after sometime", success:false});
    }
})
//get all coupons
router.get('/getall', async (req:Request, res:Response): Promise<any> => {
    try{
        let coupons = await Coupon.find();
        return res.status(200).json({data:coupons, success:true,message:"Coupons fetched successfully"});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"Internal Server Error. Please try again after sometime", success:false});
    }
})
//update coupon
router.put('/update', async (req:Request, res:Response): Promise<any> => {
    try{
        let coupon = await Coupon.findOneAndUpdate({_id:req.body._id},{
            name: req.body.name,
            code: req.body.code,
            discountPercentage: req.body.discountPercentage,
            couponLimit: req.body.couponLimit,
            totalClaimed: req.body.totalClaimed,
        },{new:true});
        return res.status(200).json({data:coupon, success:true,message:"Coupon updated successfully"});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"Internal Server Error. Please try again after sometime", success:false});
    }
})
//verify coupon
router.post('/verify', async (req:Request, res:Response): Promise<any> => {
    try{
        let coupon = await Coupon.findOne({code:req.body.code});
        if(!coupon){
            return res.status(400).json({message:"Invalid Coupon", success:false});
        }
        if(coupon.totalClaimed >= coupon.couponLimit){
            return res.status(400).json({message:"Coupon limit reached", success:false});
        }
        await Coupon.findOneAndUpdate({
            code:req.body.code
        },{ $inc: { totalClaimed: 1 } });
        return res.status(200).json({data:coupon, success:true,message:"Coupon verified successfully"});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"Internal Server Error. Please try again after sometime", success:false});
    }
}
)

export default router;