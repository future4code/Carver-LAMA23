export class Band {
    constructor(
        private id: string,
        private name: string,
        private musicGenre: string,
        private responsible: string,
    ) { }

    getId() {
        this.id
    }
    getName() {
        this.name
    }
    getMusicGenre() {
        this.musicGenre
    }
    getResponsible() {
        this.responsible
    }

    setName(name: string) {
        this.name = name;
    }

    setMainGenre(musicGenre: string) {
        this.musicGenre = musicGenre;
    }

    setResponsible(responsible: string) {
        this.responsible = responsible;
    }
    static toBandModel(data: any): Band {
        return new Band(data.id, data.name, data.musicGenre, data.responsible);
      }
}

export interface BandInputDTO{
    name: string;
    musicGenre: string;
    responsible: string;
}