"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const SubmitFlow_1 = __importDefault(require("../../models/SubmitFlow"));
//getting submit flow
router.get("/", async (req, res) => {
    try {
        let data = await SubmitFlow_1.default.find({});
        return res.status(200).json({ data: data, success: true });
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error . Please try again after sometime. Application submitted success page issue", success: false });
    }
});
//posting submit flow
router.post("/", async (req, res) => {
    try {
        let data = new SubmitFlow_1.default({
            lastdate: req.body.lastdate,
            examdate: req.body.examdate,
            stipend: req.body.stipend,
            grplink: req.body.grplink,
            startdate: req.body.startdate
        });
        await data.save();
        return res.status(200).json({ message: "Submit Flow created successfully !", success: true });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error . Please try again after sometime. ", success: false });
    }
});
//updating submit flow
router.put("/", async (req, res) => {
    try {
        let data = await SubmitFlow_1.default.findOneAndUpdate({ _id: req.body.id }, {
            lastdate: req.body.lastDate,
            examdate: req.body.examDate,
            stipend: req.body.stipend,
            grplink: req.body.grpLink,
            startdate: req.body.startDate
        });
        return res.status(200).json({ message: "Submit Flow updated successfully !", success: true });
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error . Please try again after sometime.", success: false });
    }
});
exports.default = router;
