export class Show {
    constructor(
        private id: string,
        private week_day: string,
        private start_time: string,
        private end_time: string,
        private band_id: string
    ) { }

    getId() {
        this.id
    }
    getWeedDay() {
        this.week_day
    }
    getStartTime() {
        this.start_time
    }
    getEndTime() {
        this.end_time
    }

    getBandId(){
        this.band_id
    }

   
    static toShowModel(data: any): Show {
        return new Show (data.id, data.week_day, data.start_time, data.end_time, data.band_id);
      }
}


export interface ShowInputDTO{
    week_day: string,
    start_time: string,
    end_time: string,
    band_id: string
}