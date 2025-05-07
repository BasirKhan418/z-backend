"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const Whatsapp_1 = __importDefault(require("../../models/Whatsapp"));
//create end point
router.post('/', async (req, res) => {
    try {
        let { domain, whatsappUrl } = req.body;
        let whatsapp = await Whatsapp_1.default.findOne({ domain });
        if (whatsapp) {
            return res.status(400).json({ error: 'Whatsapp group already exists', success: false });
        }
        let newap = new Whatsapp_1.default({
            domain,
            whatsappUrl
        });
        await newap.save();
        return res.status(200).json({ message: 'Whatsapp group reated successfully', success: true });
    }
    catch (error) {
        return res.status(500).json({ error: 'Failed to create whatsapp', success: false });
    }
});
//getting all whatsapp groups
router.get('/', async (req, res) => {
    try {
        let whatsapp = await Whatsapp_1.default.find();
        return res.status(200).json({ whatsapp, success: true });
    }
    catch (error) {
        return res.status(500).json({ error: 'Failed to get whatsapp', success: false });
    }
});
//update whatsapp group
router.put('/', async (req, res) => {
    try {
        let { domain, whatsappUrl } = req.body;
        let whatsapp = await Whatsapp_1.default.findOne({ domain });
        if (!whatsapp) {
            return res.status(400).json({ error: 'Whatsapp group does not exists', success: false });
        }
        whatsapp.whatsappUrl = whatsappUrl;
        await whatsapp.save();
        return res.status(200).json({ message: 'Whatsapp group updated successfully', success: true });
    }
    catch (error) {
        return res.status(500).json({ error: 'Failed to update whatsapp', success: false });
    }
});
exports.default = router;
