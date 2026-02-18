import express from "express";
import {addEx} from "../controllers/addEx.controller.js"
const router=express.Router();
router.post("/addEx",addEx);
export default router