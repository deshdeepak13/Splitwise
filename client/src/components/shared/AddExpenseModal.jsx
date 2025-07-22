import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const CURRENCY_OPTIONS = [
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
];

const CATEGORIES = [
  "Food", "Travel", "Utilities", "Shopping", 
  "Rent", "Groceries", "Entertainment", "Other"
];

const AddExpenseModal = ({
  isOpen,
  onClose,
  onExpenseAdded,
  friend,
  currentUserId,
  token,
}) => {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    date: new Date(),
    category: "",
    paidBy: currentUserId,
    splitType: "equal",
    selectedSplitMembers: [],
    customAmounts: {},
    currency: "INR",
  });

  const [attachment, setAttachment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const allParticipants = [
    { id: currentUserId, name: "You" },
    { id: friend.friendId, name: friend.name },
  ];

  useEffect(() => {
    if (friend && currentUserId) {
      setFormData(prev => ({
        ...prev,
        selectedSplitMembers: allParticipants.map(p => p.id)
      }));
    }
  }, [friend, currentUserId]);

  useEffect(() => {
    if (formData.splitType === "equal" && formData.amount && formData.selectedSplitMembers.length > 0) {
      const numSelected = formData.selectedSplitMembers.length;
      const parsedAmount = parseFloat(formData.amount);
      
      if (!isNaN(parsedAmount)) {
        const equalShare = (parsedAmount / numSelected).toFixed(2);
        const newCustomAmounts = {};
        formData.selectedSplitMembers.forEach(memberId => {
          newCustomAmounts[memberId] = equalShare;
        });
        setFormData(prev => ({ ...prev, customAmounts: newCustomAmounts }));
      }
    }
  }, [formData.amount, formData.splitType, formData.selectedSplitMembers]);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAmountChange = (value) => {
    if (/^\d*\.?\d*$/.test(value)) {
      handleChange('amount', value);
    }
  };

  const handleSplitMemberChange = (memberId) => {
    const newSelected = formData.selectedSplitMembers.includes(memberId)
      ? formData.selectedSplitMembers.filter(id => id !== memberId)
      : [...formData.selectedSplitMembers, memberId];
    
    handleChange('selectedSplitMembers', newSelected);
  };

  const handleCustomAmountChange = (memberId, value) => {
    if (/^\d*\.?\d*$/.test(value)) {
      handleChange('customAmounts', {
        ...formData.customAmounts,
        [memberId]: value
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const parsedAmount = parseFloat(formData.amount);

    if (!formData.amount || isNaN(parsedAmount) || parsedAmount <= 0) {
      newErrors.amount = "Enter a valid amount";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description required";
    }
    if (formData.selectedSplitMembers.length < 1) {
      newErrors.split = "Select at least one person";
    }

    if (formData.splitType === "exact") {
      let total = 0;
      formData.selectedSplitMembers.forEach(memberId => {
        const val = parseFloat(formData.customAmounts[memberId]);
        if (isNaN(val) || val <= 0) {
          newErrors[`custom_${memberId}`] = "Invalid amount";
        } else {
          total += val;
        }
      });

      if (Math.abs(total - parsedAmount) > 0.01) {
        newErrors.splitTotal = "Split amounts must equal total";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    const splitDetails = {};
    if (formData.splitType === "equal") {
      const share = (parseFloat(formData.amount) / formData.selectedSplitMembers.length);
      formData.selectedSplitMembers.forEach(memberId => {
        splitDetails[memberId] = share.toFixed(2);
      });
    } else {
      formData.selectedSplitMembers.forEach(memberId => {
        splitDetails[memberId] = parseFloat(formData.customAmounts[memberId] || 0);
      });
    }

    const expenseData = {
      friendIds: [currentUserId, friend.friendId],
      paidBy: formData.paidBy,
      description: formData.description,
      amount: parseFloat(formData.amount),
      currency: formData.currency,
      splitBetween: formData.selectedSplitMembers,
      splitType: formData.splitType,
      splitDetails,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/expenses/create",
        expenseData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      onExpenseAdded(response.data);
      onClose();
      // Reset form would go here
    } catch (err) {
      setErrors({
        api: err.response?.data?.message || "Failed to add expense",
      });
    } finally {
      setLoading(false);
    }
  };

  const currentCurrency = CURRENCY_OPTIONS.find(c => c.code === formData.currency);
  const inputClasses = "w-full p-2 bg-slate-700 border border-slate-600 rounded-md text-white text-sm";
  const labelClasses = "block text-slate-300 text-xs font-medium mb-1 uppercase tracking-wider";
  const sectionClasses = "space-y-2";

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-md border border-slate-700 max-h-[90vh] overflow-y-auto scrollbar-hide">
        <div className="p-4 border-b border-slate-700 flex justify-between items-center">
          <h3 className="font-semibold text-white">Add Expense with {friend.name}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {errors.api && (
            <div className="bg-red-900/50 text-red-300 p-2 rounded text-sm">
              {errors.api}
            </div>
          )}

          {/* Amount and Currency */}
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label htmlFor="amount" className={labelClasses}>Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-slate-400">{currentCurrency?.symbol}</span>
                <input
                  id="amount"
                  type="text"
                  className={`${inputClasses} pl-8`}
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                />
              </div>
              {errors.amount && <p className="text-red-400 text-xs mt-1">{errors.amount}</p>}
            </div>
            <div>
              <label htmlFor="currency" className={labelClasses}>Currency</label>
              <select
                id="currency"
                className={inputClasses}
                value={formData.currency}
                onChange={(e) => handleChange('currency', e.target.value)}
              >
                {CURRENCY_OPTIONS.map(c => (
                  <option key={c.code} value={c.code}>{c.code}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description and Category */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="description" className={labelClasses}>Description</label>
              <input
                id="description"
                type="text"
                className={inputClasses}
                placeholder="Dinner, Taxi, etc."
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
              />
              {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description}</p>}
            </div>
            <div>
              <label htmlFor="category" className={labelClasses}>Category</label>
              <select
                id="category"
                className={inputClasses}
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
              >
                <option value="">Select</option>
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Date and Paid By */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClasses}>Date</label>
              <DatePicker
                selected={formData.date}
                onChange={(date) => handleChange('date', date)}
                className={inputClasses}
                dateFormat="dd/MM/yyyy"
              />
            </div>
            <div>
              <label htmlFor="paidBy" className={labelClasses}>Paid By</label>
              <select
                id="paidBy"
                className={inputClasses}
                value={formData.paidBy}
                onChange={(e) => handleChange('paidBy', e.target.value)}
              >
                {allParticipants.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Split Options */}
          <div className={sectionClasses}>
            <label className={labelClasses}>Split</label>
            <div className="flex space-x-3 mb-2">
              <button
                type="button"
                className={`flex-1 py-1 px-3 rounded text-sm ${formData.splitType === 'equal' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300'}`}
                onClick={() => handleChange('splitType', 'equal')}
              >
                Equally
              </button>
              <button
                type="button"
                className={`flex-1 py-1 px-3 rounded text-sm ${formData.splitType === 'exact' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300'}`}
                onClick={() => handleChange('splitType', 'exact')}
              >
                Unequally
              </button>
            </div>

            <div className="space-y-2">
              {allParticipants.map(participant => (
                <div key={participant.id} className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 flex-1">
                    <input
                      type="checkbox"
                      checked={formData.selectedSplitMembers.includes(participant.id)}
                      onChange={() => handleSplitMemberChange(participant.id)}
                      className="h-4 w-4 text-indigo-500 rounded border-slate-600"
                    />
                    <span className="text-slate-200 text-sm">{participant.name}</span>
                  </label>
                  
                  {formData.splitType === "exact" && formData.selectedSplitMembers.includes(participant.id) && (
                    <div className="flex items-center w-24">
                      <span className="text-slate-400 mr-1 text-sm">{currentCurrency?.symbol}</span>
                      <input
                        type="text"
                        className="w-full p-1 bg-slate-700 border border-slate-600 rounded text-white text-right text-sm"
                        value={formData.customAmounts[participant.id] || ""}
                        onChange={(e) => handleCustomAmountChange(participant.id, e.target.value)}
                        placeholder="0.00"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {(errors.split || errors.splitTotal) && (
              <p className="text-red-400 text-xs mt-1">{errors.split || errors.splitTotal}</p>
            )}
          </div>

          {/* Attachment */}
          <div className={sectionClasses}>
            <label htmlFor="attachment" className={labelClasses}>Attachment (Optional)</label>
            <div className="flex items-center">
              <label className="cursor-pointer bg-slate-700 hover:bg-slate-600 text-slate-300 text-sm py-2 px-3 rounded-md border border-slate-600 transition-colors">
                <input
                  type="file"
                  id="attachment"
                  className="hidden"
                  onChange={(e) => setAttachment(e.target.files[0])}
                />
                Choose File
              </label>
              {attachment && (
                <span className="ml-2 text-slate-400 text-sm truncate flex-1">
                  {attachment.name}
                </span>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md text-sm transition-colors mt-4 flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Adding...</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                <span>Add Expense</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseModal;