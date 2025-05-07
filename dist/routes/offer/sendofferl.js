"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../../models/User"));
router.post('/sendoffer', async (req, res) => {
    let { email, token, url, name, score, month } = req.body;
    try {
        try {
            let verify = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY || "");
            // let result = await SendOlUrl(email,name,url,score,month);
            // if(result){
            //     let updateUser = await User.findOneAndUpdate({email:email},{olurl:url,sendmail:true});
            //     return res.status(200).json({msg:"Offer letter sent successfully",success:true});
            // }
            let updateUser = await User_1.default.findOneAndUpdate({ email: email }, { olurl: url });
            return res.status(200).json({ msg: "Offer letter sent successfully", success: true });
            // return res.status(200).json({msg:"Failed to send offer letter",success:false});
        }
        catch (err) {
            return res.status(200).json({ msg: "Malicious activity detected try again after sometime", success: false });
        }
    }
    catch (err) {
        return res.status(500).json({ msg: "Internal server error", success: false });
    }
});
exports.default = router;
