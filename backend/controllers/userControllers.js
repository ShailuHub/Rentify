import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  const { firstName, lastName, email, password, phone } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) return res.status(401).json({ message: "User already exists" });
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      phone,
    });
    await newUser.save();
    res.status(201).json({ message: "User created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Email doesn't exists" });
    const isMatched = await user.comparePassword(password);
    if (!isMatched)
      return res.status(401).json({ message: "Password doesn't match" });
    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        username: user.firstName,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1hr" }
    );
    res
      .status(201)
      .json({ token: token, message: "Token has sent to the user" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { register, login };
