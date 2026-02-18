import MetriquePhysique from "../models/MetriquePhysique.js"
import Target from "../models/Target.js"


const calculateCalorie=(gender,AF,height,weight,age,target)=>{
    let BMR=0
    let cal=0
    let dailyCalorie=0
    let prot=0
    let fat=0
    let carb=0
    let fatCal=0
    let protCal=0
    let carbCal=0
    if(gender=="male"){
        BMR=(10*Number(weight))+(6.25*Number(height))-(5*Number(age))+5
    }else{
        BMR=(10*Number(weight))+(6.25*Number(height))-(5*Number(age))-161
    }
    switch (AF){
        case 1.3:
            cal=BMR*1.3
            break
        case 1.375:
            cal=BMR*1.375
            break
        case 1.45:
            cal=BMR*1.45
            break
        case 1.55:
            cal=BMR*1.55
            break
    }
    switch(target){
        case "lose weight":
            dailyCalorie=cal-500
            fat=Number(weight)
            prot=Number(weight)*2.2
            fatCal=fat*9
            protCal=prot*4
            carbCal=dailyCalorie-(fatCal+protCal)
            carb=carbCal/4
            break
        case "lose fat":
            dailyCalorie=cal-250
            fat=Number(weight)
            prot=Number(weight)*2
            fatCal=fat*9
            protCal=prot*4
            carbCal=dailyCalorie-(fatCal+protCal)
            carb=carbCal/4
            break
        case "stay healthy":
            dailyCalorie=cal
            fat=Number(weight)
            prot=Number(weight)*1.2
            fatCal=fat*9
            protCal=prot*4
            carbCal=dailyCalorie-(fatCal+protCal)
            carb=carbCal/4
            break
        case "gain muscle":
            dailyCalorie=cal+250
            fat=Number(weight)
            prot=Number(weight)*1.7
            fatCal=fat*9
            protCal=prot*4
            carbCal=dailyCalorie-(fatCal+protCal)
            carb=carbCal/4
            break
        case "gain weight":
            dailyCalorie=cal+500
            fat=Number(weight)
            prot=Number(weight)*1.7
            fatCal=fat*9
            protCal=prot*4
            carbCal=dailyCalorie-(fatCal+protCal)
            carb=carbCal/4
            break          
    }
    return {BMR,dailyCalorie,fat,prot,carb,fatCal,protCal,carbCal}
}

export const setMetriquePhysique=async(req,res)=>{
    try{
        const userId=req.user.id
        const {height,weight,age,gender,AF,target}=req.body
        let userMetrique=await MetriquePhysique.findOne({userId:userId})
        let userTarget=await Target.findOne({userId:userId})
        if(!userMetrique && !userTarget){
            //si l'utilisateur n'as pas des metrique physique et target enregistrer dans les deux tableau
            const {BMR,dailyCalorie,fat,prot,carb,fatCal,protCal,carbCal}=calculateCalorie(gender,AF,height,weight,age,target)
            const newUserMetrique=new MetriquePhysique({
                userId:userId,
                height:height,
                weight:weight,
                age:age,
                gender:gender,
                AF:AF,
                target:target,
                BMR:BMR
            })
            const newUserTarget=new Target({
                userId:userId,
                dailyCalorie:dailyCalorie,
                protCible:prot,
                fatCible:fat,
                carbCible:carb,
                protCalorie:protCal,
                fatCalorie:fatCal,
                carbCalorie:carbCal
            })

            await newUserMetrique.save()//enregistrement de metrique dans le tab MetriquePhysique
            await newUserTarget.save()//enregistrement de target dans le tab Target
            return res.status(200).send({status:"ok",message:"metrique et objectif ajouter avec succée"})
        }
        //si l'utilisateur a des metrique et target on doit metre a jour c tt
        else{
            if(height!=userMetrique.height && height!=null){
                userMetrique.height=height
            }
            if(weight!=userMetrique.weight && weight!=null){
                userMetrique.weight=weight
            }
            if(age!=userMetrique.age && age!=null){
                userMetrique.age=age
            }
            if(gender!=userMetrique.gender && gender!=null){
                userMetrique.gender=gender
            }
            if(AF!=userMetrique.AF && AF!=null){
                userMetrique.AF=AF
            }
            if(target!=userMetrique.target && target!=null){
                userMetrique.target=target
            }
            const {BMR,dailyCalorie,fat,prot,carb,fatCal,protCal,carbCal}=calculateCalorie(userMetrique.gender,userMetrique.AF,userMetrique.height,userMetrique.weight,userMetrique.age,userMetrique.target)
            userMetrique.BMR=BMR
           
            userTarget.dailyCalorie=dailyCalorie
            userTarget.protCible=prot
            userTarget.fatCible=fat
            userTarget.carbCible=carb
            userTarget.protCalorie=protCal
            userTarget.fatCalorie=fatCal
            userTarget.carbCalorie=carbCal

            await userMetrique.save()
            await userTarget.save()
            return res.status(200).send({status:"ok",message:"mise a jour effectuer avec succée"})
        }
    }catch(err){
        return res.status(400).send({status:"not ok",message:"Internal server error"})
        }
}