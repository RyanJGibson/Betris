import { IgameData,IViewCell, IfallData } from './interfaces';


declare var TweenMax: any;

declare global {
    interface Window { Power0: any; Power1:any; Bounce:any;}
}



export class Cell implements IViewCell{
    public nShapeID:number;
    public nTileX:number;
    public nTileY:number;
    public nDestTileX:number;
    public nDestTileY:number;
    public oContainer:PIXI.Container;
}

export class View{

    private cMainContainer:PIXI.Container;
    private oData:IgameData;

    private cGridContainer:PIXI.Container;
    private cCellContainer:PIXI.Container;

    private aDataGrid:Array<Array<number|string>>;
    private aViewGrid:Array<Array<IViewCell|null>>;
    //private oCurrentShapeLibData:IshapeLibraryData;

    private tScoreField:PIXI.Text;


    public constructor(cMainContainer:PIXI.Container, oData:IgameData){
        console.log('New View');
        this.cMainContainer = cMainContainer;
        this.oData = oData;
        this.createGrid();
        this.createScoreField();
    }

    //clears the grid and rerenders all our tiles based on whatever data is passed
    public renderCells(aDataGrid:Array<Array<number|string>>){
        //let oCurrentShapeLibData:IshapeLibraryData
        //console.log('View: renderCells');
        //console.log(aDataGrid);

        this.aViewGrid =[];
        this.cCellContainer.removeChildren();

        for(let i:number=0;i<aDataGrid.length;i++){
            let aCurrentDataRow:Array<number|string> = aDataGrid[i];
            let aViewRow:Array<IViewCell|null> = [];
            for(let j:number=0;j<aCurrentDataRow.length;j++){
                if(aCurrentDataRow[j]!='X'){
                    //console.log(aCurrentDataRow[j]);
                    aViewRow.push(this.createNewCell(aCurrentDataRow[j],j,i)); 
                }else{
                    aViewRow.push(null); 
                }
            }
            this.aViewGrid.push(aViewRow);
        }

        //console.log(this.cCellContainer);
        //console.log(this.aViewGrid);
    }

    public killAllTweens(){
        TweenMax.killAll();
    }


    private createNewCell(nShapeID:number|string,nX:number,nY:number):IViewCell{

        //console.log('createNewCell');
        let oContainer = new PIXI.Container();
        let graTest = new PIXI.Graphics();
        graTest.lineStyle(2,0x000000);
        graTest.beginFill(this.oData.aShapeLibrary[Number(nShapeID)].nColour);
        graTest.drawRect(0,0,this.oData.generic.aGridCellPixelDimensions[0],this.oData.generic.aGridCellPixelDimensions[1]);
        oContainer.addChild(graTest);
        
        let oCell:IViewCell = new Cell();

        oCell.nShapeID = nShapeID;
        oCell.nTileX = nX;
        oCell.nTileY = nY;
        oCell.nDestTileX = -1;
        oCell.nDestTileY = -1;
        oCell.oContainer = oContainer;

        this.cCellContainer.addChild(oCell.oContainer);
        oCell.oContainer.x = oCell.nTileX * this.oData.generic.aGridCellPixelDimensions[0];
        oCell.oContainer.y = oCell.nTileY * this.oData.generic.aGridCellPixelDimensions[1];

        return oCell;
    }


    public animateFallingBlocks(aFallData:Array<IfallData>, onNewDropCompleteCallback:Function){
        console.log('animateFallingBlocks');
        //console.log(aFallData);

        let nComplete = 0;
        
        for(let i=0;i<aFallData.length;i++){
            let oCurrentFallData = aFallData[i];
            //console.log(oCurrentFallData);
            //console.log(this.aViewGrid[oCurrentFallData.nTileY][oCurrentFallData.nTileX]);
            
            let oCell:IViewCell = this.aViewGrid[oCurrentFallData.nTileY][oCurrentFallData.nTileX] as IViewCell;
            //oCell.oContainer.alpha = 0.5;

            oCell.nDestTileY = oCell.nTileY + oCurrentFallData.nFallDist;

            let oTween = TweenMax.to(oCell.oContainer, oCurrentFallData.nFallDist/this.oData.generic.nDropSpeed, 
                {
                //ease: eval("Elastic.easeOut.config(1.5, 0.5)"),
                ease:window.Power1.easeIn,
                //ease: 
                y:oCell.nDestTileY * this.oData.generic.aGridCellPixelDimensions[1],
                onComplete:function(){
                    nComplete++;
                    if(nComplete == aFallData.length){
                        onNewDropCompleteCallback();
                    }
                }.bind(this)
            });
        }
    }

    public animateRemoveWinningBlocks(aRowsToRemove:Array<number>, onWinnersRemovedCompleteCallback:Function){

        console.log('animateRemoveWinningBlocks');
        //console.log( this.aViewGrid);

        let nComplete = 0;
        let nTotalAnims = aRowsToRemove.length * this.oData.generic.aGridTileDimensions[0];

        let nAnimCount:number = 0;

        for(let i:number=0;i<aRowsToRemove.length;i++){
            for(let j:number =0;j<this.oData.generic.aGridTileDimensions[0];j++){
                //console.log('removing: y:' + aRowsToRemove[i] + " x:" + j);
                let oCell:IViewCell = this.aViewGrid[aRowsToRemove[i]][j] as IViewCell;
      


                let oTween = TweenMax.to(oCell.oContainer, 0.25, 
                    {
                    //ease: eval("Elastic.easeOut.config(1.5, 0.5)"),
                    alpha:0,

                    delay:(nAnimCount/30)+0.1,
                    onComplete:function(){
                        nComplete++;
                        //console.log(nComplete);
                        if(nComplete == nTotalAnims){
                            onWinnersRemovedCompleteCallback();
                        }
                    }.bind(this)
                })

                nAnimCount++;

                //onWinnersRemovedCompleteCallback
            }
        }
    }



    private createGrid(){
        console.log('createGrid');
        console.log(this.oData);

        this.cGridContainer = new PIXI.Container();
        this.cMainContainer.addChild(this.cGridContainer);
        
        for(let i:number=0;i<this.oData.generic.aGridTileDimensions[0];i++){
            for(let j:number=0;j<this.oData.generic.aGridTileDimensions[1] + this.oData.generic.nGridSpawnAreaHeight; j++){
                const gGridRect = new PIXI.Graphics();
                gGridRect.lineStyle(2,this.oData.generic.nGridLineColour);
                gGridRect.beginFill(this.oData.generic.nGridCellColour);
                gGridRect.drawRect(0,0,this.oData.generic.aGridCellPixelDimensions[0],this.oData.generic.aGridCellPixelDimensions[1]);
                gGridRect.x = this.oData.generic.aGridCellPixelDimensions[0] * i;
                gGridRect.y = this.oData.generic.aGridCellPixelDimensions[1] * j;
                this.cGridContainer.addChild(gGridRect);
      
                if(j<this.oData.generic.nGridSpawnAreaHeight){
                    gGridRect.alpha = 0.5;
                }
            }
        }

        let nGridWidthPixels:number = this.oData.generic.aGridTileDimensions[0] * this.oData.generic.aGridCellPixelDimensions[0];
        let nGridHeightPixels:number = (this.oData.generic.aGridTileDimensions[1]+ this.oData.generic.nGridSpawnAreaHeight) * this.oData.generic.aGridCellPixelDimensions[1];

        this.cGridContainer.x = (this.oData.generic.aCanvasPixelDimensions[0] - nGridWidthPixels)/2;
        this.cGridContainer.position.y = (this.oData.generic.aCanvasPixelDimensions[1] - nGridHeightPixels)/2;

        this.cCellContainer = new PIXI.Container();
        this.cCellContainer.x = this.cGridContainer.x;
        this.cCellContainer.y = this.cGridContainer.y;
        this.cMainContainer.addChild(this.cCellContainer);
    }

    private createScoreField(){
        this.tScoreField = new PIXI.Text('Score: 0',{fontFamily : 'Arial', fontSize: 14, fill : 0xffffff, align : 'center'});
        this.cMainContainer.addChild(this.tScoreField);
        this.tScoreField.position.x = 10;
        this.tScoreField.position.y = this.oData.generic.aCanvasPixelDimensions[1] - 30;
    }

    public setScore(nScore:number){
        this.tScoreField.text = 'Score: ' + nScore;
    }



}

