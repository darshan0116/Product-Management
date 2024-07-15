

export type signUpType = {
    firstName: string,
    lastName: string,
    userEmail: string,
    userPassword: string,
    confirmPassword: string

}
export type SignErrorType = {
    firstName: boolean,
    lastName: boolean,
    userEmail: boolean,
    userPassword: boolean,
    confirmPassword: boolean
}