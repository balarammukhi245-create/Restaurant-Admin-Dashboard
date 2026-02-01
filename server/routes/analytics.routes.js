import express from "express";
import { topSellingItems } from "../controllers/analytics.controller.js";


const router = express.Router();

router.get("/top-sellers", topSellingItems);

export default router;
