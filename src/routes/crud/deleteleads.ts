import express from 'express';
const router = express.Router();
import User from '../../models/User';
import mongoose from 'mongoose';
router.post('/', async (req, res):Promise<any> => {
    try{
        console.log(req.body.emails);
     let data = await User.deleteMany({ 
        _id: { 
          $in: req.body.emails.map((id: any) => new mongoose.Types.ObjectId(id)) 
        } 
      });
     console.log(data)
     return res.status(200).json({message:"Leads Deleted Successfully",success:true})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:"Internal Server Error",success:false})
    }
})
export default router;