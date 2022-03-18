import { User } from "../../src/model/User";
import { userMock, userMock2 } from "./userMock";

export class UserDataBaseMock{
    public async createUser(user: User): Promise<void> {}
    public async getUserByEmail(email: string): Promise<User | undefined> {
        if(email === "astrodev@gmail.com"){
            return userMock
        }else if(email === "astrodev2@gmail.com"){
            return userMock2
        }else{
            undefined
        }
    }
    public async getUserById(id: string): Promise<User | undefined> {
        if(id === "id_mockado"){
            return userMock
        }else if(id === "id_mockado_2"){
            return userMock2
        }else{
            undefined
        }
    }
    public async getAllUsers(): Promise<User[]> {
        return [userMock, userMock2]
    }
}