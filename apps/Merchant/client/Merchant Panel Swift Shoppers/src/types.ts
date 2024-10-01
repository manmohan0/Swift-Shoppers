export interface user {
    name: string,
    email: string,
    phone: string,
    password: string,
    confirmPassword?: string
}

export interface log_user {
    name: string,
    email: string, 
    phone: string,
}
export interface business {
    businessName: string,
    businessEmail: string,
    businessPhone: string
}

export interface accountInfo {
    account_no: string,
    IFSC_code: string
}

export interface authUser {
    user: user | null,
    token: string
}