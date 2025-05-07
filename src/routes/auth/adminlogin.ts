import express, { Request, Response } from 'express';
import Admin from '../../models/Admin';
const router = express.Router();
import AdminAuth from '../../utils/middleware/adminmid';
import SendAdminOtp from '../../utils/email/AdminLogin';
import Otp from '../../models/Otp';
import jwt from "jsonwebtoken";
router.post('/signup',async(req:Request,res:Response):Promise<any>=>{
try{
let {email,name,token,password} = req.body;
// let result = await AdminAuth(token);
// if(!result){
//     return res.status(401).json({message:"Unauthorized access ",success:false});
// }
if(!email || !name){
    return res.status(400).json({message:"Please provide email and name",success:false});
}
if(password!=process.env.ADMIN_SIGNUP){
    return res.status(400).json({message:"Please provide a valid password",success:false});
}
let newAdmin = new Admin({email,name});
await newAdmin.save();
return res.status(200).json({message:"Admin created successfully",success:true});
}
catch(err){
    console.log(err)
    return res.status(500).json({message:"Internal server error please try again later",success:false});
}
})
router.post('/login',async(req:Request,res:Response):Promise<any>=>{
try{
let {email} = req.body;
if(!email){
    return res.status(400).json({message:"Please provide email",success:false});
}
let admin = await Admin.findOne({email:email});
if(admin==null){
    return res.status(404).json({message:"Admin not found",success:false});
}
let result = await SendAdminOtp(email,admin.name);
if(!result){
    return res.status(500).json({message:"Failed to send otp. Something went wrong",success:false});
}
return res.status(200).json({message:"Otp sent successfully!",success:true});
}
catch(err){
    console.log(err)
    return res.status(500).json({message:"Internal server error please try again later",success:false});
}
})
router.post('/verifyotp',async(req:Request,res:Response):Promise<any>=>{
    try{
     let {email,otp} = req.body;
     if(!email || !otp){
         return res.status(400).json({message:"Please provide a valid email and otp",success:false});
     }
     let user = await Otp.findOne({email:email,otp:otp});
     if(user==null){
         return res.status(404).json({message:"Invalid otp",success:false});
     }
     let token = jwt.sign({email:email},process.env.JWT_SECRET_KEY || "");
     await Admin.findOneAndUpdate({email:email},{token:token});
     return res.status(200).json({message:"Otp verified successfully",token:token,success:true});
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:"Internal server error please try again later"});
    }
})
export default router;