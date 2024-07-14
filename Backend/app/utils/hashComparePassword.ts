import bcrypt from "bcrypt";


export const encryptPassword = async (password: string) => {
    const hashPassword = await bcrypt.hash(password, 8);
    return hashPassword;
}
export const comparePassword = async (password: string, hashPassword: string) => {
    const compare = await bcrypt.compare(password, hashPassword);
    return compare;
}