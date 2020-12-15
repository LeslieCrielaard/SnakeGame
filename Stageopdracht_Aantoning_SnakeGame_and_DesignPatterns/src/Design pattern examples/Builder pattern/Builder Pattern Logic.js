"use strict";
//Het builder pattern is een indirecte, dynamische manier van het instantieren van een dataklasse.
//Hieronder een voorbeeld van deze uitwerking.
//Deze zal op verschillende manieren aangeroepen worden in de builder pattern caller als functioneel voorbeeld.
//De Item interface bevindt zich in de Example Item file.
class ItemBuilder {
    //Hier maak ik een nieuwe instantie van de interface aan met startwaardes
    constructor() {
        this.item = {
            name: "",
            type: "",
            value: 0
        };
    }
    //geeft de naam van het Item een waarde en returned de ItemBuilder naar de plek of methode die hem aanroept
    setName(name) {
        this.item.name = name;
        return this;
    }
    //geeft het type van het Item een waarde en returned de ItemBuilder naar de plek of methode die hem aanroept
    setType(type) {
        this.item.type = type;
        return this;
    }
    //geeft de value van het Item een waarde en returned de ItemBuilder naar de plek of methode die hem aanroept
    setValue(value) {
        this.item.value = value;
        return this;
    }
    //returned de door de ItemBuilder gemaakte Item interface terug naar de methode die hem aanroept
    build() {
        return this.item;
    }
}
