// controllers/balanceController.js
import Balance from "../models/balanceSchema.js";

export const getBalance = async (req, res) => {
  try {
    const { userId, friendId } = req.params;

    // Always sort to get user1 and user2
    const [user1, user2] = [userId, friendId].sort();

    const balance = await Balance.findOne({ user1, user2 });

    if (!balance) {
      return res.status(200).json({
        otherBalance: 0,
        groupBalances: {},
        message: "No previous transactions, balance is zero.",
      });
    }

    const isUser1 = userId.toString() === user1.toString();
    const otherBalance = isUser1 ? balance.otherBalance : -balance.otherBalance;

    // const groupBalances = {};
    // for (const [groupId, bal] of balance.groupBalances.entries()) {
    //   groupBalances[groupId] = isUser1 ? bal : -bal;
    // }

    res.json({
      otherBalance,
    //   groupBalances,
      lastSettledAt: balance.lastSettledAt,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
