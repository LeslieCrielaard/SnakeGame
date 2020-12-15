"use strict";
class StrategyContext {
    //Setup van strategie wanneer de context klasse wordt aangemaakt.
    constructor(strategy) {
        this.strategy = strategy;
    }
    //Hiermee kan de strategie aangepast worden wanneer het programma in werking is.
    setStrategy(strategy) {
        this.strategy = strategy;
    }
    //Hier roep ik de logica van de gekozen strategie aan.
    //Het resultaat van de methode wordt samengevoegd en in de console van de browser gezet.
    logData() {
        const result = this.strategy.dataSorting(['a', 'b', 'c', 'd', 'e']);
        console.log(result.join(','));
    }
}
//Beide van de ondergegeven ConcreteStrategy klassen hebbem hun eigen logica onder de methode.
//Hiermee kan je de businesslogica die bij de methode uitgevoerd moet worden veranderen,
//maar nogsteeds de structuur van de aanroep behouden.
class ConcreteStrategyA {
    dataSorting(data) {
        return data.sort();
    }
}
class ConcreteStrategyB {
    dataSorting(data) {
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
