// Deze klasse creëert de grid met posities voor de game.
export default  class GenerateBoard {
    private positions: Position[] = [];

    generateField = () => {
        let xPixels = 0;
        let yPixels = 0;
        for(let yPos = 0; yPos<27; yPos++){
             for(let xPos = 0; xPos<27; xPos++) {
                 if(xPos==0&&yPos==0)
                 {   xPixels =32;
                     yPixels=32;
                     this.positions.push(new Position(xPos, yPos,xPixels,yPixels));
                 }
                 else if(xPos==0&&yPos>0)
                 {  yPixels +=32;
                    xPixels = 32;
                     this.positions.push(new Position(xPos, yPos,xPixels,yPixels));
                 }
                 else
                 {
                     xPixels += 32;
                     this.positions.push(new Position(xPos, yPos,xPixels,yPixels));
                 }
             }
    }
        return this.positions;
    };

}
// Data klasse voor de posities in het veld
export class Position {
    xPos = 0;
    yPos = 0;
    pixelValueX =0;
    pixelValueY =0;

    constructor(xPos: number, yPos: number,pixelValueX: number,pixelValueY: number) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.pixelValueX = pixelValueX;
        this.pixelValueY=pixelValueY;
    }
}