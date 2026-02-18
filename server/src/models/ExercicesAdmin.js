import mongoose from "mongoose"
const exercicesSchema=new mongoose.Schema({
    muscle:{
        type:String,
        required:true
    },
    angle:{
        type:String,
        required:false
    },
    nomExercice:{
        type:String,
        required:true
    }
})
export default mongoose.model("ExercicesAdmin",exercicesSchema)