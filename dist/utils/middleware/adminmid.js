"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Admin_1 = __importDefault(require("../../models/Admin"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AdminAuth = async (token) => {
    try {
        try {
            let decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY || "");
            let admin = await Admin_1.default.findOne({ email: decoded.email });
            if (admin == null) {
                return false;
            }
            return true;
        }
        catch (err) {
            return false;
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
};
exports.default = AdminAuth;
