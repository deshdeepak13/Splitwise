import React, { useState } from 'react';

const members = ['Krishna', 'Desh', 'Riya', 'Abhi']; // Replace with dynamic data later
const categories = ['Food', 'Travel', 'Utilities', 'Shopping', 'Other'];

const AddExpense = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [paidBy, setPaidBy] = useState('Krishna');
  const [splitType, setSplitType] = useState('equal');
  const [splitBetween, setSplitBetween] = useState([...members]);
  const [customSplit, setCustomSplit] = useState({});
  const [category, setCategory] = useState('');
  const [receipt, setReceipt] = useState(null);

  const handleSplitChange = (member, value) => {
    setCustomSplit(prev => ({ ...prev, [member]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation and POST logic
    console.log({ amount, description, date, paidBy, splitBetween, splitType, customSplit, category, receipt });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">➕ Add New Expense</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Amount */}
        <input
          type="number"
          placeholder="Amount (₹)"
          className="w-full px-4 py-2 border rounded-xl"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        {/* Description */}
        <input
          type="text"
          placeholder="Description"
          className="w-full px-4 py-2 border rounded-xl"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        {/* Date and Category */}
        <div className="flex gap-4">
          <input
            type="date"
            className="w-1/2 px-4 py-2 border rounded-xl"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <select
            className="w-1/2 px-4 py-2 border rounded-xl"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Paid By */}
        <div>
          <label className="block font-medium mb-1">Paid by:</label>
          <select
            className="w-full px-4 py-2 border rounded-xl"
            value={paidBy}
            onChange={(e) => setPaidBy(e.target.value)}
          >
            {members.map(member => (
              <option key={member} value={member}>{member}</option>
            ))}
          </select>
        </div>

        {/* Split Between */}
        <div>
          <label className="block font-medium mb-1">Split Between:</label>
          <div className="flex flex-wrap gap-2">
            {members.map(member => (
              <label key={member} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={splitBetween.includes(member)}
                  onChange={(e) => {
                    const updated = e.target.checked
                      ? [...splitBetween, member]
                      : splitBetween.filter(m => m !== member);
                    setSplitBetween(updated);
                  }}
                />
                {member}
              </label>
            ))}
          </div>
        </div>

        {/* Split Type */}
        <div>
          <label className="block font-medium mb-1">Split Type:</label>
          <div className="flex gap-4">
            <label>
              <input
                type="radio"
                name="splitType"
                value="equal"
                checked={splitType === 'equal'}
                onChange={(e) => setSplitType(e.target.value)}
              /> Equal
            </label>
            <label>
              <input
                type="radio"
                name="splitType"
                value="custom"
                checked={splitType === 'custom'}
                onChange={(e) => setSplitType(e.target.value)}
              /> Custom
            </label>
          </div>
        </div>

        {/* Custom Split */}
        {splitType === 'custom' && (
          <div className="grid grid-cols-2 gap-2">
            {splitBetween.map(member => (
              <input
                key={member}
                type="number"
                placeholder={`${member}'s share (₹)`}
                className="px-3 py-2 border rounded-xl"
                value={customSplit[member] || ''}
                onChange={(e) => handleSplitChange(member, e.target.value)}
              />
            ))}
          </div>
        )}

        {/* Receipt Upload */}
        <div>
          <label className="block font-medium mb-1">Upload Receipt:</label>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => setReceipt(e.target.files[0])}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default AddExpense;
