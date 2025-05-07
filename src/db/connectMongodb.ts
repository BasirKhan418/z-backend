import mongoose from "mongoose";
const connectMongodb = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI ||"");
        console.log('Connected to MongoDB');
    }
    catch(err){
        console.error('Error connecting to MongoDB:');
    }
};
export default connectMongodb;
