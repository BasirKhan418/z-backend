import mongoose from "mongoose";
const SubmitFlowSchema = new mongoose.Schema({
   lastdate:{type:String,required:false},
   examdate:{type:String,required:false},
   stipend:{type:String,required:false},
   grplink:{type:String,required:false},
   startdate:{type:String,required:false},
}, { timestamps: true });

export default mongoose.models[' SubmitFlow'] || mongoose.model(' SubmitFlow',  SubmitFlowSchema );