import { user } from "../models/users.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const secret = "uzefa";

// SIGN IN
export const adminSignIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await user.findOne({ email });

    if (!oldUser) {
      return res.status(404).json({ message: "User doesn't exist" });
    }

    if (oldUser.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Admins only.",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // ✅ JWT WITH ROLE
    const token = jwt.sign(
      {
        id: oldUser._id,
        email: oldUser.email,
        role: oldUser.role,
      },
      secret,
      { expiresIn: "7d" }
    );

    const { password: _, ...safeUser } = oldUser._doc;

    res.status(200).json({
      success: true,
      user: safeUser,
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await user.findOne({ email });

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
    console.log(isPasswordCorrect, "Is Password Correct");
    console.log(oldUser, "This is old User");
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "7d",
    });
    console.log(token);

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// SIGN UP
export const signup = async (req, res) => {
  const {
    avatar,
    fname,
    lname,
    country,
    state,
    city,
    pinCode,
    email,
    password,
    number,
    address1,
    address2,
    createdAt,
  } = req.body; // Include the 'category' field

  try {
    const oldUser = await user.findOne({ email });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await user.create({
      avatar,
      fname,
      lname,
      country,
      state,
      city,
      pinCode,
      email,
      password: hashedPassword,
      number,
      address1,
      address2,
      createdAt,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "7d",
    });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500);
    console.log(error);
  }
};

//Get User
export const getUsers = async (req, res) => {
  try {
    const users = await user.find().sort({ createdAt: -1 });
    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed" });
  }
};

// Get User by Id
export const getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const users = await user.findById(userId);
    if (!users) {
      return res.status(404).json({ message: "User Not Found" });
    }
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete User
export const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const deletedUser = await user.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User Not Found" });
    }
    res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update User
export const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const updatedata = { email, password: hashedPassword };
    console.log(userId, email, password, "This is email ,userId, and password");
    const updatedUser = await user.findByIdAndUpdate(userId, updatedata, {
      new: true,
    });
    console.log(updatedUser, "This is updated User");
    if (!updatedUser) {
      return res.status(404).json({ message: "User Not Found" });
    }

    res.status(200).json({
      updateMember: updatedUser,
      message: "User Updated Sucessfully ✅",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `${error}` });
  }
};
