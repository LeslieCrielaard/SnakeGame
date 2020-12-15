interface IObservable{
    RegisterObserver: Function;
    RemoveObserver: Function;
    NotifyObservers: Function;
}

class Observable implements IObservable{
    private subscribers: any[] = [];
    public RegisterObserver(cb: any) {
        //Voeg een Observer toe aan de subscriber array and print de naam van de observer
        this.subscribers.push(cb);
        console.log(`${cb.name} " has been subscribed`);
    }
    public RemoveObserver(cb: any) {
        this.subscribers = this.subscribers.filter((el) => {
            return el !== cb;
        });
    }
    public NotifyObservers(data: string) {
        this.subscribers.forEach((subscriber) => {
            subscriber(data);
        });
    }
}

//Hieronder heb ik 2 observers heel simpele observers aangemaakt voor de voorbeeld code.
// Deze observers zullen als voorbeeld implementatie dienen
class Observer {
    constructor(data: string) {
        console.log(`Here is the published message via Observer: ${data}`);
    }
}

class Observer2 {
    constructor(data: string) {
        console.log(`Here is the published message via Observer2: ${data}`);
    }
}

//Voorbeeld implementatie code
//Hieronder maak ik een nieuwe observable aan en voeg ik hier de Observer en Observer2 klasses aan toe.
//Verdere acties zijn de notify en Remove.
// Dit om te laten zien dat de observers werken en dat ik deze kan verwijderen.

const observable = new Observable();
observable.RegisterObserver(Observer);
observable.RegisterObserver(Observer2);
observable.NotifyObservers("Broadcast!");
observable.RemoveObserver(Observer);
observable.NotifyObservers("Broadcast after Observer unsubscribed");
