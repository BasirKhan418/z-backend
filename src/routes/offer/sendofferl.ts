import express from 'express';
const router = express.Router();
import jwt from 'jsonwebtoken';
import User from '../../models/User';
import SendOlUrl from '../../utils/email/SendOlUrl';
router.post('/sendoffer', async (req, res):Promise<any> => {
    let {email,token,url,name,score,month} = req.body;

try{
try{
let verify = jwt.verify(token,process.env.JWT_SECRET_KEY||"");
// let result = await SendOlUrl(email,name,url,score,month);
// if(result){
//     let updateUser = await User.findOneAndUpdate({email:email},{olurl:url,sendmail:true});
//     return res.status(200).json({msg:"Offer letter sent successfully",success:true});
// }
let updateUser = await User.findOneAndUpdate({email:email},{olurl:url});
return res.status(200).json({msg:"Offer letter sent successfully",success:true});
// return res.status(200).json({msg:"Failed to send offer letter",success:false});

}
catch(err){
    return res.status(200).json({msg:"Malicious activity detected try again after sometime",success:false});
}
}
catch(err){
    return res.status(500).json({msg:"Internal server error",success:false});
}

});
export default router;
