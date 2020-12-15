"use strict";
class SingletonExample {
    constructor() {
        //Een waarde voor de singleton
        this._instanceValue = "";
    }
    //In deze methode wordt gekeken of er al een instantie aangemaakt is voor de SingletonExample klasse.
    //Indien deze instantie nog niet bestaat wordt er een nieuwe instantie aangemaakt en gereturned.
    //Indien er wel een instantie bestaat wordt deze gereturned.
    static getInstance() {
        if (!SingletonExample.instance) {
            SingletonExample.instance = new SingletonExample();
        }
        return SingletonExample.instance;
    }
    //Haalt de string waarde van instancevalue op en returned deze
    get instancevalue() {
        return this._instanceValue;
    }
    //Geeft de instancevalue eens string waarde
    set instanceValue(value) {
        this._instanceValue = value;
    }
}
