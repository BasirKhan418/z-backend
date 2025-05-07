import express from 'express';
const router = express.Router();
import User from '../../models/User';
import jwt from "jsonwebtoken";
router.post('/', async (req, res):Promise<any>=> {
try{
const {token,domain ,month} = req.body;
try{
let result = jwt.verify(token, process.env.JWT_SECRET_KEY||"") as jwt.JwtPayload;
let users = await User.find({domain:domain,month:month});
if(users.length==0){
    return res.status(200).json({message:"No Leader board found",success:false});
}
return res.status(200).json({message:"Leader board found",success:true,users:users});
}
catch(err){
    
    return res.status(200).json({message:"Malicious activity detected. Session terminated.Please login again.",success:false});
}

}
catch(err){
    return res.status(500).json({message:"Something went wrong please try again after some time.ISE",success:false});
}
})
router.get('/',async(req,res)=>{
    res.status(200).json({message:"Leader board route working fine",success:true});
})
export default router;