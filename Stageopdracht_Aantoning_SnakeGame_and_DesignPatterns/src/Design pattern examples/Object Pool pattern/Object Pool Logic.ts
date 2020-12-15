
//Ondergegeven is de object pool logica. Deze maakt gebruik van de ReusableApple, gegeven in de Example item Object pool file

//Ik gebruik in deze logica de @ts-ignore. Dit is omdat anders foutmeldingen worden gegeven in deze voorbeeld code
class ObjectPool {
    //Array met actieve Reusableapples
    private activeItemsList: Array<ReusableApple>;

    //Array met niet actieve ReusableApples
    private inactiveItemList: Array<ReusableApple>;

    // @ts-ignore
    //Nummer aan items in de arrays. Kan voor bijvoorbeeld debugging gebruikt worden
    private activeApples: number;
    private inactiveApples: number;

    //constructor voor de objectpool klasse met een gegeven waarde voor de inactieve items.
    constructor(inactive: number = 4) {
        //Maakt nieuwe arrays aan wanneer de objectpool wordt aangemaakt
        this.activeItemsList = new Array<ReusableApple>();
        this.inactiveItemList = new Array<ReusableApple>();

        //Zet startwaarde van de int/number variabelen.
        this.activeApples = 0;
        this.inactiveApples = 0;

        //Setup methode voor het aantal inactieve items.
        this.initializeInactive(inactive);
    }

    private initializeInactive(inactive: number)
    {
        for(let i = 0; i < inactive; i++)
        {
            const gameObject = new ReusableApple();
            this.inactiveItemList.push(gameObject);
        }
    }
    public getReusableApple(): ReusableApple
    {
        //Voegt een ReusableApple toe aan de inactiveItemList array wanneer inactiveApples gelijk is aan 0.
        if(this.inactiveApples == 0)
        {
            this.inactiveItemList.push(new ReusableApple());
            this.inactiveApples++;
        }
        //pakt het laatste item uit de inactiveItemList array en returned deze.
        const gameObject = this.inactiveItemList.pop();
        //Verminderd het aantal aan inactiveapples
        this.inactiveApples--;

        //checkt of het gameobject een instantie is van de ReusableApple klasse.
        //Als het gameobject een ReusableApple is wordt deze toegevoegd aan de activeItemList array
        if (gameObject instanceof ReusableApple) {
            this.activeItemsList.push(gameObject);
        }
        this.activeApples++;
        //reset de waarde van het gameobject dat uit de array is gehaald.

        // @ts-ignore
        gameObject.clear();

        return <ReusableApple>gameObject;
    }

    public returnReusableApple(gameObject: ReusableApple)
    {
        // Get the index of the gameObject in the active list:
        const index = this.activeItemsList.indexOf(gameObject);
        if(index >= 0)
        {
            // Splice de array rond het item dat uit de array gehaald moet worden en verlaag de Activeapples waarde
            this.activeItemsList.splice(index, 1);
            this.activeApples--;

            //voeg het gameObject toe aan de inactive array en verhoogt de inactiveApples waarde
            this.inactiveItemList.push(gameObject);
            this.inactiveApples++;
        }
    }
}