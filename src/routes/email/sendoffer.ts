import express from "express";
const router = express.Router();
import User from "../../models/User";
import SendOlUrl from "../../utils/email/SendOlUrl";
import SendCompletionCertificate from "../../utils/email/SendCompletionCertificate";
import SendTrainingCompletionCertificate from "../../utils/email/SendTrainingCompletionCertificate";
//send offer letter endpoint
router.get("/ol",async(req,res):Promise<any>=>{
try{
    let remaining = await User.find({
        appeartest: true,
        $and: [
            { ispaid: { $ne: true } },
            { sendmail: { $ne: true } }
        ]
    });
//if its not found
if(remaining.length === 0){
    return res.status(400).json({message:"No users found to send offer letter ",success:false});
}
console.log("hit"); 
console.log(remaining.length);
let count:number = 0;
let fail:number = 0;
//if its found;
        remaining.forEach(async(user)=>{
            console.log(user);
            console.log(user.olurl)
     let send =  await SendOlUrl(user.email,user.name,user.olurl,user.testResult,user._id);
     console.log(send);
     if(send){
            ++count;
            await User.findByIdAndUpdate(user._id,{sendmail:true});
     }
     else{
        ++fail;
     }
});
console.log(count);
console.log(fail);
return res.status(200).json({message:`${count} offer letters sent successfully and ${fail} failed`,success:true,count:count,fail:fail});
}
catch(err){
    console.log(err);
    res.status(500).json({message:"Internal Server Error",success:false});
}
})
//send completion certificate endpoint
router.get("/cc",async(req,res):Promise<any>=>{
    try{
        let remaining = await User.find({
            endappeartest: true,
            $and: [
                { ispaid: { $ne: false } },
                { ccsendmail: { $ne: true } }
            ]
        });
    //if its not found
    if(remaining.length === 0){
        return res.status(400).json({message:"No users found to send offer letter ",success:false});
    }
    console.log("hit"); 
    console.log(remaining.length);
    let count:number = 0;
    let fail:number = 0;
    //if its found;
            remaining.forEach(async(user)=>{
         console.log(user);
         let send = await SendCompletionCertificate(user.email,user.name,user.ccurl);
         if(send){
                ++count;
                await User.findByIdAndUpdate(user._id,{ccsendmail:true});
         }
         else{
            ++fail;
         }
    });
    console.log(count);
    console.log(fail);
    return res.status(200).json({message:`${count} Completion certificate sent successfully and ${fail} failed`,success:true,count:count,fail:fail});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Internal Server Error",success:false});
    }
})
//send training certificate endpoint
router.get("/tr",async(req,res):Promise<any>=>{
    try{
        let remaining = await User.find({
            endappeartest: true,
            $and: [
                { ispaid: { $ne: false } },
                { trsendmail: { $ne: true } }
            ]
        });
    //if its not found
    if(remaining.length === 0){
        return res.status(400).json({message:"No users found to send offer letter ",success:false});
    }
    console.log("hit"); 
    console.log(remaining.length);
    let count:number = 0;
    let fail:number = 0;
    //if its found;
            remaining.forEach(async(user)=>{
         console.log(user);
         let send = await SendTrainingCompletionCertificate(user.email,user.name,user.trurl);
         if(send){
                ++count;
                await User.findByIdAndUpdate(user._id,{trsendmail:true});
         }
         else{
            ++fail;
         }
    });
    console.log(count);
    console.log(fail);
    return res.status(200).json({message:`${count} Completion certificate sent successfully and ${fail} failed`,success:true,count:count,fail:fail});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Internal Server Error",success:false});
    }
})
export default router;