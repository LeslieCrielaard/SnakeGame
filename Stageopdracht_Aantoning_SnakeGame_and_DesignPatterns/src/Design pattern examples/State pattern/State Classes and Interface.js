"use strict";
//Ondergelegen klasses zijn verschillende states die gebruikt worden in de ItemShop klasse, welke terug te vinden is in de State Pattern Example file.
//Met de State interface worden deze onthouden in de ItemShop en hebben ze de methodes die benodigd zijn voor de gewenste functionaliteit.
class ItemSelectedState {
    constructor(itemShop) {
        this.itemShop = itemShop;
    }
    cancelPurchase() {
        console.log("Selected item has been removed");
        this.itemShop.State = this.itemShop.cancelledPurchaseItemState;
    }
    itemPaid() {
        console.log("You did not confirm payment for your item yet");
    }
    itemReceived() {
        console.log("Item has not been paid yet");
    }
    purchaseItem() {
        console.log("Please pay to receive the item");
        this.itemShop.State = this.itemShop.purchaseItemState;
    }
    selectItem() {
        console.log("Item has already been selected");
    }
}
class ItemPurchaseState {
    constructor(itemShop) {
        this.itemShop = itemShop;
    }
    cancelPurchase() {
        console.log("purchase cancelled");
        this.itemShop.State = this.itemShop.cancelledPurchaseItemState;
    }
    itemPaid() {
        console.log("Item paid");
        this.itemShop.State = this.itemShop.paidItemState;
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
class ItemPurchaseCancelledState {
    constructor(itemShop) {
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
        this.itemShop.State = this.itemShop.selectedItemState;
    }
}
class ItemPaidState {
    constructor(itemShop) {
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
        this.itemShop.State = this.itemShop.receivedItemState;
    }
    purchaseItem() {
        console.log("Item has already been paid for");
    }
    selectItem() {
        console.log("Can't select a paid item");
    }
}
class ItemReceivedState {
    constructor(itemShop) {
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
