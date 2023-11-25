import Joi from "joi";
import JoiPasswordComplexity from "joi-password-complexity";

const signUpUserSchema = Joi.object({
  username: Joi.string().required().min(4).label("User Name"),
  email: Joi.string().email().required().label("Email"),
  password: JoiPasswordComplexity().required().label("Password"),
});

export function validateSignUpUser(req, res, next) {
  const { error } = signUpUserSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
}

const signInUserSchema = Joi.object({
  email: Joi.string().email().required().label("Email"),
  password: Joi.string().required().label("Password"),
});

export function validateSignInUser(req, res, next) {
  const { error } = signInUserSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
}
