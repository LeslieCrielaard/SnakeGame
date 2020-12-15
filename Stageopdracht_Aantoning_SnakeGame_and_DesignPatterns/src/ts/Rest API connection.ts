const axios = require('axios');

// Deze interface is voor het aanmaken van de data objecten die uit de promise van getHighestScores terug komen.
export class Score{
    private _PlayerName: string;
    private _Score: number;

    get PlayerName(): string {
        return this._PlayerName;
    }

    set PlayerName(value: string) {
        this._PlayerName = value;
    }

    get Score(): number {
        return this._Score;
    }

    set Score(value: number) {
        this._Score = value;
    }

    constructor(PlayerName: string, Score: number) {
        this._PlayerName = PlayerName;
        this._Score = Score;
    }
}

// Connection string naar de RestAPI
const apiUrl: string = 'http://localhost:8080';

// Axios methodes om de backend aan te roepen.
export const ScoreMethods = {
    methods: {
        async insertScore(params: any) {
          return await axios.post(`${apiUrl}/storeScore`, params);
        },
        async getHighestScores() {
            return await axios.get(`${apiUrl}/getHighestScores`);
        }
    }
}