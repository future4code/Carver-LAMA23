import { BandDatabase } from "../data/BandDataBase";
import { UnauthorizedError } from "../error/UnauthorizedError";
import { Band, BandInputDTO } from "../model/Band";
import { UserRole } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class BandBusiness {
    constructor(
        private bandDatabase: BandDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ) { }

    async registerBand(input: BandInputDTO, token: string) {
        const tokenData = this.authenticator.getData(token)

        if (tokenData.role !== UserRole.ADMIN) {
            throw new UnauthorizedError('Somente ADMIN podem ter acesso')
        }
        if (!input.name || !input.musicGenre || !input.responsible) {
            throw new Error('Campos não preenchidos corretamente')
        }

        await this.bandDatabase.createBand(
            Band.toBandModel({
                ...input,
                id: this.idGenerator.generate()
            })
        )
    }

    async getBandById(id: string, token: string){
        if(!id){
            throw new Error('Id in params is not passed')
        }
        if(!token){
            throw new Error('invalid token')
        }
        const showDatabase = new BandDatabase()
        const result = await showDatabase.getBandById(id)
        return result
    }
}