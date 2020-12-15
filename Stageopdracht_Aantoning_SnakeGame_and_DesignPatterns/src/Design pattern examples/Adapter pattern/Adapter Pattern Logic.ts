

//SimpleObject is een voorbeeld van hoe het originele format aan data van dit voorbeeld is.
class SimpleObject{
    public showObject(): string{
     return "This is a simple object"
    }
}
//WeirdObject is een andere vorm van data die geconvert moet worden om op dezelfde manier uitgelezen te kunnen worden als SimpleObject
//In dit geval geef ik een string array terug in plaats van een string.
class WeirdObject{
    public showObject(){
        const stringValue: string= "This is a confusing object"
        return Array.from(stringValue);
    }
}

//Deze klasse bevat de logica voor het adapter pattern.
//In dit geval is dat het zorgen dat bij een WeirdObject dezelfde methode als een SimpleObject kan worden aangeroepen en dezelfde soort waarde teruggeeft.
//In dit geval wordt de array dus eerst terug naar string vorm gezet voordat deze wordt gereturned.
//De showObject methode is overgepakt uit de SimpleObject en heeft extra logica gekregen voor de benodigde conversie.
class Adapter extends SimpleObject{
    private weirdObject: WeirdObject;

    constructor(weirdObject: WeirdObject) {
        super();
        this.weirdObject = weirdObject;
    }
    public showObject(): string {
        let array = this.weirdObject.showObject();
        const result: string = array.toString();
        return `weirdObject data: (Converted) ${result}`;
    }
}
//Deze functie print het resultaat van de showObject methode in de console van de browser
function clientCode(simpleObject: SimpleObject) {
    console.log(simpleObject.showObject());
}

//Deze twee code lines laten het resultaat van het simpleobject zien.
const simpleObject = new SimpleObject();
clientCode(simpleObject);

//white line voor console
console.log('');

//Hier wordt de originele waarde van WeirdObject in de console gezet. In dit geval een string/character array
const weirdObject = new WeirdObject();
console.log(`weirdObject data: ${weirdObject.showObject()}`);

//white line voor console
console.log('');

//Hier wordt de aangepaste/geconverteerde waarde van het WeirdObject gebruikt.
//Het resultaat van deze twee lijnen aan code is net zoals het SimpleObject een normale string.
const adapter = new Adapter(weirdObject);
clientCode(adapter);