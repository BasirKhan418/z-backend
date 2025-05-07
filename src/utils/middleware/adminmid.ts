import Admin from "../../models/Admin";
import jwt from "jsonwebtoken";
const AdminAuth = async (token: string) => {
    try {
        try {
            let decoded: any = jwt.verify(token, process.env.JWT_SECRET_KEY || "");
            let admin = await Admin.findOne({ email: decoded.email });
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
        console.log(err)
        return false;
    }
}
export default AdminAuth;