
export interface userType {
    fName: string,
    lName: string,
    phone: string,
    email: string
}

export interface authType {
    User: userType | null
    token: string
}
