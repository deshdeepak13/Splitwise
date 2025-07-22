// routes/balanceRoutes.js
import express from "express";
import { getFriendBalance } from "../controllers/balanceController.js";

const router = express.Router();

router.get("/:userId/:friendId", getFriendBalance);

export default router;
