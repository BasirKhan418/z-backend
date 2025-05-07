import express from "express";
import { Request, Response } from "express";
const router = express.Router();
import User from '../../models/User';
router.post('/', async (req:Request, res:Response): Promise<any> => {
    try{
        let user = await User.find();
        let verifybyid = user.filter((item) => item._id.toString().slice(12,) === req.body.id);
        
        if(verifybyid.length === 0){
            return res.status(400).json({message:"Invalid ID", success:false});
        }
        
        return res.status(200).json({data:verifybyid, success:true});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"Internal Server Error. Please try again after sometime", success:false});
    }
})
export default router;