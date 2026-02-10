import express from "express";
import authRoutes from"./src/routes/auth.routes.js";
import signupRoutes from"./src/routes/signUp.routes.js";

const app=express();

app.use(express.json());
app.use(("/",authRoutes));
app.use(("/",signupRoutes));
export default app;