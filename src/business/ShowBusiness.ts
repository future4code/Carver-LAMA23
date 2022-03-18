import { BandDatabase } from "../data/BandDataBase";
import { ShowDatabase } from "../data/ShowDatabase";
import { Show, ShowInputDTO } from "../model/Show";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class ShowBusiness {
    constructor(
        private showDatabase: ShowDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ){}

    async createShow (input: ShowInputDTO, token:string): Promise<void> {
        if(!token) {
            throw new Error("Você não está autorizado ")
        }

        if(!input) {
            throw new Error ("Verifique se os campos para a criação do show foram informados corretamente")
        }

        const tokenVerify = this.authenticator.getData(token)
        if(!tokenVerify){
            throw new Error("Token invalido")
        }
    
        await this.showDatabase.createShow(
            Show.toShowModel({
                ...input,
                id: this.idGenerator.generate()
            })
        )
    }

    async getShowByDate (date: any, token: string) {
        if(!date){
            throw new Error('Date in params is not passed')
        }

        if(!token){
            throw new Error('invalid token')
        }
        
        const showDatabase = new ShowDatabase()
        const result = await showDatabase.getShowByDate(date)
        return result
    }
}

