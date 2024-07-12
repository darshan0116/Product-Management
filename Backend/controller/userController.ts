import { NextFunction ,Response } from "express";
import { requestExtends } from "../interfaces/reqInterface";
import { defaultResponses } from "../utils/defaultResponse";
import { validationHelper } from "../helper/reqValidation";
import { userService } from "../services/userService";

const signupUser = async (req: requestExtends, res: Response, next: NextFunction) => {

    try {
        await validationHelper(req);
        const signUpData = req.body;

        const data = await userService.signupUser(signUpData);


        defaultResponses.allDefaultResponse(res, data, "created User", req.id)

    } catch (error) {
        next(error);
    }
}

const loginUser = async (req: requestExtends, res: Response, next: NextFunction) => {

    try {
        await validationHelper(req);

        const {email , password} = req.body;
        const {loggedUser,token} = await userService.loginUserService(email, password);
    

        defaultResponses.allDefaultResponse(res, { loggedUser, token }, "successfully login", req.id);
    } catch (error) {
        next(error);
    }

}
export const userController = {
    signupUser,
    loginUser
}