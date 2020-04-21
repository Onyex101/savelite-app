export interface ILogin {
    username: string;
    password: string;
}

export interface IReg {
    name: string;
    username: string;
    email: string;
    gender: boolean;
    country_phone: any;
    matching_passwords: any;
    terms: boolean;
    profileImage?: string;
    imageDeleteHash?: string;
}

export interface IPlan {
    planName: string;
    periodicAmount: string;
    targetAmount: string;
    duration: string;
    card: {
        firstname: string;
        lastname: string;
        card_no: string;
        expiry_date: string;
        cvv: string;
        pin: string;
        amount?: string;
    };
    card_update?: boolean;
    _id?: string;
    withdrawalDate?: string;
    percentage?: string;
}

export interface IMail {
    email: string;
}

