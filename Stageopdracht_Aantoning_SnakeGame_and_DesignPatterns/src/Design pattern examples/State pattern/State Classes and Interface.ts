


//Deze interface bevat de verschillende methodes die in de hieronder aangemaakte state klasses gebruikt moeten worden en een instantie van de itemShop waarnaartoe de logica terug moet verwijzen.
//De ItemShop is terug te vinden in de State Pattern Example file.
interface State{
    itemShop: ItemShop
    selectItem(): void;
    purchaseItem(): void;
    cancelPurchase(): void;
    itemPaid(): void;
    itemReceived(): void;
}


//Ondergelegen klasses zijn verschillende states die gebruikt worden in de ItemShop klasse, welke terug te vinden is in de State Pattern Example file.
//Met de State interface worden deze onthouden in de ItemShop en hebben ze de methodes die benodigd zijn voor de gewenste functionaliteit.
class ItemSelectedState implements State{
    public itemShop: ItemShop;

    constructor(itemShop: ItemShop) {
        this.itemShop = itemShop;
    }

    cancelPurchase() {
        console.log("Selected item has been removed");
        this.itemShop.State= this.itemShop.cancelledPurchaseItemState;
    }

    itemPaid() {
        console.log("You did not confirm payment for your item yet");
    }

    itemReceived() {
        console.log("Item has not been paid yet");
    }

    purchaseItem() {
        console.log("Please pay to receive the item");
        this.itemShop.State=this.itemShop.purchaseItemState;
    }

    selectItem() {
        console.log("Item has already been selected");
    }
}

class ItemPurchaseState implements State{
    public itemShop: ItemShop;

    constructor(itemShop: ItemShop) {
        this.itemShop = itemShop;
    }

    cancelPurchase() {
        console.log("purchase cancelled");
        this.itemShop.State= this.itemShop.cancelledPurchaseItemState;
    }

    itemPaid() {
        console.log("Item paid");
        this.itemShop.State=this.itemShop.paidItemState;
    }

    itemReceived() {
        console.log("Item has not been paid yet");
    }

    purchaseItem() {
        console.log("Item is already readied for purchase");
    }

    selectItem() {
        console.log("Item has already been selected");
    }
}

class ItemPurchaseCancelledState implements State{
    public itemShop: ItemShop;

    constructor(itemShop: ItemShop) {
        this.itemShop = itemShop;
    }

    cancelPurchase() {
        console.log("Purchase has already been cancelled");
    }

    itemPaid() {
        console.log("payment cancelled, can't pay for this item");
    }

    itemReceived() {
        console.log("purchase cancelled, no item to receive");
    }

    purchaseItem() {
        console.log("Purchase has been cancelled. There is no item to pay for");
    }

    selectItem() {
        console.log("Item has already been selected");
        this.itemShop.State=this.itemShop.selectedItemState;
    }
}

class ItemPaidState implements State{
    public itemShop: ItemShop;

    constructor(itemShop: ItemShop) {
        this.itemShop = itemShop;
    }

    cancelPurchase() {
        console.log("A paid item can not be cancelled");
    }

    itemPaid() {
        console.log("Item has already been paid for");
    }

    itemReceived() {
        console.log("Item received");
        this.itemShop.State=this.itemShop.receivedItemState;
    }

    purchaseItem() {
        console.log("Item has already been paid for");
    }

    selectItem() {
        console.log("Can't select a paid item");
    }
}

class ItemReceivedState implements State{
    public itemShop: ItemShop;

    constructor(itemShop: ItemShop) {
        this.itemShop = itemShop;
    }

    cancelPurchase() {
        console.log("A received item cannot be removed");
    }

    itemPaid() {
        console.log("Item has already been payed for");
    }

    itemReceived() {
        console.log("You already received the item");
    }

    purchaseItem() {
        console.log("A received item can't be paid for");
    }

    selectItem() {
        console.log("A received item can't be selected for purchase");
    }
}