import Friendship from "../models/friendshipSchema.js";
import User from "../models/userSchema.js";

// Send Friend Request
export const sendFriendRequest = async (req, res) => {
  const { recipientId } = req.body;
  // const { requesterId } = req.body;
  const requesterId = req.user._id;
  console.log(requesterId);

  if (requesterId.toString() === recipientId) 
    return res.status(400).json({ message: "Cannot send request to yourself" });

  const existing = await Friendship.findOne({
    requester: requesterId,
    recipient: recipientId
  });

  if (existing) return res.status(400).json({ message: "Request already exists" });

  const newRequest = new Friendship({ requester: requesterId, recipient: recipientId });
  await newRequest.save();

  res.status(201).json({ message: "Friend request sent" });
};

// Accept Friend Request
export const acceptFriendRequest = async (req, res) => {
  const { friendshipId } = req.params;

  const friendship = await Friendship.findById(friendshipId);
  if (!friendship) return res.status(404).json({ message: "Request not found" });

  if (friendship.recipient.toString() !== req.user._id.toString())
    return res.status(403).json({ message: "Not authorized" });

  friendship.status = "accepted";
  await friendship.save();

  res.json({ message: "Friend request accepted" });
};

// Cancel/Reject Request
export const cancelFriendRequest = async (req, res) => {
  const { friendshipId } = req.params;

  const friendship = await Friendship.findById(friendshipId);
  if (!friendship) return res.status(404).json({ message: "Request not found" });

  if (
    friendship.requester.toString() !== req.user._id.toString() &&
    friendship.recipient.toString() !== req.user._id.toString()
  )
    return res.status(403).json({ message: "Not authorized" });

  await friendship.deleteOne();
  res.json({ message: "Request removed" });
};

// Remove Friend/Unfriend
export const removeFriend = async (req, res) => {
  const { friendshipId } = req.params;

  const friendship = await Friendship.findById(friendshipId);
  if (!friendship) return res.status(404).json({ message: "Request not found" });

  if (
    friendship.requester.toString() !== req.user._id.toString() &&
    friendship.recipient.toString() !== req.user._id.toString()
  )
    return res.status(403).json({ message: "Not authorized" });

  await friendship.deleteOne();
  res.json({ message: "Friendship Broken😞" });
};

// List Friends
export const getFriends = async (req, res) => {
  const userId = req.user._id;

  const friendships = await Friendship.find({
    $or: [{ requester: userId }, { recipient: userId }],
    status: "accepted",
  }).populate("requester recipient", "name email profilePic");

  // Transform the friendships array into an array of friend data
  const friendsData = friendships.map((friendship) => {
    let friend;
    // Determine which side of the friendship is the current user's friend
    if (friendship.requester._id.toString() === userId.toString()) {
      friend = friendship.recipient; // The recipient is the friend
    } else {
      friend = friendship.requester; // The requester is the friend
    }

    // Return the friend's data, including the friendshipId and renaming friend._id to friendId
    return {
      friendshipId: friendship._id, // The ID of the Friendship document
      friendId: friend._id,        // The friend's User ID (renamed)
      name: friend.name,
      email: friend.email,
      profilePic: friend.profilePic,
      // You can add other fields from the 'friend' object here if needed
    };
  });

  res.json(friendsData);
};

// List Pending Requests
export const getPendingRequests = async (req, res) => {
  const userId = req.user._id;

  const requests = await Friendship.find({
    recipient: userId,
    status: "pending"
  }).populate("requester", "name email profilePic");

  res.json(requests);
};

export const getSentRequests = async (req, res) => {
  const userId = req.user._id;

  const requests = await Friendship.find({
    requester: userId,
    status: "pending"
  }).populate("recipient", "name email profilePic");

  res.json(requests);
};

//Single Friend Detail
// export const getFriendDetail = async (req, res) => {
//   const { friendId } = req.params;
//   const friend = await User.findById(friendId).select("-password");
//   if (!friend) return res.status(404).json({ message: "Friend not found" });
//   res.json(friend);
// };

export const getFriendDetail = async (req, res) => {
  const userId = req.user._id; // The logged-in user's ID
  const { friendshipId } = req.params; // The ID of the specific friendship document

  try {
    const friendship = await Friendship.findById(friendshipId).populate(
      "requester recipient",
      "name email profilePic" // Ensure these are populated
    );

    // 1. Check if the friendship exists
    if (!friendship) {
      return res.status(404).json({ message: "Friendship not found." });
    }

    // 2. Ensure the logged-in user is part of this friendship
    const isRequester = friendship.requester._id.toString() === userId.toString();
    const isRecipient = friendship.recipient._id.toString() === userId.toString();

    if (!isRequester && !isRecipient) {
      return res.status(403).json({ message: "Unauthorized: You are not part of this friendship." });
    }

    // 3. Determine the friend's data (the other user in the friendship)
    let friend;
    if (isRequester) {
      friend = friendship.recipient; // If current user is requester, recipient is the friend
    } else {
      friend = friendship.requester; // If current user is recipient, requester is the friend
    }

    // 4. Construct the response object with friendId and other details
    const responseData = {
      friendshipId: friendship._id,     // The ID of the Friendship document itself
      friendId: friend._id,             // The friend's User ID (renamed from _id)
      name: friend.name,
      email: friend.email,
      profilePic: friend.profilePic,
      status: friendship.status,        // Status of this specific friendship (e.g., "accepted", "pending")
      // You can add other fields from the 'friend' object or friendship document here as needed
      // For example:
      // createdAt: friendship.createdAt,
      // updatedAt: friendship.updatedAt,
      // lastActivity: friend.lastActivity // If 'lastActivity' is part of your User model and populated
    };

    res.json(responseData);
  } catch (error) {
    console.error("Error fetching single friend detail:", error);
    res.status(500).json({ message: "Server error." });
  }
};