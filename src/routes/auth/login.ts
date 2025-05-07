import express from 'express';
import { Request, Response } from 'express';
import {any, z }from 'zod';
import User from '../../models/User';
import jwt from 'jsonwebtoken';
import SendUserOtp from '../../utils/email/UserLogin';
import Otp from '../../models/Otp';
const router = express.Router();
//zod validation
const emailScema = z.object({
    email: z.string().email(),
});
const otpScema = z.object({
    email: z.string().email(),
    otp: z.string().length(6),
});
//send otp

router.post('/login', async(req:Request, res:Response):Promise<any> => {
    try{
    const {email} = req.body;
    const result = emailScema.safeParse(req.body);
    if(!result.success){
        return res.status(400).json({error: result.error,message:"Please provide a valid email",success:false});
    }
    
    
           let user = await User.findOne({email:email.toLowerCase()});

           if(user==null){
            return res.status(404).json({message:"User not found",success:false});
           }
          const resultr = await SendUserOtp(email.toLowerCase(),user.name);
            //if its send otp
            if(!resultr){
                return res.status(500).json({message:"Failed to send otp. Something went wrong",success:false});
            }
            return res.status(200).json({message:"Otp sent successfully",success:true});
       }
catch(err){
    console.log(err)
    return res.status(500).json({message:"Internal server error please try again later",success:false});
}

  
})
router.post('/verifyotp',async(req:Request,res:Response):Promise<any>=>{
    try{
     let {email,otp} = req.body;
     let result = otpScema.safeParse(req.body);
        if(!result.success){
            return res.status(400).json({error: result.error,message:"Please provide a valid email and otp",success:false});
        }
    let user = await Otp.findOne({email:email,otp:otp});
    if(user==null){
        return res.status(404).json({message:"Invalid otp",success:false});
    }
   let token = jwt.sign({email:email},process.env.JWT_SECRET_KEY ||"");
   await User.findOneAndUpdate({email:email},{token:token});
   return res.status(200).json({message:"Otp verified successfully",token:token,success:true});

    }
    catch(error){
        return res.status(500).json({message:"Internal server error please try again later"});
    }
})
export default router;
