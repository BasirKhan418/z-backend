import express from "express";
const router = express.Router();
import User from "../../models/User";
import SendApplicationReceipt from "../../utils/email/SendApplicationReceipt";
import SubmitFlow from "../../models/SubmitFlow";
router.get("/submit",async(req,res):Promise<any>=>{
    res.status(200).json({message:"Welcome to the user submit route !"});
})
router.post("/submit",async(req,res):Promise<any>=>{
    try{
      let user = await User.findOne({email:req.body.email.toLowerCase()});
      if(user!=null){
            return res.status(400).json({message:"Already applied for internship . Please try again with different email !",success:false});
      }
      let newuser = new User({
            name:req.body.fullName,
            email:req.body.email.toLowerCase(),
            domain:req.body.internshipProgram,
            month:req.body.duration,
            number:req.body.contactNumber,
            clg:req.body.college,
            gender:req.body.gender,
            qualification:req.body.qualification,
            ayear:req.body.currentYear,
            country:req.body.country,
            skilllevel:req.body.skillLevel,
            source:req.body.source,
        });
        await newuser.save();
        let flow = await SubmitFlow.find();
        await SendApplicationReceipt(req.body.email,req.body.fullName,req.body.internshipProgram,req.body.duration,flow[0].grplink);
        return res.status(200).json({message:"Application submitted successfully !",success:true});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"Internal Server Error . Please try again after sometime.",success:false});
    }
});
export default router;