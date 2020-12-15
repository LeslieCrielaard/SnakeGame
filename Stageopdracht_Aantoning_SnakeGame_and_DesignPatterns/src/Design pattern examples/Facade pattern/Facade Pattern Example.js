"use strict";
//Het Facade pattern is vooral gebruikt wanneer meerdere en verschillende stukken logica worden uitgevoerd om een actie uit te voeren
//Het voorbeeld hieronder zal een structuurvoorbeeld geven. Geen uitgewerkte logica.
//Ik gebruik in deze logica de @ts-ignore. Dit is omdat anders foutmeldingen worden gegeven in deze voorbeeld code
//Ondergelegen zijn een aantal verschillende classes.
//Deze classes staan voor de complexe logica die uitgevoerd wordt.
class ComplexFilterLogic {
    // @ts-ignore
    FilterContent(user) {
        //Binnen deze methode wordt via een externe content filter API de content gefiltert voordat deze aan de klant weergegeven wordt
    }
}
class ComplexAuthorisationLogic {
    // @ts-ignore
    CheckUser(user) {
        //Binnen deze methode wordt via een externe API de user data vergeleken met data in de database om te kijken of deze gebruiker toegang tot bepaalde content heeft.
    }
}
class ComplexCredentialChecker {
    // @ts-ignore
    CheckLoginCredentials(user) {
        //Binnen deze methode wordt gecheckt of alle credentials benodigd voor inloggen aanwezig zijn en voldoen aan veiligheidseisen.
        //Vervolgens zal hier een restAPI call gemaakt worden die de data verder processed.
    }
}
//De klasse hieronder is de klasse die alle voorgaande 'complexe' methodes implementeerd.
class Login {
    constructor() {
        this.user = new TestUser();
    }
    //In deze methode maak ik een nieuwe instantie aan van de bovengelegen klassen.
    checkUser() {
        let complexCredentialChecker = new ComplexCredentialChecker();
        let complexAuthorisationLogic = new ComplexAuthorisationLogic();
        let complexFilterLogic = new ComplexFilterLogic();
        //Van de hierboven aangegeven methodes roep ik de methode aan. Per methode zal ik aangeven wat er voor de gebruiker klasse aangepast kan worden.
        //Dit zijn allemaal theoretische voorbeelden.
        //Hier worden de username en password van een gebruiker gechecked. Hieruit zal de logindata van een gebruiker geverifiëerd en teruggegeven.
        this.user = complexCredentialChecker.CheckLoginCredentials(this.user);
        //Hier zal het type account worden bepaalt.
        // Dit bijvoorbeeld in de vorm van het opzoeken van de gebruikersnaam of overige accountgegevens in een externe service.
        // De data wordt toegevoegd aan de user en teruggestuurd
        this.user = complexAuthorisationLogic.CheckUser(this.user);
        //Hier wordt de content waar de gebruiker bij kan gegeven en toegevoegd bij de gebruiker.
        this.user = complexFilterLogic.FilterContent(this.user);
    }
}
//Deze klasse dient als voorbeelddata die naar andere methodes wordt verzonden.
//De klasse is hierom leeggelaten
class TestUser {
}
