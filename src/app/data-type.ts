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
    color: String,
    category: String,
    description: string,
    image: any
}