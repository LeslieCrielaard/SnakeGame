"use strict";
//Deze dataklasse is een voorbeeld gebruikt voor object pooling
class ReusableApple {
    constructor() {
        this.resetValues();
    }
    //Zet default waardes voor de variabelen binnen deze klasse.
    resetValues() {
        this.positionX = 0;
        this.positionY = 0;
        this.points = 0;
        this.pickedUp = false;
    }
}
