import express, { json, Request, Response } from 'express';
const router = express.Router();
import User from '../../models/User';
import jwt from "jsonwebtoken";
import Testq from '../../models/Testq';
import Test from '../../models/Test';
import Testend from '../../models/Testend';
import Testqend from '../../models/Testqend';

function getMonthDifferenceFromNow(dateString: string) {
    const givenDate = new Date(dateString);
    const now = new Date();

    // Calculate the difference in years and months
    let yearsDiff = now.getFullYear() - givenDate.getFullYear();
    let monthsDiff = now.getMonth() - givenDate.getMonth();

    // Adjust if the current month is before the given month in the same year
    let totalMonths = yearsDiff * 12 + monthsDiff;

    return totalMonths < 1 ? 0 : totalMonths;
}
router.post('/', async(req:Request, res:Response): Promise<any> => {
    try{
        console.log(req.body)
     let {token} = req.body;
        if(!token){
            return res.status(400).json({message:"Please provide a token",success:false});
        }
        try{
         let decoded:any = jwt.verify(token,process.env.JWT_SECRET_KEY||"");
         let user = await User.findOne({email:decoded.email});
         var statusfortest;
            if(user==null){
                return res.status(404).json({message:"User not found",success:false});
            }
            if(user!=null ){
                if(user.startdate==undefined||user.startdate==""||user.startdate==null){
                    console.log("start date is undefined")
                    statusfortest = "start";
                }
                let res = getMonthDifferenceFromNow(user.startdate)  ;
                console.log(res)
                if(user.month=="1 Month" && res>=1&&user.ispaid){
                    statusfortest = "end";
                }
                else if(user.month=="2 Month" && res>=2&&user.ispaid){
                    statusfortest = "end";
                }
                else if(user.month=="3 Month" && res>=3&&user.ispaid){
                    statusfortest = "end";
                }
                else if(user.appeartest&&user.ispaid){
                    statusfortest = "mid";
                }
                else{
                    statusfortest = "start";
                }

            }
            console.log(statusfortest);
            if(user.token!=token){
                return res.status(401).json({message:"Login detected in another device",success:true,an:true,status:statusfortest});
            }
            //if test is start
            if(statusfortest=="start"){
                let allTests ;
                if(user.domain=="Data Science"){
                 allTests = await Test.findOne({testtitle:"Data Science & Machine Learning"});
                }
                else if (user.domain=="Software Development"){
                    allTests = await Test.findOne({testtitle:"Web Development"});
                }
                else{
                    
                    allTests = await Test.findOne({testtitle:user.domain});
                }
                
                if(allTests==null){
                    return res.status(404).json({message:"Valid user",success:true,user,testStatus:false,test:allTests,status:statusfortest});
                }
                let TestQuestions = await Testq.findOne({testid:allTests._id}).populate('testid');
                if(TestQuestions==null){
                    return res.status(404).json({message:"Valid user",success:true,user,testStatus:false,test:TestQuestions,status:statusfortest});
                }
    
               return res.status(200).json({message:"Valid user",success:true,user,test:TestQuestions,testStatus:true,status:statusfortest});
            }
            //else test is end
            else{
                console.log(user.domain)    
                let allTests ;
                if(user.domain=="Data Science"){
                 allTests = await Test.findOne({testtitle:"Data Science & Machine Learning"});
                }
                else if (user.domain=="Software Development"){
                    allTests = await Test.findOne({testtitle:"Web Development"});
                }
                else{
                    console.log("i am here")
                    allTests = await Testend.findOne({testtitle:user.domain});
                   
                }
            if(allTests==null){
                
                return res.status(404).json({message:"Valid user",success:true,user,testStatus:false,test:allTests,status:statusfortest});
            }
            let TestQuestions = await Testqend.findOne({testid:allTests._id}).populate('testid');
            
            if(TestQuestions==null){
               
                return res.status(404).json({message:"Valid user",success:true,user,testStatus:false,test:TestQuestions,status:statusfortest});
            }
            console.log("all test found",allTests)
            console.log(statusfortest )
           return res.status(200).json({message:"Valid user",success:true,user,test:TestQuestions,testStatus:true,status:statusfortest});
            }
            
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