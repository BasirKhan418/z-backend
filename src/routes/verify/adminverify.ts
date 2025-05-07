import express, { json, Request, Response } from 'express';
const router = express.Router();
import Admin from '../../models/Admin';
import jwt from "jsonwebtoken";
router.post('/', async(req:Request, res:Response): Promise<any> => {
    try{
        console.log(req.body)
     let {token} = req.body;
        if(!token){
            return res.status(400).json({message:"Please provide a token",success:false});
        }
        try{
         let decoded:any = jwt.verify(token,process.env.JWT_SECRET_KEY||"");
         console.log(decoded)
         let user = await Admin.findOne({email:decoded.email});
         console.log(user)
            if(user==null){
                return res.status(404).json({message:"User not found",success:false});
            }
            if(user.token!=token){
                return res.status(401).json({message:"Login detected in another device",success:true,an:true});
            }
           return res.status(200).json({message:"Valid user",success:true,user});
        }
        catch(err){
            console.log(err)
            return res.status(500).json({message:"Malicious activity or tampering detected",success:false});
        }
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:"Internal server error please try again later",success:false});
    }
});
export default router;