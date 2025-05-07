import mongoose from "mongoose";
import { Schema } from "mongoose";
const TestQuestionSchemaend = new mongoose.Schema({
 testname:{type:Schema.Types.String,ref:'Testend',default:''},
 testid:{type:Schema.Types.ObjectId,ref:'Testend',default:''},
 question1:[{type:Object,required:true}],
 question2:[{type:Object,default:[{question:"",option1:"",option2:"",option3:"",option4:"",answer:""}]}],
 question3:[{type:Object,default:[{question:"",}]}],
 question4:[{type:Object,default:[{question:"",}]}],
}, { timestamps: true });
export default mongoose.models['Testqend'] || mongoose.model('Testqend', TestQuestionSchemaend   );