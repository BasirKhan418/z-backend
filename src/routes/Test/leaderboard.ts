import express from 'express';
const router = express.Router();
import User from '../../models/User';
import jwt from "jsonwebtoken";

router.post('/', async (req, res): Promise<any> => {
    try {
        const { token, testid, id } = req.body;
        
        try {
            let result = jwt.verify(token, process.env.JWT_SECRET_KEY || "") as jwt.JwtPayload;
            
            // Get all users sorted by test result
            let users = await User.find({ testid: testid, appeartest: true }).sort({ testResult: -1 });
            // console.log(users);
            
            if (users.length == 0) {
                return res.status(200).json({
                    message: "No Leader board found",
                    success: false
                });
            }

            // Find user's rank
            let userRank = users.findIndex((user) => user._id == id); 
            console.log("userrank is ",userRank);
            
            console.log(userRank);
            console.log(id);
            
            return res.status(200).json({
                message: "Leader board found",
                success: true,
                users: users.slice(0, 10),
                userRank: userRank // Return null if user not found
            });
        } catch (err) {
            return res.status(200).json({
                message: "Malicious activity detected. Session terminated. Please login again.",
                success: false
            });
        }
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong please try again after some time. ISE",
            success: false
        });
    }
});

router.get('/', async (req, res) => {
    res.status(200).json({
        message: "Leader board route working fine",
        success: true
    });
});

export default router;