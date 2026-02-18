import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    googleId:{
        type:String,
        required:false
    },
    estPro:{
        type:Boolean,
        required:false,
    },
    role: {
        type: String,
        required:true
    }
})
export default mongoose.model("User",userSchema);
