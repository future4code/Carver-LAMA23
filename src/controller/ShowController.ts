import { Request, Response } from "express";
import { ShowBusiness } from "../business/ShowBusiness";
import { ShowDatabase } from "../data/ShowDatabase";
import { ShowInputDTO } from "../model/Show";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class ShowController {
    async createShow (req: Request, res: Response){
        const input : ShowInputDTO ={
            week_day: req.body.week_day,
            start_time: req.body.start_time, 
            end_time: req.body.end_time, 
            band_id: req.body.band_id
        } 

        const showBusiness = new ShowBusiness(
            new ShowDatabase,
            new IdGenerator,
            new Authenticator
        )
        await showBusiness.createShow(input, req.headers.authorization as string)

        res.sendStatus(200);

    }

    async getShowByDate(req: Request, res: Response): Promise<void> {
        
        const date: any = req.query.week_day
        const header: string = req.headers.authorization as string
        
        const showBusiness = new ShowBusiness(
            new ShowDatabase,
            new IdGenerator,
            new Authenticator
            )
     try {
            await showBusiness.getShowByDate(date, header)
            const result = await showBusiness.getShowByDate(date, header)
            res.status(200).send({ result });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }
}