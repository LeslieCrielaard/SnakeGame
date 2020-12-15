
class StrategyContext {
 //De context houd een referentie bij naar de gekozen strategie.
    private strategy: Strategy;

    //Setup van strategie wanneer de context klasse wordt aangemaakt.
    constructor(strategy: Strategy) {
        this.strategy = strategy;
    }

//Hiermee kan de strategie aangepast worden wanneer het programma in werking is.
    public setStrategy(strategy: Strategy) {
        this.strategy = strategy;
    }

    //Hier roep ik de logica van de gekozen strategie aan.
    //Het resultaat van de methode wordt samengevoegd en in de console van de browser gezet.
    public logData(): void {
        const result = this.strategy.dataSorting(['a', 'b', 'c', 'd', 'e']);
        console.log(result.join(','));
    }
}

//Deze interface bevat de methode die door beide ConcreteStrategy klassen geïmplementeerd wordt
interface Strategy {
    dataSorting(data: string[]): string[];
}

//Beide van de ondergegeven ConcreteStrategy klassen hebbem hun eigen logica onder de methode.
//Hiermee kan je de businesslogica die bij de methode uitgevoerd moet worden veranderen,
//maar nogsteeds de structuur van de aanroep behouden.
class ConcreteStrategyA implements Strategy {
    public dataSorting(data: string[]): string[] {
        return data.sort();
    }
}

class ConcreteStrategyB implements Strategy {
    public dataSorting(data: string[]): string[] {
        return data.reverse();
    }
}


//Hieronder zijn 2 voorbeelden voor het gebruik van de bovenstaande logica.

//StrategyContext wordt aangemaakt met de ConcreteStrategyA als beginwaarde.
const strategyContext = new StrategyContext(new ConcreteStrategyA());
strategyContext.logData();

console.log('');

//Na het aanmaken en uitvoeren van de logica onder ConcreteStrategyA wordt deze veranderd naar ConcreteStrategyB en de uitvoering herhaald.
strategyContext.setStrategy(new ConcreteStrategyB());
strategyContext.logData();