
//In deze file zal ik voorbeelden geven van hoe de builderpatternlogic aangeroepen kan worden om verschillende Items terug te krijgen.

const emptyItem: Item = new ItemBuilder()
    .build();

const itemWithName: Item = new ItemBuilder()
    .setName("NamedItem")
    .build();

const itemWithNameAndValue: Item = new ItemBuilder()
    .setName("NamedItem")
    .setValue(10)
    .build()

const namelessItemWithTypeAndValue: Item = new ItemBuilder()
    .setType("Invalid")
    .setValue(999)
    .build()

//Deze waardes kunnen dan met andere logica worden gebruikt of als testwaardes dienen.
//Hieronder een voorbeeld met het toevoegen van alle items aan een lijst en deze in de console schrijven met console.log.

// @ts-ignore
class ItemCreateAndRead{
    private itemList: Item[] = [];
    AddItemstoList():void {
        this.itemList.push(emptyItem)
        this.itemList.push(itemWithName)
        this.itemList.push(itemWithNameAndValue)
        this.itemList.push(namelessItemWithTypeAndValue)
    }
    ReadList(): void{
        this.itemList.forEach(function(item){
            console.log(`Item name: ${item.name}, item type: ${item.type}, item value: ${item.value}`);
        });
    }
}

