import express from "express";
import {
  createExpense,
  getUserExpenses,
  getGroupExpenses,
  getFriendExpenses,
  updateExpense,
  deleteExpense,
} from "../controllers/expenseController.js";

const router = express.Router();

// Create Expense (Group/Friend)
router.post("/create", createExpense);

// Get all expenses for user (group + friend)
router.get("/user/:userId", getUserExpenses);

// Get group expenses
router.get("/group/:groupId", getGroupExpenses);

// Get friend expenses between two users
router.get("/friend/:userId/:friendId", getFriendExpenses);

// Update expense
router.put("/:id", updateExpense);

// Delete expense
router.delete("/:id", deleteExpense);

export default router;
