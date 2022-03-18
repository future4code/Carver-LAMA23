import { TokenGeneratorMock } from "./mocks/tokenGeneratorMock"
import { IdGeneratorMock } from "./mocks/idGeneratorMock"
import { HashGeneratorMock } from "./mocks/hashGeneratorMock"
import { UserDataBaseMock } from "./mocks/userDataBaseMock"
import { UserBusiness } from "../src/business/UserBusiness"
import { UserRole } from "../src/model/User"

const userBusinessMock = new UserBusiness(
    new IdGeneratorMock(),
    new HashGeneratorMock(),
    new TokenGeneratorMock(),
    new UserDataBaseMock() as any
)

describe("teste de signUp", () => {
    test("Erro que deve retornar quando o nome está vazio", async () => {
        expect.assertions(2)
        try {
            await userBusinessMock.signup("", "email@email.com", "123", "ADMIN")
        } catch (e: any) {
            expect(e.message).toEqual("Missing input")
            expect(e.statusCode).toBe(422)
        }
    })

    test("Erro que deve retornar quando o email é inválido", async () => {
        expect.assertions
        try {
            await userBusinessMock.signup("flavio", "email", "123", "ADMIN")
        } catch (e: any) {
            expect(e.message).toEqual("Invalid email")
            expect(e.statusCode).toBe(422)
        }
    })
    // Teste 3: Erro que deve retornar quando a senha é inválida
    test("Erro que deve retornar quando a senha é inválida", async () => {
        expect.assertions
        try {
            await userBusinessMock.signup("flavio", "email@email.com", "12345", "ADMIN")
        } catch (e: any) {
            expect(e.message).toEqual("Invalid password")
            expect(e.statusCode).toBe(422)
        }
    })
    // Teste 4: Erro que deve retornar quando o tipo de usuário é inválido
    test("Erro que deve retornar quando o tipo de usuário é inválido", async () => {
        expect.assertions
        try {
            await userBusinessMock.signup("flavio", "email@email.com", "123456", "adm")
        } catch (e: any) {
            expect(e.message).toEqual("Invalid user role")
            expect(e.statusCode).toBe(422)
        }
    })
    // Teste 5: Sucesso no cadastro e verificação do token de acesso
    test("Sucesso no cadastro e verificação do token de acesso", async () => {
        expect.assertions
        try {
            const accessToken = await userBusinessMock.signup("astsdrodev", "astrodev@gmail.com", "astrodev123", "ADMIN")
            expect(accessToken).toEqual({"accessToken": "token_mockado"})
        } catch (e: any) {
            console.log(e)
        }
    })


})

describe("teste de login", () =>{
    // Teste 1: Erro que deve retornar quando o email fornecido não existe 
    test("Erro que deve retornar quando o email fornecido não existe", async()=>{
        expect.assertions
        try{
            await userBusinessMock.login("flavio@email.com", "email")
        }catch(e:any){
            expect(e.message).toEqual("Invalid credentials")
            expect(e.statusCode).toBe(401)
        }
    })
    // Teste 2: Erro que deve retornar quando a senha está errada
    test("Erro que deve retornar quando a senha está errada", async()=>{
        expect.assertions
        try{
            await userBusinessMock.login("astrodev@gmail.com", "senhaErrada")
        }catch(e:any){
            expect(e.message).toEqual("Invalid credentials")
            expect(e.statusCode).toBe(401)
        }
    })
    // Teste 3: Sucesso no login e verificação do token de acesso 
    test("Sucesso no login e verificação do token de acesso", async()=>{
        expect.assertions
        try{
            const result = await userBusinessMock.login("astrodev@gmail.com", "astrodev123")
            expect(result).toEqual({"accessToken": "token_mockado"})
        }catch(e:any){
            console.log(e)
        }
    })
})