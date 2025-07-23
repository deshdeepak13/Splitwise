import React from 'react';

const BalanceInfo = ({ balance }) => {
  if (balance > 0) {
    return <span className="text-emerald-400">Owes you ₹{balance}</span>;
  }
  if (balance < 0) {
    return <span className="text-rose-400">You owe ₹{Math.abs(balance)}</span>;
  }
  return <span className="text-gray-500">Settled up</span>;
};

export default BalanceInfo;