import express from "express";
import { 
    sendFriendRequest, 
    acceptFriendRequest, 
    cancelFriendRequest, 
    getFriends, 
    getPendingRequests,
    getSentRequests,
    getFriendDetail, 
    removeFriend,
        } from "../controllers/friendController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/list", protect, getFriends);

router.post("/send", protect, sendFriendRequest);

router.post("/accept/:friendshipId", protect, acceptFriendRequest);

router.get("/friend/:friendshipId", protect, getFriendDetail);

router.delete("/cancel/:friendshipId", protect, cancelFriendRequest);

router.delete("/remove/:friendshipId", protect, removeFriend);

router.get("/pending", protect, getPendingRequests);

router.get("/sent", protect, getSentRequests);

export default router;
