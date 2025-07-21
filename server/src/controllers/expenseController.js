import Expense from "../models/expenseSchema.js";

// Create Expense (Group or Friend)
export const createExpense = async (req, res) => {
  try {
    const { groupId, friendIds, paidBy, description, amount, splitBetween, splitType, splitDetails, currency } = req.body;
    const expense = await Expense.create({
      groupId: groupId || null,
      friendIds: friendIds || [],
      paidBy,
      description,
      amount,
      currency,
      splitBetween,
      splitType,
      splitDetails,
    });
    res.status(201).json(expense);
  } catch (error) {
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
    }).populate("paidBy splitBetween friendIds groupId");
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
    }).populate("paidBy splitBetween friendIds");
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
