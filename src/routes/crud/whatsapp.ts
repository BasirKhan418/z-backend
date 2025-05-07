import express from 'express';
const router = express.Router();
import Whatsapp from '../../models/Whatsapp';
//create end point
router.post('/', async (req, res):Promise<any> => {
try{
    let { domain, whatsappUrl } = req.body;
let whatsapp = await Whatsapp.findOne({ domain });
if (whatsapp) {
    return res.status(400).json({ error: 'Whatsapp group already exists' ,success:false});
}
let newap = new Whatsapp({
domain,
whatsappUrl
});
await newap.save();
return res.status(200).json({ message: 'Whatsapp group reated successfully' ,success:true});
}
catch (error) {
    return res.status(500).json({ error: 'Failed to create whatsapp' ,success:false});
}
})
//getting all whatsapp groups
router.get('/', async (req, res):Promise<any> => {
try{
    let whatsapp = await Whatsapp.find();
return res.status(200).json({ whatsapp ,success:true});
}
catch (error) {
    return res.status(500).json({ error: 'Failed to get whatsapp' ,success:false});
}
})
//update whatsapp group
router.put('/', async (req, res):Promise<any> => {
try{
    let { domain, whatsappUrl } = req.body;
let whatsapp = await Whatsapp.findOne({ domain });
if (!whatsapp) {
    return res.status(400).json({ error: 'Whatsapp group does not exists' ,success:false});
}
whatsapp.whatsappUrl = whatsappUrl;
await whatsapp.save();  
return res.status(200).json({ message: 'Whatsapp group updated successfully' ,success:true});
}
catch (error) {
    return res.status(500).json({ error: 'Failed to update whatsapp' ,success:false});
}
});
export default router;