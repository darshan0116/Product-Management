import { Router } from "express";
import { userValidator } from "../helper/userValidations";
import { userController } from "../controller/userController";

const userRoutes = Router()

userRoutes.post('/signup', userValidator.signupValidation  , userController.signupUser);

userRoutes.post('/login' , userValidator.loginValidation, userController.loginUser);

export default userRoutes;
