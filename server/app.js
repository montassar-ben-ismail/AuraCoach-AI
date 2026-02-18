import express from "express";
import authRoutes from"./src/routes/auth.routes.js";
import signupRoutes from"./src/routes/signUp.routes.js";
import addExRoutes from"./src/routes/addEx.routes.js";
import setTrainningPlanRoutes from "./src/routes/setTrainningPlan.routes.js"
import getTrainningPlanRoutes from "./src/routes/getTrainningPlan.routes.js"
import setMetriquePhysique from "./src/routes/setMetriquePhysique.routes.js"
const app=express();

app.use(express.json());
app.use(("/",authRoutes));
app.use(("/",signupRoutes));
app.use(("/",addExRoutes))
app.use(("/",setTrainningPlanRoutes))
app.use(("/",getTrainningPlanRoutes))
app.use(("/",setMetriquePhysique))
export default app;