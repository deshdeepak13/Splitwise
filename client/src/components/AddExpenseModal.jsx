import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import AddExpense from "./AddExpense"; // Your existing AddExpense component

const AddExpenseModal = ({ isOpen, onClose, friends }) => {
  // Convert friends to the format expected by AddExpense
  const groupMembers = friends.map(friend => ({
    id: friend._id,
    name: friend.name,
    // Add any other required properties
  }));

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-gray-800 rounded-xl w-full max-w-2xl overflow-y-auto max-h-screen"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">Add Expense</h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white"
                >
                  <FiX size={24} />
                </button>
              </div>
              
              <AddExpense 
                groupMembers={groupMembers}
                onClose={onClose}
                onExpenseAdded={(expense) => {
                  console.log("Expense added:", expense);
                  onClose();
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddExpenseModal;