import { Router } from "express";

import { signUpUser, signInUser } from "../controllers/user_controller.js";
import { limiter } from "../middlewares/limiterConfig.js";
import {
  validateSignInUser,
  validateSignUpUser,
} from "../middlewares/validateUserData.js";

const routerUser = Router();

routerUser.post("/api/v1/user/signup", validateSignUpUser, signUpUser);

routerUser.post("/api/v1/user/signin", limiter, validateSignInUser, signInUser);

export default routerUser;
