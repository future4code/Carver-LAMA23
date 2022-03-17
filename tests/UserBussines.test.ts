import { isExportSpecifier } from "typescript"
import { UserBusiness } from "../src/business/UserBusiness"



let idGenerator = { generate: jest.fn() } as any

let hasManager = {
    hash: jest.fn(),
    compare: jest.fn(() => false)
} as any

let autheticator = {
    generateToken: jest.fn((data: any) => 'token'),
} as any

let userDataBase = {
    createUser: jest.fn(),
    getUserByEmail: jest.fn(() => ({}))
} as any

let userBusiness = new UserBusiness{
    idGenerator,
    hasManager,
    autheticator,
    userDataBase

}

describe('Login', () => {
test ('Should throw an error', async () => {
    expect.assertions(2)
    try {
        await userBusiness.getUserByEmail({
            email:'luna@gmail.com',
            password:'123456'
        })
    } catch (error) {
        console.log(error)
        expect(error.statusCode).toEqual(401)
        expect(error.message).toEqual('Invalid credentials!')
    }
})
})