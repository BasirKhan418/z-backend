import express from 'express';
const router = express.Router();
import User from '../../models/User';
import { Request, Response } from 'express';

router.post('/', async (req: Request, res: Response):Promise<any> => {
    try {
        const user = await User.findById(req.body.id);
        
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }
        
        return res.status(200).json({
            message: "User found",
            success: true,
            user: user
        });
    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
});
export default router;