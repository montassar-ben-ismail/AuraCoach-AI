
//en utilise pour ajouter les exercices dispo dans la DB
import ExercicesAdmin from "../models/ExercicesAdmin.js";


export const addEx=async(req,res)=>{
    const {muscle,angle,nomExercice}=req.body
    if(!muscle || !nomExercice){
        return res.status(400).send({status:"not ok",msg:"Please enter all required data"})
    }
    ExercicesAdmin.findOne({nomExercice:nomExercice}).then((ex)=>{
        if(ex){
            return res.status(400).send({status:"not ok",msg:"exercice existe"})
        }
        const newExercice=new ExercicesAdmin({
            muscle,
            angle,
            nomExercice
        })
        newExercice.save().then((ex)=>{
            res.status(200).send({status:"ok",msg:"Successfull add exercice",ex})
        }).catch((err)=>{
            return res.status(500).send({status:"error",msg:"Internal server error"})
        })
    }).catch((err)=>{
        return res.status(500).send({status:"error",msg:"Internal server error"})
    })
}