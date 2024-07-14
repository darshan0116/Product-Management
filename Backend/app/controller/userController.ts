import { NextFunction ,Response } from "express";
import { requestExtends } from "../interfaces/reqInterface";
import { defaultResponses } from "../utils/defaultResponse";
import { validationHelper } from "../helper/reqValidation";
import { userService } from "../services/userService";

const signupUser = async (req: requestExtends, res: Response, next: NextFunction) => {

    try {
        await validationHelper(req);
        const signUpData = req.body;
        console.log(signUpData);
        const data = await userService.signupUser(signUpData);


        defaultResponses.allDefaultResponse(res, data, "created User", req.id)

    } catch (error) {
        next(error);
    }
}

const loginUser = async (req: requestExtends, res: Response, next: NextFunction) => {
    try {
        console.log("Request body:", req.body); // Log the request body
        await validationHelper(req);
 
        const { email, password } = req.body;
        console.log("Email:", email); // Log the email
        console.log("Password:", password); // Log the password for debugging
 
        const { loggedUser, token } = await userService.loginUserService(email, password);
 
        console.log("Logged in user:", loggedUser); // Log the logged-in user
        console.log("Token:", token); // Log the token
 
        defaultResponses.allDefaultResponse(res, { loggedUser, token }, "Successfully logged in", req.id);
    } catch (error) {
        console.error("Error in loginUser:", error); // Log the error
        next(error);
    }
 };
 
export const userController = {
    signupUser,
    loginUser
}