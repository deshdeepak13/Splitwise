import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";




// Utility: Generate JWT
const generateToken = (user) => {
  // console.log(JWT_SECRET);
  // console.log(process.env.JWT_SECRET)
  const JWT_SECRET = process.env.JWT_SECRET;
  return jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });
};

// @desc   Register user
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      provider: "local",
    });

    const token = generateToken(newUser);
    res.status(201).json({
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        provider: newUser.provider,
      },
      token,
    });
  } catch (err) {
    // console.log(err);
    res.status(500).json({ message: "Server error", error: err });
  }
};
 
// @desc   Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "User not found" });

    if (user.provider !== "local")
      return res.status(400).json({ message: `Login with ${user.provider}` });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user);
    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        provider: user.provider,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// @desc   Protected user info
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
