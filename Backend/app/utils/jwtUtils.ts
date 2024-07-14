import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { CustomError } from '../interfaces/errorClass';

const secret = `${process.env.JWT_SECRET}`
const signInToken = (data: User) => {
    const { id, email, firstName, lastName } = data
    return jwt.sign({id ,  email, firstName, lastName }, secret, {
        expiresIn: '10h',

    });
}
const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, secret);

    } catch (error) {
        throw new CustomError(401, 'Token is invalid or expired');
    }
}
export const jwtUtils = {
    signInToken, verifyToken
}