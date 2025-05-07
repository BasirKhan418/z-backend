import express from 'express';
const router = express.Router();
import User from '../../models/User';
import Testq from '../../models/Testq';
import SubmitFlow from '../../models/SubmitFlow';
import jwt from "jsonwebtoken";
router.post('/submit', async (req, res):Promise<any>=> {
try{
const {token,answers,testid} = req.body;
console.log(token,answers,testid);  
try{
let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || "") as jwt.JwtPayload;
let findTest = await Testq.findById({_id:testid});
if(findTest==null){
    return res.status(200).json({message:"Test not found",success:false});
}
let totalcorrect=0;
let total=findTest.question1.length;
findTest.question1.map((item: { answer: string }, index: number) => {
if(item.answer==answers[index]){
    totalcorrect++;
}
})
function convertToISO(dateStr:string) {
    // Split the date string by '/'
    const [day, month, year] = dateStr.split('/');
    
    // Create a new Date object
    // Note: months in JS Date are 0-indexed, so we subtract 1 from month
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    
    // Convert to ISO string (this will give you the full ISO format)
    return date.toISOString();
  }
const totalp = Math.floor((totalcorrect/total)*100);
console.log(totalp,totalcorrect,total);
let date = await SubmitFlow.find({});
let startdate = convertToISO(date[0].startdate);
let user =await User.findOneAndUpdate({email:decoded.email},{testResult:totalp,appeartest:true,testcorrect:`${totalcorrect}/${total}`,testid:testid,startdate:startdate});
if(user==null){
    return res.status(200).json({message:"User not found try again",success:false});
}
return res.status(200).json({message:"Test submitted successfully",success:true});

}
catch(err){
    return res.status(500).json({message:"Malicious activity detected. Session terminated.Please login again.",success:false});
}

}
catch(err){
    return res.status(500).json({message:"Something went wrong please try again after some time.ISE",success:false});
}
})
router.get('/submit',async(req,res)=>{
    res.status(200).json({message:"Test route working fine",success:true});
})
export default router;