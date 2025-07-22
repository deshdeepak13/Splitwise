import React from "react";

const ExpensesTab = ({ expenses, currentUserId }) => {
  const calculateAmountDue = (expense) => {
    // const totalMembers = expense.splitBetween.length;
    const share = expense.splitDetails[currentUserId];

    // console.log("expense");
    // console.log(expense.splitDetails[currentUserId]);
    // console.log(expense);
    if (expense.paidBy._id === currentUserId) {
      // You paid - what you get back from others
      return expense.amount - share;
    } else {
      // Someone else paid - what you owe
      return -share;
    }
  };

  return (
    <div className="p-4 space-y-3 overflow-y-auto scrollbar-hide">
      {expenses.length === 0 ? (
        <p className="text-center text-slate-400">No expenses recorded yet.</p>
      ) : (
        expenses.map((exp) => {
          const amountDue = calculateAmountDue(exp);
          const isPositive = amountDue >= 0;
          
          return (
            <div
              key={exp._id}
              className="bg-slate-800/50 hover:bg-slate-800 p-4 rounded-xl border border-slate-700/50 transition-colors "
            >
              <div className="flex justify-between items-start ">
                <div>
                  <h3 className="font-semibold">{exp.description}</h3>
                  <p className="text-sm text-slate-400 mt-1">
                    {new Date(exp.updatedAt).toLocaleDateString()}
                  </p>
                </div>
                
                <div className="text-right space-y-1">
                  <div className={`text-lg font-bold ${
                    isPositive ? "text-green-400" : "text-red-400"
                  }`}>
                    {isPositive ? `+₹${Math.abs(amountDue)}` : `-₹${Math.abs(amountDue)}`}
                  </div>
                  
                  <div className="text-sm text-slate-400">
                    ₹{exp.amount} paid by {exp.paidBy._id === currentUserId ? "you" : exp.paidBy.name}
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ExpensesTab;