import express from 'express';
const router = express.Router();
import User from '../../models/User';
router.get('/newleads', async (req, res): Promise<any> => {
    try{
        let find = await User.find({
            $and: [
              { $or: [{ appeartest: undefined }, { appeartest: false }] },
              { $or: [{ sendmail: undefined }, { sendmail: false }] }
            ]
          });
    return res.status(200).json({data:find,success:true});
    }
    catch(err){
        return res.status(500).json({message:"Internal Server Error . Please try again after sometime",success:false});
    }
});

router.get('/accepted', async (req, res): Promise<any> => {
    try{
    let find = await User.find({ispaid:true,appeartest:true});
    return res.status(200).json({data:find,success:true});
    }
    catch(err){
        return res.status(500).json({message:"Internal Server Error . Please try again after sometime",success:false});
    }
});

router.get('/mailsended', async (req, res): Promise<any> => {
    try{
        let find = await User.find({
            $or: [
              { ispaid: undefined },
              { ispaid: false }
            ],
            sendmail: true
          });
    return res.status(200).json({data:find,success:true});
    }
    catch(err){
        return res.status(500).json({message:"Internal Server Error . Please try again after sometime",success:false});
    }
});

export default router;