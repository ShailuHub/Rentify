import { Router } from "express";
import authenticate from "../middleware/authenticate.js";
import {
  createProperty,
  getUserProperty,
  getProperties,
  deleteUserProperty,
  putUserProperty,
  patchProperty,
  sendEmail,
} from "../controllers/buyerSellerController.js";
import { sellerPostValidation, validate } from "../middleware/validator.js";

const buyerSellerRouter = Router();

buyerSellerRouter.post(
  "/seller/post",
  authenticate,
  sellerPostValidation,
  validate,
  createProperty
);
buyerSellerRouter.get("/home", authenticate, getProperties);
buyerSellerRouter.get("/seller/home", authenticate, getUserProperty);
buyerSellerRouter.delete("/seller/home/:id", authenticate, deleteUserProperty);
buyerSellerRouter.patch("/home/update/:id", authenticate, patchProperty);
buyerSellerRouter.put(
  "/seller/:id",
  authenticate,
  sellerPostValidation,
  validate,
  putUserProperty
);
buyerSellerRouter.get("/user/interested/:id", authenticate, sendEmail);
export default buyerSellerRouter;
