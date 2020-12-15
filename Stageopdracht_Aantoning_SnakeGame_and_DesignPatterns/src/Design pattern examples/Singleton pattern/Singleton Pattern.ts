class SingletonExample{
    //De instantie van de singleton
    private static instance: SingletonExample;
    //Een waarde voor de singleton
    private _instanceValue: string ="";

    private constructor() {
    }

    //In deze methode wordt gekeken of er al een instantie aangemaakt is voor de SingletonExample klasse.
    //Indien deze instantie nog niet bestaat wordt er een nieuwe instantie aangemaakt en gereturned.
    //Indien er wel een instantie bestaat wordt deze gereturned.
    static getInstance(): SingletonExample {
        if (!SingletonExample.instance) {
            SingletonExample.instance = new SingletonExample();
        }
        return SingletonExample.instance;
    }

    //Haalt de string waarde van instancevalue op en returned deze
    get instancevalue(): string {
        return this._instanceValue;
    }

    //Geeft de instancevalue eens string waarde
    set instanceValue(value: string) {
        this._instanceValue = value;
    }
}