export interface ILogin {
    username: string;
    password: string;
}

export interface IUser {
    id: string;
    fullname: string;
    username: string;
    email: string;
    phone_no: string;
    profileImage?: string;
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

export interface IExpense {
    _id: string;
    date: string;
    amount: number;
    category: string;
    descr: string;
    remark?: string;
    icon?: string;
}

export interface IBudget {
    _id?: string;
    budgetName: string;
    budget: number;
}

export interface Iimage {
    _id?: string;
    id: string;
    name: string;
    datetime: number;
    type: string;
    width: number;
    height: number;
    size: number;
    deletehash: string;
    link: string;
}
