import User from '../models/userSchema.js';
import Friendship from '../models/friendshipSchema.js';
import mongoose from 'mongoose';

// @desc    Search users by email or ID
// @route   GET /api/users/search
// @access  Private
export const searchUsers = async (req, res) => {
  try {
    const { email, id } = req.query;

    // 1. Validate input
    if (!email && !id) {
      return res.status(400).json({
        success: false,
        message: 'Please provide either email or user ID query parameter',
      });
    }

    // 2. Get all user IDs to exclude from the search results
    // This includes the current user and any users they are already friends with or have a pending request with.
    const existingFriendships = await Friendship.find({
      $or: [{ requester: req.user._id }, { recipient: req.user._id }],
      status: { $in: ['pending', 'accepted'] },
    });

    const excludedUserIds = [
      req.user._id, // Exclude self
      ...existingFriendships.map(f => f.requester),
      ...existingFriendships.map(f => f.recipient),
    ];
    
    // 3. Build the search query
    const query = {
      _id: { $nin: excludedUserIds }, // Apply exclusions to all searches
    };

    if (id) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid user ID format',
        });
      }
      query._id.$eq = id; // Add the specific ID search condition
    } else if (email) {
      query.email = { $regex: email, $options: 'i' };
    }

    // 4. Find users based on the constructed query
    const users = await User.find(query)
      .select('-password -resetToken -resetTokenExpiry -twoFactorSecret -__v')
      .limit(10);

    // 5. Format and send the response
    const results = users.map(user => ({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePic:
        user.profilePic ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
          user.name
        )}&background=random`,
      currency: user.currency,
      theme: user.theme,
    }));

    res.status(200).json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      success: false,
      message: 'An internal server error occurred', // Avoid leaking error details
    });
  }
};