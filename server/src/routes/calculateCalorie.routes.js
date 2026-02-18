import express from "express";
import {calculateCalorie} from "../controllers/calculateCalorie.controller.js"
const router=express.Router();
router.post("/calorie",calculateCalorie);
export default router