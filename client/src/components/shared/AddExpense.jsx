import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

// Dummy Data for demonstration
const DUMMY_GROUP_MEMBERS = [
  { id: "user1", name: "Bhupendra Jogi" },
  { id: "user2", name: "Arjun" },
  { id: "user3", name: "Priya" },
  { id: "user4", name: "Ravi" },
];
const DUMMY_CURRENT_USER_ID = "user1"; // Bhupendra Jogi

// Define available currencies
// You can expand this list with more currencies, including their symbols or locales
const CURRENCY_OPTIONS = [
  { code: "INR", symbol: "₹", name: "Indian Rupee", locale: "en-IN" },
  { code: "USD", symbol: "$", name: "US Dollar", locale: "en-US" },
  { code: "EUR", symbol: "€", name: "Euro", locale: "en-EU" }, // Note: 'en-EU' is not a standard locale, often just 'en' is used or country-specific like 'en-FR'
  { code: "GBP", symbol: "£", name: "British Pound", locale: "en-GB" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen", locale: "ja-JP" },
];

// Helper function to format currency
const formatCurrency = (amount, currencyCode = "INR", locale = "en-IN") => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const AddExpense = ({ groupId, onClose, onExpenseAdded }) => {
  // State for form inputs
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState("");
  const [paidBy, setPaidBy] = useState(DUMMY_CURRENT_USER_ID);
  const [splitType, setSplitType] = useState("equally");
  const [selectedSplitMembers, setSelectedSplitMembers] = useState([]);
  const [customAmounts, setCustomAmounts] = useState({});
  const [attachment, setAttachment] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(
    CURRENCY_OPTIONS[0].code
  ); // Default to INR

  // Categories for dropdown
  const categories = [
    "Food",
    "Travel",
    "Utilities",
    "Shopping",
    "Rent",
    "Groceries",
    "Entertainment",
    "Other",
  ];

  // Initialize selectedSplitMembers to all group members when component mounts
  useEffect(() => {
    if (DUMMY_GROUP_MEMBERS && DUMMY_GROUP_MEMBERS.length > 0) {
      setSelectedSplitMembers(DUMMY_GROUP_MEMBERS.map((member) => member.id));
    }
  }, []);

  // Auto-calculate shares for 'equally' split
  useEffect(() => {
    if (splitType === "equally" && amount && selectedSplitMembers.length > 0) {
      const numSelected = selectedSplitMembers.length;
      const parsedAmount = parseFloat(amount);
      if (!isNaN(parsedAmount) && parsedAmount > 0) {
        const equalShare = (parsedAmount / numSelected).toFixed(2);
        const newCustomAmounts = {};
        selectedSplitMembers.forEach((memberId) => {
          newCustomAmounts[memberId] = equalShare;
        });
        setCustomAmounts(newCustomAmounts);
      }
    }
  }, [amount, splitType, selectedSplitMembers]);

  const getMemberName = (id) => {
    return (
      DUMMY_GROUP_MEMBERS.find((member) => member.id === id)?.name ||
      "Unknown Member"
    );
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handleSplitMemberChange = (memberId) => {
    setSelectedSplitMembers((prev) =>
      prev.includes(memberId)
        ? prev.filter((id) => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleCustomAmountChange = (memberId, value) => {
    if (/^\d*\.?\d*$/.test(value)) {
      setCustomAmounts((prev) => ({
        ...prev,
        [memberId]: value,
      }));
    }
  };

  const validateForm = () => {
    let newErrors = {};
    const parsedAmount = parseFloat(amount);

    if (!amount || isNaN(parsedAmount) || parsedAmount <= 0) {
      newErrors.amount = "Amount is required and must be a positive number.";
    }
    if (!description.trim()) {
      newErrors.description = "Description is required.";
    }
    if (!paidBy) {
      newErrors.paidBy = "Please select who paid.";
    }
    if (selectedSplitMembers.length < 1) {
      newErrors.selectedSplitMembers =
        "At least one person must be selected to split with.";
    }

    const currentCurrency = CURRENCY_OPTIONS.find(
      (c) => c.code === selectedCurrency
    );
    const formatFn = (val) =>
      formatCurrency(val, currentCurrency?.code, currentCurrency?.locale);

    if (splitType === "unequally") {
      let totalCustomAmount = 0;
      selectedSplitMembers.forEach((memberId) => {
        const customVal = parseFloat(customAmounts[memberId]);
        if (isNaN(customVal) || customVal <= 0) {
          newErrors[`customAmount_${memberId}`] = `Amount for ${getMemberName(
            memberId
          )} is required.`;
        } else {
          totalCustomAmount += customVal;
        }
      });

      if (
        Object.keys(newErrors).length === 0 &&
        Math.abs(totalCustomAmount - parsedAmount) > 0.01
      ) {
        newErrors.customSplitMismatch = `Custom split total (${formatFn(
          totalCustomAmount
        )}) does not match expense amount (${formatFn(parsedAmount)}).`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const expenseData = {
      id: `exp-${Date.now()}`,
      groupId: groupId || "dummy-group-id",
      amount: parseFloat(amount),
      currency: selectedCurrency, // Include selected currency in data
      description,
      date: format(date, "yyyy-MM-dd"),
      category: category || "Other",
      paidBy,
      splitType,
      splitDetails:
        splitType === "equally"
          ? selectedSplitMembers.map((memberId) => ({
              memberId,
              amount: parseFloat(
                (parseFloat(amount) / selectedSplitMembers.length).toFixed(2)
              ),
            }))
          : selectedSplitMembers.map((memberId) => ({
              memberId,
              amount: parseFloat(customAmounts[memberId] || 0),
            })),
      attachment: attachment
        ? {
            name: attachment.name,
            type: attachment.type,
            size: attachment.size,
          }
        : null,
    };

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Simulated Expense Data Submitted:", expenseData);

      alert("Expense added successfully (simulated)! Check console for data.");
      onExpenseAdded(expenseData);
      onClose();
    } catch (error) {
      console.error("Simulated error adding expense:", error);
      alert(`Simulated error adding expense: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Style classes based on your screenshot's dark theme
  const inputClasses =
    "w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-gray-200 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500";
  const labelClasses = "block text-gray-300 text-sm font-semibold mb-2";
  const errorClasses = "text-red-400 text-sm mt-1";
  const buttonClasses =
    "w-full py-3 px-4 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2";

  // Get the symbol for the currently selected currency
  const currentCurrencySymbol =
    CURRENCY_OPTIONS.find((c) => c.code === selectedCurrency)?.symbol || "₹";

  return (
    <div className="bg-gray-800 text-gray-100 p-8 rounded-lg shadow-2xl w-full max-w-2xl mx-auto my-8">
      <h2 className="text-3xl font-bold text-indigo-400 mb-6 text-center">
        Add New Expense
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Amount and Currency */}
        <div className="flex space-x-4">
          <div className="flex-grow">
            <label htmlFor="amount" className={labelClasses}>
              Amount
            </label>
            <input
              type="text"
              id="amount"
              className={inputClasses}
              placeholder="e.g., 1200"
              value={amount}
              onChange={handleAmountChange}
              required
            />
            {errors.amount && <p className={errorClasses}>{errors.amount}</p>}
          </div>
          <div>
            <label htmlFor="currency" className={labelClasses}>
              Currency
            </label>
            <select
              id="currency"
              className={inputClasses}
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
            >
              {CURRENCY_OPTIONS.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.symbol} {currency.code} - {currency.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="description" className={labelClasses}>
            Description
          </label>
          <input
            type="text"
            id="description"
            className={inputClasses}
            placeholder="e.g., Dinner at ABC Restaurant"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          {errors.description && (
            <p className={errorClasses}>{errors.description}</p>
          )}
        </div>

        <div>
          <label htmlFor="date" className={labelClasses}>
            Date
          </label>
          <DatePicker
            selected={date}
            onChange={(d) => setDate(d)}
            dateFormat="dd/MM/yyyy"
            className={inputClasses}
            calendarClassName="bg-gray-700 text-gray-100 rounded-md shadow-lg"
            popperClassName="z-50"
          />
        </div>

        <div>
          <label htmlFor="category" className={labelClasses}>
            Category
          </label>
          <select
            id="category"
            className={inputClasses}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a category (Optional)</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Paid By */}
        <div>
          <label htmlFor="paidBy" className={labelClasses}>
            Paid By
          </label>
          <select
            id="paidBy"
            className={inputClasses}
            value={paidBy}
            onChange={(e) => setPaidBy(e.target.value)}
            required
          >
            {DUMMY_GROUP_MEMBERS.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name} {member.id === DUMMY_CURRENT_USER_ID && "(You)"}
              </option>
            ))}
          </select>
          {errors.paidBy && <p className={errorClasses}>{errors.paidBy}</p>}
        </div>

        {/* Split Between */}
        <div>
          <label className={labelClasses}>Split Between</label>
          <div className="flex space-x-4 mb-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio h-4 w-4 text-indigo-500"
                name="splitType"
                value="equally"
                checked={splitType === "equally"}
                onChange={() => setSplitType("equally")}
              />
              <span className="ml-2 text-gray-200">Equally</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio h-4 w-4 text-indigo-500"
                name="splitType"
                value="unequally"
                checked={splitType === "unequally"}
                onChange={() => setSplitType("unequally")}
              />
              <span className="ml-2 text-gray-200">
                Unequally (Custom Split)
              </span>
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {DUMMY_GROUP_MEMBERS.map((member) => (
              <div
                key={member.id}
                className="flex items-center bg-gray-700 p-3 rounded-md"
              >
                <input
                  type="checkbox"
                  id={`split-member-${member.id}`}
                  className="form-checkbox h-5 w-5 text-indigo-500 rounded"
                  checked={selectedSplitMembers.includes(member.id)}
                  onChange={() => handleSplitMemberChange(member.id)}
                />
                <label
                  htmlFor={`split-member-${member.id}`}
                  className="ml-3 text-gray-200 flex-grow"
                >
                  {member.name}
                </label>
                {splitType === "unequally" &&
                  selectedSplitMembers.includes(member.id) && (
                    <div className="flex items-center ml-2">
                      <span className="text-gray-400 mr-1">
                        {currentCurrencySymbol}
                      </span>{" "}
                      {/* Dynamic symbol */}
                      <input
                        type="text"
                        className="w-24 p-2 bg-gray-600 border border-gray-500 rounded-md text-gray-200 text-right"
                        value={customAmounts[member.id] || ""}
                        onChange={(e) =>
                          handleCustomAmountChange(member.id, e.target.value)
                        }
                        placeholder="0"
                      />
                    </div>
                  )}
              </div>
            ))}
          </div>
          {errors.selectedSplitMembers && (
            <p className={errorClasses}>{errors.selectedSplitMembers}</p>
          )}
          {errors.customSplitMismatch && (
            <p className={errorClasses}>{errors.customSplitMismatch}</p>
          )}
          {selectedSplitMembers.map(
            (memberId) =>
              errors[`customAmount_${memberId}`] && (
                <p key={`err-${memberId}`} className={errorClasses}>
                  {errors[`customAmount_${memberId}`]}
                </p>
              )
          )}
        </div>

        {/* Attachment */}
        <div>
          <label htmlFor="attachment" className={labelClasses}>
            Attachment (Optional)
          </label>
          <input
            type="file"
            id="attachment"
            className={`${inputClasses} file:mr-4 file:py-2 file:px-4
                                     file:rounded-full file:border-0
                                     file:text-sm file:font-semibold
                                     file:bg-indigo-500 file:text-white
                                     hover:file:bg-indigo-600`}
            onChange={(e) => setAttachment(e.target.files[0])}
          />
          {attachment && (
            <p className="text-gray-400 text-sm mt-2">
              Selected: {attachment.name}
            </p>
          )}
        </div>

        
        <div className="flex justify-center pt-4">
  <button
    type="submit"
    className="bg-indigo-600 hover:bg-indigo-700 border-2 text-white px-6 py-2 rounded w-48"
    disabled={isSubmitting}
  >
    {isSubmitting ? "Adding Expense..." : "Add Expense"}
  </button>
</div>


      </form>
    </div>
  );
};

export default AddExpense;
