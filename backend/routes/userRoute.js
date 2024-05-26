import { Router } from "express";
import { register, login } from "../controllers/userControllers.js";
import {
  emailPasswordValdiation,
  registrationFormValidation,
  validate,
} from "../middleware/validator.js";
const userRouter = Router();

userRouter.post("/register", registrationFormValidation, validate, register);
userRouter.post("/login", emailPasswordValdiation, validate, login);

export default userRouter;
