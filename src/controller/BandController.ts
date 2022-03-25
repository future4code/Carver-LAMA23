import { Request, Response } from "express";
import { BandBusiness } from "../business/BandBusiness";
import { BandDatabase } from "../data/BandDataBase";
import { BaseDatabase } from "../data/BaseDatabase";
import { BandInputDTO } from "../model/Band";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class BandController {
    async createBand(req: Request, res: Response) {
        try {
            const input: BandInputDTO = {
                name: req.body.name,
                musicGenre: req.body.musicGenre,
                responsible: req.body.responsible
            }
            const bandBusiness = new BandBusiness(
                new BandDatabase,
                new IdGenerator,
                new Authenticator
            )
            await bandBusiness.registerBand(input, req.headers.authorization as string)

            res.sendStatus(200);

        } catch (error) {
            console.log(error)
            res.status(400).send({ error: error.message });
        }
        await BaseDatabase.destroyConnection();
    }



    async getBandById(req: Request, res: Response) {

        const id: any = req.params
        const header: string = req.headers.authorization as string
    
            const bandBusiness = new BandBusiness(
                new BandDatabase,
                new IdGenerator,
                new Authenticator
            )
            
            try {
            await bandBusiness.getBandById(id, header)
            const result = await bandBusiness.getBandById(id, header)
            
            res.status(200).send({ result });
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }
}