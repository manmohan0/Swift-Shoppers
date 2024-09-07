export interface user {
    name: string,
    email: string,
    phone: number | null,
    password: string,
    confirmPassword: string
}

export interface business {
    businessName: string,
    businessEmail: string,
    businessPhone: number | null
}

export interface accountInfo {
    account_no: number| null,
    IFSC_code: string
}