

//Superklasse van de onderstaande logica. Deze creator bevat de logica die gebruikt wordt om de edibleitems aan te maken.
abstract class Creator {
    //default implementatie van de factory method. Deze is er om een item aan te maken voldoende aan de in dit voorbeeld gegeven interface
    public abstract factoryMethod(): EdibleItem;

    public createFoodItem(): string {
        //Hier wordt de edibleItem variabele gelijk gezet aan de waarde die terugkomt van de factoryMethod
        const edibleItem = this.factoryMethod();
        //Gebruikt het aangemaakte item en returned zijn naam.
        return edibleItem.itemName();
    }
}
//Creëert een nieuwe Apple klasse en returned deze via de creator.
class AppleCreator extends Creator {
    public factoryMethod(): EdibleItem {
        return new Apple();
    }
}

//Creëert een nieuwe Porkchop klasse en returned deze via de creator.
class PorkchopCreator extends Creator {
    public factoryMethod(): EdibleItem {
        return new Porkchop();
    }
}

//Interface die door alle items wordt gebruikt om op deze manier verschillende objecten met dezelfde structuur aan te maken.
//In dit geval heeft een edibleItem alleen maar een naam.
//toevoegingen kunnen zijn methodes of waardes zoals saturation of gewicht.
interface EdibleItem {
    itemName(): string;
}



//Logt de naam van het gecreëerde item in de console van de web browser
function showEdible(creator: Creator){
    console.log(creator.createFoodItem())
}

//Deze twee methoden creëren elk een nieuwe creator om een food item aan te maken.
//Deze wordt naar showEdible gestuurt om de actie mee uit te voeren
showEdible(new AppleCreator());

showEdible(new PorkchopCreator());