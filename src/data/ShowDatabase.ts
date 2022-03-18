import { Show } from "../model/Show";
import { BaseDatabase } from "./BaseDatabase";

export class ShowDatabase extends BaseDatabase{
    private static TABLE_NAME = "NOME_TABELA_SHOWS";

    public async createShow (show: Show): Promise<void> {
        try {
            await this.getConnection()
                .insert({
                    id: show.getId,
                    week_day: show.getWeedDay,
                    start_time: show.getStartTime,
                    end_time: show.getEndTime,
                    band_id: show.getBandId
                })
                .into(ShowDatabase.TABLE_NAME)
        } catch (error:any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
    
    
    public async getShowByDate(week_day: string): Promise<Show> {
    const result = await this.getConnection()
      .select("*")
      .from(ShowDatabase.TABLE_NAME)
      .where({week_day});

    return Show.toShowModel(result[0]);
  }

}
