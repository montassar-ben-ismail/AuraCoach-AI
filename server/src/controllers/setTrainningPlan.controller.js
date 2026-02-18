import Plan from "../models/Plan.js"
import ExercicesAdmin from "../models/ExercicesAdmin.js"

const getAdminExercices = async () => {
    // 1. Récupérer TOUS les exercices de la DB
    const exercicesDB = await ExercicesAdmin.find({});

    // 2. Initialiser la structure cible
    const exercices = {
        chest: { middle: [], upper: [], lower: [], isolation: [] },
        back: { lats: [], rhomboides: [], low_back: [], multi_angle: [] },
        delt: { FrontDelt: [], LateralDelt: [], RearDelt: [] },
        trapez: [],
        biceps: { longHead: [], shortHead: [], Brachialis: [] },
        triceps: { longHead: [], lateralHead: [], medialHead: [] },
        legs:{quadriceps:[],hamstrings:[],glutes:[],adductors:[],calves:[] }
    };

    // 3. Remplir le tableau dynamiquement
    exercicesDB.forEach(ex => {
        const { muscle, angle, nomExercice } = ex;

        // Verification si le muscle existe dans notre structure
        if (exercices[muscle]) {
            if (Array.isArray(exercices[muscle])) {
                // Pour les cas comme 'trapez' qui est un tableau direct
                exercices[muscle].push(nomExercice);
            } else if (exercices[muscle][angle]) {
                // Pour les cas imbriqués (ex: biceps.shortHead)
                exercices[muscle][angle].push(nomExercice);
            }
        }
    });

    return exercices;
};
const genererProgramme=async(exercices,d)=>{
    let programme
    let typeSplit
    switch (d){
        //exercicesFullBody
        case 1:
            
            programme={
                day1:[exercices.chest.upper[Math.floor(Math.random()*exercices.chest.upper.length)],
                exercices.back.lats[Math.floor(Math.random()*exercices.back.lats.length)],
                exercices.delt.FrontDelt[Math.floor(Math.random()*exercices.delt.FrontDelt.length)],
                exercices.trapez[Math.floor(Math.random()*exercices.trapez.length)],
                exercices.biceps.longHead[Math.floor(Math.random()*exercices.biceps.longHead.length)],
                exercices.triceps.longHead[Math.floor(Math.random()*exercices.triceps.longHead.length)],
                exercices.legs.quadriceps[Math.floor(Math.random()*exercices.legs.quadriceps.length)]
                ],
                day2:"repos",
                day3:"repos",
                day4:"repos",
                day5:"repos",
                day6:"repos",
                day7:"repos"

            }
            typeSplit="Full Body Workout"
            return {"plan":programme,"type":typeSplit}
        //exercices UpperLower
        case 2:
            programme={
                day1:[
                    exercices.chest.upper[Math.floor(Math.random()*exercices.chest.upper.length)],
                    exercices.chest.isolation[Math.floor(Math.random()*exercices.chest.isolation.length)],
                    exercices.back.lats[Math.floor(Math.random()*exercices.back.lats.length)],
                    exercices.back.rhomboides[Math.floor(Math.random()*exercices.back.rhomboides.length)],
                    exercices.delt.FrontDelt[Math.floor(Math.random()*exercices.delt.FrontDelt.length)],
                    exercices.delt.RearDelt[Math.floor(Math.random()*exercices.delt.RearDelt.length)],
                    exercices.biceps.longHead[Math.floor(Math.random()*exercices.biceps.longHead.length)],
                    exercices.triceps.longHead[Math.floor(Math.random()*exercices.triceps.longHead.length)]  
                ],
                day2:"repos",
                day3:"repos",
                day4:[
                    exercices.legs.quadriceps[Math.floor(Math.random()*exercices.legs.quadriceps.length)],
                    exercices.legs.hamstrings[Math.floor(Math.random()*exercices.legs.hamstrings.length)],
                    exercices.legs.glutes[Math.floor(Math.random()*exercices.legs.glutes.length)],
                    exercices.legs.adductors[Math.floor(Math.random()*exercices.legs.adductors.length)],
                    exercices.legs.calves[Math.floor(Math.random()*exercices.legs.calves.length)]
                ],
                day5:"repos",
                day6:"repos",
                day7:"repos"
            }
            typeSplit="Upper Lower Body"
            return {"plan":programme,"type":typeSplit}
        // exercices Push Pull Legs
        case 3:
            programme={
                //push day
                day1:[
                    exercices.chest.middle[Math.floor(Math.random()*exercices.chest.middle.length)],
                    exercices.chest.upper[Math.floor(Math.random()*exercices.chest.upper.length)],
                    exercices.chest.isolation[Math.floor(Math.random()*exercices.chest.isolation.length)],
                    exercices.delt.FrontDelt[Math.floor(Math.random()*exercices.delt.FrontDelt.length)],
                    exercices.delt.LateralDelt[Math.floor(Math.random()*exercices.delt.LateralDelt.length)],
                    exercices.triceps.longHead[Math.floor(Math.random()*exercices.triceps.longHead.length)],
                    exercices.triceps.lateralHead[Math.floor(Math.random()*exercices.triceps.lateralHead.length)]
                ],
                day2:"repos",
                //pull day
                day3:[
                    exercices.back.lats[Math.floor(Math.random()*exercices.back.lats.length)],
                    exercices.back.rhomboides[Math.floor(Math.random()*exercices.back.rhomboides.length)],
                    exercices.back.low_back[Math.floor(Math.random()*exercices.back.low_back.length)],
                    exercices.delt.RearDelt[Math.floor(Math.random()*exercices.delt.RearDelt.length)],
                    exercices.trapez[Math.floor(Math.random()*exercices.trapez.length)],
                    exercices.biceps.longHead[Math.floor(Math.random()*exercices.biceps.longHead.length)],
                    exercices.biceps.shortHead[Math.floor(Math.random()*exercices.biceps.shortHead.length)] 
                ],
                day4:"repos",
                //legs day
                day5:[
                    exercices.legs.quadriceps[Math.floor(Math.random()*exercices.legs.quadriceps.length)],
                    exercices.legs.hamstrings[Math.floor(Math.random()*exercices.legs.hamstrings.length)],
                    exercices.legs.glutes[Math.floor(Math.random()*exercices.legs.glutes.length)],
                    exercices.legs.adductors[Math.floor(Math.random()*exercices.legs.adductors.length)],
                    exercices.legs.calves[Math.floor(Math.random()*exercices.legs.calves.length)]
                ],
                day6:"repos",
                day7:"repos"
            }
            typeSplit="Push Pull Legs"
            return {"plan":programme,"type":typeSplit}
        //exercices Arnolde Split
        case 4:
            programme={
                day1:[
                    exercices.chest.middle[Math.floor(Math.random()*exercices.chest.middle.length)],
                    exercices.chest.upper[Math.floor(Math.random()*exercices.chest.upper.length)],
                    exercices.chest.lower[Math.floor(Math.random()*exercices.chest.lower.length)],
                    exercices.chest.isolation[Math.floor(Math.random()*exercices.chest.isolation.length)],
                    exercices.triceps.longHead[Math.floor(Math.random()*exercices.triceps.longHead.length)],
                    exercices.triceps.lateralHead[Math.floor(Math.random()*exercices.triceps.lateralHead.length)],
                    exercices.triceps.medialHead[Math.floor(Math.random()*exercices.triceps.medialHead.length)],

                ],
                day2:[
                    exercices.back.lats[Math.floor(Math.random()*exercices.back.lats.length)],
                    exercices.back.rhomboides[Math.floor(Math.random()*exercices.back.rhomboides.length)],
                    exercices.back.low_back[Math.floor(Math.random()*exercices.back.low_back.length)],
                    exercices.back.multi_angle[Math.floor(Math.random()*exercices.back.multi_angle.length)],
                    exercices.biceps.longHead[Math.floor(Math.random()*exercices.biceps.longHead.length)],
                    exercices.biceps.shortHead[Math.floor(Math.random()*exercices.biceps.shortHead.length)],
                    exercices.biceps.Brachialis[Math.floor(Math.random()*exercices.biceps.Brachialis.length)]
                ],
                day3:"repos",
                day4:[
                    exercices.delt.FrontDelt[Math.floor(Math.random()*exercices.delt.FrontDelt.length)],
                    exercices.delt.LateralDelt[Math.floor(Math.random()*exercices.delt.LateralDelt.length)],
                    exercices.delt.RearDelt[Math.floor(Math.random()*exercices.delt.RearDelt.length)],
                    exercices.trapez[Math.floor(Math.random()*exercices.trapez.length)]
                ],
                day5:[
                    exercices.legs.quadriceps[Math.floor(Math.random()*exercices.legs.quadriceps.length)],
                    exercices.legs.hamstrings[Math.floor(Math.random()*exercices.legs.hamstrings.length)],
                    exercices.legs.glutes[Math.floor(Math.random()*exercices.legs.glutes.length)],
                    exercices.legs.adductors[Math.floor(Math.random()*exercices.legs.adductors.length)],
                    exercices.legs.calves[Math.floor(Math.random()*exercices.legs.calves.length)]
                ],
                day6:"repos",
                day7:"repos"
            }
            typeSplit="Arnold Split"
            return {"plan":programme,"type":typeSplit}
    }

}
export const setTrainningPlan=async(req,res)=>{
    try{ 
    /**const {userId,nbJourDispo}=req.body**/
    const userId=req.user.id
    const {nbJourDispo}=req.body
    const exercices=await getAdminExercices()
    const{plan,type}=await genererProgramme(exercices,Number(nbJourDispo))
   
    if(!plan){
        return res.status(400).send({status:"not ok",msg:"Nombre des jours non supporté"})
    }
    let planUser=await Plan.findOne({userId:userId})
    if(planUser){
     //si l'utilisateur déja a un plan
        planUser.exercices=plan
        planUser.typeSplit=type
        await planUser.save()
        return res.status(200).send({status:"ok",msg:"mise a jour de programme terminer"})
    }
    //si l'utilisateur na pas un plan d'entrenement
    const newPlan=new Plan({
        userId,
        typeSplit:type,
        exercices:plan
    })
    await newPlan.save()
    return res.status(200).send({status:"ok",msg:"Programme ajouter avec succée"})

}catch(err){
    return res.status(400).send({status:"not ok",msg:"Internal server error",error:err.message})
}
}