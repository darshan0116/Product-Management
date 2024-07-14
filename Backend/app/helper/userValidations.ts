import { body } from "express-validator";

const signupValidation = [
    body('firstName').notEmpty().withMessage("firstName of user is required").matches(/^[a-zA-Z ]+$/).withMessage("firstName should be string").trim(),
    body('lastName').notEmpty().withMessage("lastName of user is required").matches(/^[a-zA-Z ]+$/).withMessage("lastName should be string").trim(),
    body('email').isEmail().withMessage("email is invalid").trim(),
    body('password').isStrongPassword().withMessage("password is not strong").notEmpty().withMessage("password of user is required").trim(),
    ]


const loginValidation = [   
    body('email').isEmail().withMessage("email is invalid"),
    body('password').isStrongPassword().withMessage("password is not strong").notEmpty().withMessage("password of user is required").trim()
]

export const userValidator = {
    signupValidation, loginValidation
}