import * as PIXI from "pixi.js";
const TextInput = require('pixi-text-input')
global.PIXI = PIXI;

import GenerateBoard from "~ts/BoardGrid";
import {Position} from "~ts/BoardGrid";
// @ts-ignore
import {ScoreMethods,Score} from "~ts/Rest API connection"
require("regenerator-runtime/runtime");
let app: PIXI.Application;

//html canvas
let canvas;

//playerName
let PlayerName: string="";

let Score: number;

//images
const Apple =require('./Assets/Apple.png');
const SnakeMenu =require('./Assets/SnakeMenu.png');
const MainMenuButton = require('./Assets/MainMenuButton.png');
const StartGameButton = require('./Assets/StartGameButton.png');
const SnakeHead =require('./Assets/SnakeHead.png');
const SnakeBody =require('./Assets/SnakeBodyPart.png');
const SnakeTail = require('./Assets/SnakeTail.png');

//gebruikte sprites
const snakeHead = PIXI.Sprite.from(SnakeHead);
const snakeBody =PIXI.Sprite.from(SnakeBody);
const snakeTail = PIXI.Sprite.from(SnakeTail);
const appleSprite = PIXI.Sprite.from(Apple);
const snakeMenu = PIXI.Sprite.from(SnakeMenu);

//Lijst van alle snakeBody's die de snake heeft.
let snakeBodyArray: PIXI.Sprite[] = [];

let ScoreText: PIXI.Text;

let FoodEaten: boolean=false;

//Direction data
const StartDirection = 'Left';
let direction: string;


//position
let previousX: number;
let previousY: number;

//Rotation
let left: number =0;
let up: number=1.57079633;
let down: number =-1.57079633;
let right: number = 3.14159266;

//resolution value
const resX: number=900;
const resY: number=900;

//Text style
let style = new PIXI.TextStyle({fill: 0x000000, fontSize: 80, fontFamily: "Arial", fontStyle: "Bold", stroke: 0xFFFFFF, strokeThickness: 5});
let scoreStyle = new PIXI.TextStyle({fill: 0x000000, fontSize: 40, fontFamily: "Arial", fontStyle: "Bold", stroke: 0xFFFFFF, strokeThickness: 5});

// De 3 scenes die in de game worden gebruikt
let mainMenuScene: PIXI.Container = new PIXI.Container;
let gameScene: PIXI.Container = new PIXI.Container;
let gameOverScene: PIXI.Container = new PIXI.Container;

// Game board generator en game board.
const BoardGrid: GenerateBoard = new GenerateBoard();
const Board: Position[] =BoardGrid.generateField();

// Deze lijst is voor het genereren van posities van de appel
let positionList: Position[];

    window.onload = function() {
    canvas = document.getElementById("app.view")
        // Aanmaak applicatie
    app = new PIXI.Application({
        // @ts-ignore
        view: canvas,
        width: resX,
        height: resY,
        antialias: true,
        backgroundColor:0x00FF00,
        resolution: window.devicePixelRatio || 1,
    });
    // Keyboard events
    window.addEventListener('keydown', (e) => {
        switch (e.key.toUpperCase()) {
            // Deze onderstaande events veranderen de directie van de beweging die het hoofd maakt.
            // Ook wordt de rotatie van de sprite naar de juiste positie voor de beweging veranderd.
            // PIXI.js werkt met radialen als waardes. Deze staan bovenaan gedefineerd en worden bij naam gebruikt.
            case 'W': if(direction!="Up"&&direction!="Down")
            {
                direction="Up";
                snakeHead.rotation = up;
            }
            break;
            case 'A': if(direction!="Right"&&direction!="Left")
            {
                direction="Left";
                snakeHead.rotation = left;
            }
            break;
            case 'S': if(direction!="Up"&&direction!="Down")
            {
                direction="Down";
                snakeHead.rotation = down;
            }
            break;
            case 'D': if(direction!="Right"&&direction!="Left")
            {
                direction="Right";
                snakeHead.rotation = right;
            }
            break;
            default: break;
        }
    });

    // Hier wordt een losstaande kopie van het volledige game board gemaakt om de mogelijke posities voor de appels op bij te houden.
    positionList = Board.slice();
    // Setup van verschillende scenes voor de game.
    createMainMenu();
    app.stage.addChild(mainMenuScene);
    app.stage.addChild(gameScene);
    gameScene.visible = false;
    createGameOver()
    app.stage.addChild(gameOverScene);
    gameOverScene.visible= false;
}
// De core loop van de game
function gameLoop() {
        moveSnake();
        spritesIntersect(snakeHead,appleSprite);
}
// Deze methode start het spel.
// Binnen deze methode wordt een nieuwe slang aangemaakt en een nieuwe appel gegenereerd.
// Verder wordt hierin ook de snelheid van de ticker ingesteld en wordt de gameLoop methode toegevoegd aan de ticker.
function startSnakeGame(){
    resetSnake();
    randomApple();
    app.ticker.maxFPS=5;
    app.ticker.add(gameLoop);
}


// Deze methode wordt aangeroepen als je de muur of een ander deel van je slang raakt en eindigd het spel.
// Deze methode voegt ook de score en naam van de speler toe aan de database met behulp van een axios post method.
function gameOver(boardPos: Position){
    previousX = boardPos.xPos + 2;
    previousY = boardPos.yPos;
    app.ticker.remove(gameLoop);
            if (PlayerName.length > 0) {
                const params = new URLSearchParams();
                params.append("PlayerName",PlayerName)
                // @ts-ignore
                params.append("Score",Score)
                ScoreMethods.methods.insertScore(params).then(function (){
                    //verwijderd de game loop uit de ticker en laat het gameOver scherm zien.
                    ShowGameOver();
                });
            }
            else{
                ShowGameOver();
            }
}

// In deze functie wordt het main menu scherm opgezet.
function createMainMenu(){
    snakeMenu.width = resX;
    snakeMenu.height = resY;
    mainMenuScene.addChild(snakeMenu);
    let mainMenu = new PIXI.Text("Snake!");
    mainMenu.x= 300;
    mainMenu.y =150;
    mainMenu.style = style;
    mainMenuScene.addChild(mainMenu);
let button = PIXI.Sprite.from(StartGameButton);
    button.x = 300;
    button.y = 500;
    button.interactive = true;
    button.buttonMode= true;
    button.on('mousedown',onButtonDown)

    mainMenuScene.addChild(button);
    let input = new TextInput({
        input:{fontSize: '15pt',
        width: '300px',
        height: '50px'},
        box: {fill: 0xEEEEEE}
    })
    input.x = 300;
    input.y = 400;
    input.maxLength = 16;
    input.placeholder = 'Enter a playername...'
    input.on('input', function(text: string){
        PlayerName = text
    });
    mainMenuScene.addChild(input);
}

// Deze functie staat gekoppeld aan de start game button in de main menu en wordt getriggered met behulp van een pixi button event.
// De methode verandert de scene en start een game.
function  onButtonDown(){
mainMenuScene.visible = false;
gameScene.visible = true;
startSnakeGame();
}

// Deze functie creëert de game over scene
function createGameOver(){
    gameOverScene.width = resX;
    gameOverScene.height = resY;
    let gameOver = new PIXI.Text("Game over");
    gameOver.anchor.set(0.5);
    gameOver.x= 410;
    gameOver.y =100;
    gameOver.style =style;


    gameOverScene.addChild(gameOver);
    let button = PIXI.Sprite.from(MainMenuButton);
    button.anchor.set(0.5);
    button.x = 400;
    button.y = 780;
    button.interactive = true;
    button.buttonMode= true;
    button.on('mousedown',MainMenuEnable);
    gameOverScene.addChild(button);
}

// Deze methode wordt aangeroepen wanneer de speler af gaat door de GameOver functie.
 function ShowGameOver() {
    snakeBodyArray = [];
    gameScene.visible = false;
    ScoreMethods.methods.getHighestScores().then(function (response) {
        console.log(response.data);
        let scoreList= response.data;
        console.log(scoreList);
        let ScoreNumberPositionX: number = 150;
        let ScoreNumberPositionY: number = 170;

        let ScoreTextPositionX: number = 400;
        let ScoreTextPositionY: number = 170;

        let ScoreValuePositionX: number = 650;
        let ScoreValuePositionY: number = 170;
        for(let i=0; i<10; i++)
        {   let ScoreNumber =new PIXI.Text(String(i + 1))
            let ScoreText = new PIXI.Text(  scoreList[i].playerName)
            let ScoreValue=new PIXI.Text(scoreList[i].score);
                ScoreNumber.anchor.set(0.5);
                ScoreNumber.x = ScoreNumberPositionX;
                ScoreNumber.y = ScoreNumberPositionY;
                ScoreNumber.style = scoreStyle;
                gameOverScene.addChild(ScoreNumber);

                ScoreText.anchor.set(0.5);
                ScoreText.x = ScoreTextPositionX;
                ScoreText.y = ScoreTextPositionY;
                ScoreText.style = scoreStyle;
                gameOverScene.addChild(ScoreText);

                ScoreValue.anchor.set(0.5);
                ScoreValue.x = ScoreValuePositionX;
                ScoreValue.y = ScoreTextPositionY;
                ScoreValue.style = scoreStyle;
                gameOverScene.addChild(ScoreValue);

                ScoreNumberPositionY=ScoreTextPositionY=ScoreValuePositionY += 60;
        }
    })
    gameOverScene.visible = true;
}

// Brengt je terug naar de main menu als je op de knop bij het game over scherm klikt
function MainMenuEnable(){
        gameOverScene.visible = false;
        mainMenuScene.visible = true;
    for (let i = gameOverScene.children.length - 1; i >2; i--) {	gameOverScene.removeChild(gameOverScene.children[i]);}
}

// Checkt voor collission tussen de kop van de slang en een appel
// Indien er een collission is wordt een niew lichaamsdeel toegevoegd aan de snake
function spritesIntersect(a:PIXI.Sprite, b:PIXI.Sprite) {
    if(a.x==b.x&&a.y==b.y)
    {
        Score++;
        ScoreText.text = (String(Score));
        FoodEaten = true;
        //creëert een nieuwe sprite
        let newSnakePart: PIXI.Sprite = PIXI.Sprite.from(SnakeBody);
//Pakt de laatste body piece in de array
        let snakeend = snakeBodyArray[snakeBodyArray.length-1]
// Setup van het nieuwe lichaamsdeel van de snake
        newSnakePart.anchor.set(0.5,0.5);
        newSnakePart.x= snakeend.x;
        newSnakePart.y=snakeend.y;
        newSnakePart.width=snakeend.width;
        newSnakePart.height=snakeend.height;

// Voegt het lichaamsdeel toe aan de gamescene en vervolgens ook aan de snake body array.
        gameScene.addChild(newSnakePart);
        snakeBodyArray.push(newSnakePart);
        // Zet de appel op een nieuwe random locatie neer
        randomApple();
    }
}

// In deze methode wordt gekeken of de slang zichzelf niet raakt bij de volgende stap voordat de nieuwe positie wordt aangegeven.
// Wanneer dit wel het geval is wordt de game gestopt.
function PositionCheck(position: Position,boardPos: Position){
    let bodyhit = false;
    snakeBodyArray.forEach(function (bodypart) {
        if (bodypart.x == position.pixelValueX && bodypart.y == position.pixelValueY) {
            gameOver(boardPos);
            bodyhit = true;
        }
    });
    if (!bodyhit) {
        if(snakeTail.x==position.pixelValueX&&snakeTail.y==position.pixelValueY) {
            gameOver(boardPos);
        }
        else {
            spliceList(position);
            applyValues(snakeHead, position, boardPos);
            moveTail();
        }
    }
}
// Deze functie is verantwoordelijk voor het random plaatsen van appels.
function randomApple(){
        // Hier wordt de huidige lengt van de positionList gepakt
    let listsize = positionList.length;
        // Randomised een index uit de grootte van de lijst en plaatst daar de appel.
    if(listsize>1) {
        let randomisedValue: number = Math.floor(Math.random() * Math.floor(listsize));
        let index = 0;
        positionList.forEach(function (positions) {
            if (index == randomisedValue-1) {
                appleSprite.anchor.set(0.5, 0.5);
                appleSprite.x = positions.pixelValueX;
                appleSprite.y = positions.pixelValueY;
                appleSprite.width = 32;
                appleSprite.height = 32;
                gameScene.addChild(appleSprite);
            }
            index++;
        })
    }
    // Hier zet ik de appel op de laatste overgebleven positie neer.
    // De randomiser is hier niet meer nodig.
    else if(listsize ==1)
    {
        positionList.forEach(function (position){
            appleSprite.anchor.set(0.5, 0.5);
            appleSprite.x = position.pixelValueX;
            appleSprite.y = position.pixelValueY;
            appleSprite.width = 32;
            appleSprite.height = 32;
            gameScene.addChild(appleSprite);
        })
    }
}

// Verwijderd de nieuwe positie van het hoofd van de slang uit de lijst.
// Dit zodat de appel nooit op de slang geplaatst kan worden.
function spliceList(position: Position)
{
    positionList.forEach((element,index)=>{
        if(element==position) positionList.splice(index,1);
    });
}

//Deze functie zet de startwaardes van de game. Hier geef ik de nieuw aangemaakte gamescene en boardposition mee.
//De waarde van de wordt gereset naar 0.
//De gamescene wordt vervolgens geleegd en daarna met een nieuwe snake en score text gevuld.
function resetSnake()
{ Score=0;
    for (let i = gameScene.children.length - 1; i >= 0; i--) {	gameScene.removeChild(gameScene.children[i]);}
    direction = StartDirection;
    Board.forEach(function(getPosition: Position){
        if(getPosition.xPos==16&&getPosition.yPos==15) {
            spliceList(getPosition);
            snakeHead.anchor.set(0.5, 0.5);
            snakeHead.x = getPosition.pixelValueX;
            snakeHead.y = getPosition.pixelValueY;
            snakeHead.width = 32;
            snakeHead.height = 32;
        }

        if(getPosition.xPos==17&&getPosition.yPos==15) {
            spliceList(getPosition);
            snakeBody.anchor.set(0.5, 0.5);
            snakeBody.x = getPosition.pixelValueX;
            snakeBody.y = getPosition.pixelValueY;
            snakeBody.width = 32;
            snakeBody.height = 32;
            snakeBodyArray.push(snakeBody);
        }

        if(getPosition.xPos==18&&getPosition.yPos==15) {
            spliceList(getPosition);
            snakeTail.anchor.set(0.5, 0.5);
            snakeTail.x = getPosition.pixelValueX;
            snakeTail.y = getPosition.pixelValueY;
            snakeTail.width = 32;
            snakeTail.height = 32;
        }
    })
    gameScene.addChild(snakeHead);
    snakeHead.rotation=left;
    gameScene.addChild(snakeBody);
    gameScene.addChild(snakeTail);
    ScoreText = new PIXI.Text(String(Score))
    ScoreText.x= 16;
    ScoreText.y =16;
    ScoreText.style = new PIXI.TextStyle({
        fill: 0x000000,
        fontSize: 30,
        fontFamily: "Arial",
        fontStyle: "Bold"
    });
    gameScene.addChild(ScoreText);
}

//region Snake movement

//beweegt de snake in een bepaalde richting.
function moveSnake(){
    switch (direction)
    {
        case "Left":
            moveSnakeHead("x",0,-1)
            break;
        case "Right":
            moveSnakeHead("x",26,1)
            break;
        case "Up":
            moveSnakeHead("y",0,-1)
            break;
        case "Down":
            moveSnakeHead("y",26,1)
            break;
    }
}


//Met deze functie wordt het hoofd van de slang bewogen. Dit gebeurt in de richting aangegeven
function moveSnakeHead(axis: string, maxValue: number,directionValue: number)
//De ts-ignore is om errors weg te halen. De error die deze weghaald is dat de waardes mogelijk undefined zijn.
// Ik heb dit getest in de vorm van playtesting en dit is nooit het geval
// @ts-ignore
{   let boardPos: Position = Board.find(i=>i.pixelValueX==snakeHead.x&&i.pixelValueY==snakeHead.y);
    switch (axis)
    {
        case "x":
            if(boardPos!=undefined&&boardPos.xPos!=maxValue)
            {// @ts-ignore
                let position: Position = Board.find(i=>i.xPos==boardPos.xPos+directionValue&&i.yPos==boardPos.yPos);
                PositionCheck(position,boardPos);
            }
            else
            {
                gameOver(boardPos);
            }
            break;
        case "y":
            if(boardPos!=null&&boardPos.yPos!=maxValue) {
                // @ts-ignore
                let position: Position = Board.find(i => i.xPos == boardPos.xPos && i.yPos == boardPos.yPos + directionValue);
                PositionCheck(position,boardPos);
            }
            else {
                gameOver(boardPos);
            }
            break;
    }
}

// Met deze functie wordt de rest van het lichaam een positie bewogen.
// De beweging kijkt naar de laatste positie van het voorgaande lichaamsdeel.
function moveTail()
{   // @ts-ignore
    let previousPosition: Position;
    let position: Position;
    snakeBodyArray.forEach(function(bodypart){
        // @ts-ignore
        previousPosition=  Board.find(i=>i.pixelValueX==bodypart.x&&i.pixelValueY==bodypart.y);
        // @ts-ignore
        position=Board.find(i=>i.xPos==previousX&&i.yPos==previousY);
        applyValues(bodypart,position,previousPosition);
    })
    // @ts-ignore
    previousPosition=  Board.find(i=>i.pixelValueX==snakeTail.x&&i.pixelValueY==snakeTail.y);
    // @ts-ignore
    position=Board.find(i=>i.xPos==previousX&&i.yPos==previousY);

    //Deze if statement stopt de staart voor 1 tick als een appel is opgegeten. Dit om de lengte van de slang te vergroten.
    if(!FoodEaten) {
        if (position.xPos > previousPosition.xPos) {
            snakeTail.rotation = right
        } else if (position.xPos < previousPosition.xPos) {
            snakeTail.rotation = left;
        } else if (position.yPos < previousPosition.yPos) {
            snakeTail.rotation = up;
        } else if (position.yPos > previousPosition.yPos) {
            snakeTail.rotation = down;
        }
        applyValues(snakeTail, position, previousPosition);
    }
    else
    {
        FoodEaten=false;
    }
}

// Deze methode is om duplicate code te verminderen.
// De logica van deze code geeft het bodypart van de snake zijn nieuwe positie en veranderd de previous
// naar de waarde van de positie die het lichaamsdeel voor de verandering had.
function applyValues(partToMove: any,position: Position,boardPosition: Position)
{
    partToMove.x = position.pixelValueX;
    partToMove.y =position.pixelValueY;
    previousX = boardPosition.xPos;
    previousY = boardPosition.yPos;
}
//endregion
