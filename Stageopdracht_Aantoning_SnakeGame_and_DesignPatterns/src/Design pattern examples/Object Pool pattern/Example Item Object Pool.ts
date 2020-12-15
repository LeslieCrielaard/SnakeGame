
//Deze dataklasse is een voorbeeld gebruikt voor object pooling
class ReusableApple{
    //variabelen voor de dataklasse. De undefined is om errors binnen de klasse weg te halen.
    public positionX: number | undefined;
    public positionY: number | undefined;
    public points: number | undefined;
    public pickedUp: boolean | undefined;

    constructor() {
        this.resetValues();
    }

    //Zet default waardes voor de variabelen binnen deze klasse.
    public resetValues(){
        this.positionX = 0;
        this.positionY = 0;
        this.points = 0;
        this.pickedUp = false;
    }
}