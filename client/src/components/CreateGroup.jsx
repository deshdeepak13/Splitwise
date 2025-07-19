import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Dummy Data for demonstration (you'd get this from your authentication context)
const DUMMY_CURRENT_USER = { id: 'currentuser123', name: 'Bhupendra Jogi', email: 'bhupendra@example.com' };

const CreateGroup = () => {
    const [groupName, setGroupName] = useState('');
    const [groupType, setGroupType] = useState('Public'); // Default value
    const [members, setMembers] = useState([{ id: DUMMY_CURRENT_USER.id, name: DUMMY_CURRENT_USER.name, email: DUMMY_CURRENT_USER.email, isCreator: true }]); // Initialize with current user
    const [newMemberInput, setNewMemberInput] = useState('');
    const [errors, setErrors] = useState({});
    const [isCreating, setIsCreating] = useState(false); // For loading state

    const navigate = useNavigate();

    const handleAddMember = () => {
        if (newMemberInput.trim() === '') {
            setErrors(prev => ({ ...prev, newMemberInput: 'Please enter a name or email for the member.' }));
            return;
        }

        // Basic check to prevent adding the same member multiple times by email/name
        const isDuplicate = members.some(
            member => member.name === newMemberInput.trim() || member.email === newMemberInput.trim()
        );

        if (isDuplicate) {
            setErrors(prev => ({ ...prev, newMemberInput: 'This member is already in the list.' }));
            return;
        }

        const newMember = {
            id: `temp-${Date.now()}`, // Dummy ID for new members
            name: newMemberInput.trim(),
            email: newMemberInput.trim().includes('@') ? newMemberInput.trim() : '', // Basic email detection
            isCreator: false,
        };

        setMembers(prev => [...prev, newMember]);
        setNewMemberInput(''); // Clear input after adding
        setErrors(prev => ({ ...prev, newMemberInput: '' })); // Clear any previous input errors
    };

    const handleRemoveMember = (memberId) => {
        // Prevent removing the group creator (current user)
        const memberToRemove = members.find(m => m.id === memberId);
        if (memberToRemove && memberToRemove.isCreator) {
            alert("You cannot remove yourself (the group creator) from the group.");
            return;
        }
        setMembers(prev => prev.filter(member => member.id !== memberId));
    };

    const validateForm = () => {
        let newErrors = {};
        if (!groupName.trim()) {
            newErrors.groupName = 'Group Name is required.';
        }
        if (members.length < 1) { // A group must have at least one member (the creator)
            newErrors.members = 'A group must have at least one member.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCreateGroup = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsCreating(true);

        const newGroup = {
            name: groupName.trim(),
            type: groupType,
            id: Math.random().toString(36).substring(2, 9), // Dummy ID
            members: members.map(({ id, name, email }) => ({ id, name, email })), // Send only necessary member data
            creatorId: DUMMY_CURRENT_USER.id, // Include creator ID
            createdAt: new Date().toISOString(),
        };

        console.log("New Group Data (Simulated):", newGroup);

        // Simulate API call delay
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            alert('Group created successfully (simulated)!');
            // In a real app, you would navigate based on the success of the backend call
            navigate('/groups'); // Or '/' if that's your groups list page
        } catch (error) {
            console.error("Simulated group creation failed:", error);
            alert(`Failed to create group (simulated): ${error.message || 'Unknown error'}`);
        } finally {
            setIsCreating(false);
        }
    };

    // Tailwind classes matching your theme
    const inputClasses = "mt-1 w-full px-4 py-2 border rounded-md bg-gray-700 text-gray-200 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500";
    const labelClasses = "block text-sm font-medium text-gray-200 mb-1";
    const errorClasses = "text-red-400 text-sm mt-1";
    const buttonClasses = "py-2 px-4 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2";


    return (
        <div className="max-w-xl mx-auto mt-10 bg-gray-800 p-8 rounded-lg shadow-2xl text-gray-100">
            <h2 className="text-3xl font-bold mb-6 text-center text-indigo-400">Create New Group</h2>
            <form onSubmit={handleCreateGroup} className="space-y-6">
                {/* Group Name */}
                <div>
                    <label htmlFor="groupName" className={labelClasses}>Group Name</label>
                    <input
                        type="text"
                        id="groupName"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        required
                        className={inputClasses}
                        placeholder="e.g., Goa Trip, Family Expenses"
                    />
                    {errors.groupName && <p className={errorClasses}>{errors.groupName}</p>}
                </div>

                {/* Group Type */}
                <div>
                    <label htmlFor="groupType" className={labelClasses}>Group Type</label>
                    <select
                        id="groupType"
                        value={groupType}
                        onChange={(e) => setGroupType(e.target.value)}
                        className={inputClasses}
                    >
                        <option value="Public">Public (Anyone can see expenses)</option>
                        <option value="Secret">Secret (Only members can see expenses)</option>
                        <option value="Multi-Currency">Multi-Currency (Supports different currencies)</option>
                    </select>
                </div>

                {/* Add Members Section */}
                <div>
                    <label className={labelClasses}>Add Members</label>
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            value={newMemberInput}
                            onChange={(e) => setNewMemberInput(e.target.value)}
                            className={`${inputClasses} flex-grow`}
                            placeholder="Enter name or email"
                        />
                        <button
                            type="button"
                            onClick={handleAddMember}
                            className={`${buttonClasses} bg-indigo-600 hover:bg-indigo-700 text-white`}
                        >
                            Add
                        </button>
                    </div>
                    {errors.newMemberInput && <p className={errorClasses}>{errors.newMemberInput}</p>}
                    {errors.members && <p className={errorClasses}>{errors.members}</p>} {/* Error for empty members list */}


                    {members.length > 0 && (
                        <div className="mt-4 p-4 bg-gray-700 rounded-md max-h-48 overflow-y-auto custom-scrollbar">
                            <h3 className="text-gray-300 text-md font-semibold mb-2">Members:</h3>
                            <ul className="space-y-2">
                                {members.map(member => (
                                    <li key={member.id} className="flex items-center justify-between text-gray-200">
                                        <span>
                                            {member.name}
                                            {member.email && <span className="text-gray-400 text-sm ml-2">({member.email})</span>}
                                            {member.isCreator && <span className="text-indigo-400 text-xs ml-2">(Creator)</span>}
                                        </span>
                                        {!member.isCreator && ( // Cannot remove creator
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveMember(member.id)}
                                                className="text-red-400 hover:text-red-500 text-sm p-1 rounded-full hover:bg-gray-600"
                                                title="Remove member"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 11-2 0v6a1 1 0 112 0V8z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>


                {/* Submit Button */}
                <div className="text-center">
                    <button
                        type="submit"
                        className={`bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded w-40 ${isCreating ? 'opacity-70 cursor-not-allowed' : ''}`}
                        disabled={isCreating}
                    >
                        {isCreating ? 'Creating...' : 'Create Group'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateGroup;