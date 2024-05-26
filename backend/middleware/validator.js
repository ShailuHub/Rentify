import { check, validationResult } from "express-validator";

const registrationFormValidation = [
  check("firstName")
    .trim()
    .not()
    .isEmpty()
    .withMessage("First name is missing"),
  check("lastName").trim().not().isEmpty().withMessage("Last name is missing"),
  check("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email is missing")
    .normalizeEmail()
    .isEmail()
    .withMessage("Email is not valid"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is missing")
    .isLength({ min: 6, max: 22 })
    .withMessage("Password must be of length between 6 to 12"),
  check("phone")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Phone number is missing")
    .isMobilePhone()
    .withMessage("Invalid phone number"),
];

const emailPasswordValdiation = [
  check("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email is missing")
    .normalizeEmail()
    .isEmail()
    .withMessage("Email is not valid"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is missing")
    .isLength({ min: 6, max: 22 })
    .withMessage("Password must be of length between 6 to 12"),
];

const sellerPostValidation = [
  check("place").trim().not().isEmpty().withMessage("Place is required"),
  check("area").trim().not().isEmpty().withMessage("Area is required"),
  check("bedrooms")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Number of bedrooms is required"),
  check("bathrooms")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Number of bathrooms is required"),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export {
  registrationFormValidation,
  emailPasswordValdiation,
  sellerPostValidation,
  validate,
};
