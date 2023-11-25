import { Router } from "express";

import { signUpUser, signInUser } from "../controllers/auth.controller.js";
import { limiter } from "../middlewares/limiterConfig.js";
import {
  validateSignInUser,
  validateSignUpUser
} from "../middlewares/validateUserData.js";

const routerUser = Router();

routerUser.post("/signup", validateSignUpUser, signUpUser);
routerUser.post("/signin", limiter, validateSignInUser, signInUser);

export default routerUser;
