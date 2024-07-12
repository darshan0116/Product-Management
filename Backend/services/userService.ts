import { prisma } from "../config/dbConnect";
import { CustomError } from "../interfaces/errorClass";
import { UserInterface } from "../interfaces/userInterface";

import { comparePassword, encryptPassword } from "../utils/hashComparePassword";
import { jwtUtils } from "../utils/jwtUtils";

const signupUser = async (data: UserInterface) => {
  const findUserByEmail = await prisma.user.findFirst({
    where: {
      email: data.email.toLowerCase(),
    },
  });
  if (findUserByEmail) {
    throw new CustomError(400, "User already exists");
  }
  data.password = await encryptPassword(data.password);

  const createdUser = await prisma.user.create({
    data: {
      email: data.email.toLowerCase(),
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
    },
  });
  console.log(createdUser);

  return createdUser;
};
const loginUserService = async (loginEmail: string, LoginPassword: string) => {
  const findUserByEmail = await prisma.user.findFirst({
    where: {
      email: loginEmail.toLowerCase(),
    },
  });
  if (!findUserByEmail) {
    throw new CustomError(400, "Invalid Credentials");
  }

  const { firstName, id } = findUserByEmail;

  const loggedUser = {
    name: firstName,
    id: id,
    email: loginEmail.toLowerCase(),
  };
  const compare = await comparePassword(
    LoginPassword,
    findUserByEmail.password
  );
  if (!compare) {
    throw new CustomError(400, "Invalid Credentials");
  }
  const token = jwtUtils.signInToken(findUserByEmail);

  console.log("loggedUser, token: ", loggedUser, token);
  return { loggedUser, token };
};

export const userService = {
  signupUser,
  loginUserService,
};
