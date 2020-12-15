
//Deze file bevat dataclasses die geïnstancieerd worden via het factory pattern.
//De classes hieronder zijn 2 voorbeelden van het pattern
class Apple implements EdibleItem{
    itemName(): string {
        return "Apple";
    }
}
class Porkchop implements EdibleItem{
    itemName(): string {
        return "Porkchop";
    }
}



