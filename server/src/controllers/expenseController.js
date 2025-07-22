import Expense from "../models/expenseSchema.js";
import Balance from "../models/balanceSchema.js";
import mongoose from "mongoose";


// Create Expense (Group or Friend)
export const createExpense = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { groupId, friendIds, paidBy, description, amount, splitBetween, splitType, splitDetails, currency } = req.body;

    const expense = await Expense.create([{
      groupId: groupId || null,
      friendIds: friendIds || [],
      paidBy,
      description,
      amount,
      currency,
      splitBetween,
      splitType,
      splitDetails,
    }], { session });

    if (!groupId && friendIds.length === 2) {
      const [user1, user2] = friendIds.sort();
      const otherUser = paidBy.toString() === user1.toString() ? user2 : user1;

      const settlementAmount = splitDetails[otherUser] || 0;

      const adjustedAmount = paidBy.toString() === user1.toString()
        ? settlementAmount
        : -settlementAmount;

      await Balance.findOneAndUpdate(
        { user1, user2 },
        { $inc: { otherBalance: adjustedAmount } },
        { upsert: true, new: true, session }
      );
    }

    await session.commitTransaction();
    session.endSession();

    res.status(201).json(expense[0]);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};



// Get All Expenses (Group + Friend) for a User
export const getUserExpenses = async (req, res) => {
  try {
    const { userId } = req.params;
    const expenses = await Expense.find({
      $or: [
        { paidBy: userId },
        { splitBetween: userId }
      ]
    })
    .sort({ updatedAt: -1 }) // Sort by updatedAt field in descending order
    .populate("paidBy splitBetween friendIds groupId");
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Group Expenses
export const getGroupExpenses = async (req, res) => {
  try {
    const { groupId } = req.params;
    const expenses = await Expense.find({ groupId }).populate("paidBy splitBetween groupId splitDetails");
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Friend Expenses
export const getFriendExpenses = async (req, res) => {
  try {
    const { userId, friendId } = req.params;
    const expenses = await Expense.find({
      groupId: null,
      friendIds: { $all: [userId, friendId] }
    })
      .sort({ updatedAt: -1 }) // Sort by updatedAt field in descending order
      .populate("paidBy", "_id name") // only id and name
      .populate("splitBetween", "_id name") 
      .populate("friendIds", "_id name");

    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Update Expense
export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedExpense = await Expense.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedExpense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Expense
export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    await Expense.findByIdAndDelete(id);
    res.json({ message: "Expense deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
