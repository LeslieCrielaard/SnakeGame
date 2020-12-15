"use strict";
//Superklasse van de onderstaande logica. Deze creator bevat de logica die gebruikt wordt om de edibleitems aan te maken.
class Creator {
    createFoodItem() {
        //Hier wordt de edibleItem variabele gelijk gezet aan de waarde die terugkomt van de factoryMethod
        const edibleItem = this.factoryMethod();
        //Gebruikt het aangemaakte item en returned zijn naam.
        return edibleItem.itemName();
    }
}
//Creëert een nieuwe Apple klasse en returned deze via de creator.
class AppleCreator extends Creator {
    factoryMethod() {
        return new Apple();
    }
}
//Creëert een nieuwe Porkchop klasse en returned deze via de creator.
class PorkchopCreator extends Creator {
    factoryMethod() {
        return new Porkchop();
    }
}
//Logt de naam van het gecreëerde item in de console van de web browser
function showEdible(creator) {
    console.log(creator.createFoodItem());
}
//Deze twee methoden creëren elk een nieuwe creator om een food item aan te maken.
//Deze wordt naar showEdible gestuurt om de actie mee uit te voeren
showEdible(new AppleCreator());
showEdible(new PorkchopCreator());
