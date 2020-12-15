"use strict";
//De ItemShop is de hoofdklasse van de logica.
class ItemShop {
    //Constructor die een eerste instantie voor alle states aanmaakt en een eerste waarde geeft aan de currentState.
    constructor() {
        this.selectedItemState = new ItemSelectedState(this);
        this.purchaseItemState = new ItemPurchaseState(this);
        this.cancelledPurchaseItemState = new ItemPurchaseCancelledState(this);
        this.paidItemState = new ItemPaidState(this);
        this.receivedItemState = new ItemReceivedState(this);
        this.currentstate = this.selectedItemState;
    }
    //Simpele getter en setter voor de currentstate van de itemShop.
    get State() {
        return this.currentstate;
    }
    set State(value) {
        this.currentstate = value;
    }
}
//hieronder een kort voorbeeld dat met de bovengegeven state klassen kan werken.
let itemShop = new ItemShop();
//Correcte state change en zet de state van selectedItem naar purchaseItem.
itemShop.State.purchaseItem();
//Foutieve state change. Hier wordt een error message voor gelogged.
itemShop.State.itemReceived();
