


//De ItemShop is de hoofdklasse van de logica.
class ItemShop
{
    //Hier houdt ik instances bij van de verschillende state klassen die ik gebruik voor dit voorbeeld.
    //Deze voorbeeldklassen worden in de State Classes file aangemaakt.
    public selectedItemState :State
    public purchaseItemState :State
    public cancelledPurchaseItemState :State
    public paidItemState :State
    public receivedItemState :State

    //De huidige waarde van de state wordt hier opgeslagen.
    private currentstate: State;

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
    get State(): State {
        return this.currentstate;
    }

    set State(value: State) {
        this.currentstate = value;
    }
}




//hieronder een kort voorbeeld dat met de bovengegeven state klassen kan werken.
let itemShop = new ItemShop();
//Correcte state change en zet de state van selectedItem naar purchaseItem.
itemShop.State.purchaseItem();
//Foutieve state change. Hier wordt een error message voor gelogged.
itemShop.State.itemReceived();