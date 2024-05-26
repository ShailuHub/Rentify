import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decodeToken?._id });
    if (!user) return res.status(401).json({ message: "Unauthorised user" });
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default authenticate;
