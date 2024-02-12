export interface SignUp {
    name: string,
    password: string,
    email: string
}

export interface Login {
    password: string,
    email: string
}

export interface products {
    id: number,
    name: string,
    price: number,
    color: string,
    category: string,
    description: string,
    image: any,
    quantity: undefined | number,
    productId: undefined | number,

    disabled: undefined | boolean,
    index: undefined | number
}

export interface cart {
    id: number,
    name: string,
    price: number,
    color: string,
    category: string,
    description: string,
    image: any,
    quantity: undefined | number,
    userId: number,
    productId: undefined | number;
}

export interface pricesummary {
    price: number,
    discount: number,
    tax: number,
    devliveryCharge: number,
    total: number
}

export interface orderData {
    email: string,
    address: string,
    contact: string,
    totalPrice: number,
    userId: number,
    id: number | undefined
}