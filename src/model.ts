import { IgameData, IshapeDropListData, IshapeLibraryData, IfallData } from './interfaces';

export class Model{

    private oData:IgameData;
    private aDataGrid:Array<Array<number|string>>;

    private nDropListToUse:number;

    private aCurrentDropList:Array<IshapeDropListData>;
    private aShapeLibrary:Array<IshapeLibraryData>;

    private oCurrentShapeDropListData:IshapeDropListData;
    private oCurrentShapeLibData:IshapeLibraryData;

    private bFallingShapeStuckInSpawnArea:Boolean = false;

    public constructor(oData:IgameData){
        console.log('New Model');
        this.oData = oData;
        this.createNewDataGrid();
        this.nDropListToUse = this.oData.generic.nDefaultDropList;
        console.log(this.nDropListToUse);
        console.log(this.oData.aDropLists);
        this.aCurrentDropList = this.oData.aDropLists[this.nDropListToUse];
        console.log(this.aCurrentDropList);
        this.aShapeLibrary = this.oData.aShapeLibrary;
        console.log('this.aShapeLibrary');
        console.log(this.aShapeLibrary);
    }

    public setDropList(nListIndex:number){
        console.log('setDropList:  ' + nListIndex);
        //console.log(this.oData.aDropLists);
        this.aCurrentDropList =[];

        if(nListIndex > -1){
            this.aCurrentDropList = JSON.parse(JSON.stringify(this.oData.aDropLists[nListIndex]));
        }else{
            console.log('creating random drop list');
            for(let i:number=0;i<200;i++){
                let oShape:IshapeDropListData = {
                    nColumn:0,
                    nShape:parseInt((Math.random()*5).toString()),
                    nRotation:parseInt((Math.random()*4).toString()),
                }

                let oShapeLibData:IshapeLibraryData = this.aShapeLibrary[oShape.nShape];
                //normalise our rotation
                oShape.nRotation = oShape.nRotation%(oShapeLibData.aRotations.length);                
               
                //set our random column
                let nShapeTileWidth:number = oShapeLibData.aRotations[oShape.nRotation][0].length;
                oShape.nColumn = parseInt((Math.random()*(this.oData.generic.aGridTileDimensions[0]-nShapeTileWidth+1)).toString()),

                this.aCurrentDropList.push(oShape);
            }
        }
        
        //console.log(this.aCurrentDropList);
    }

    public createNewDataGrid(){
        this.aDataGrid = [];
        for(let i:number=0;i<this.oData.generic.aGridTileDimensions[1] + this.oData.generic.nGridSpawnAreaHeight;i++){
            let aRow:Array<number|string> = [];
            for(let j:number=0;j<this.oData.generic.aGridTileDimensions[0];j++){
                aRow.push('X');
            }
            this.aDataGrid.push(aRow);
        }
        //console.log(this.aDataGrid);


        this.devDataGrid();


        //this.drawGridToConsole();
    }

    public getDataGrid():Array<Array<number|string>>{
        let aDataGridCopy:Array<Array<number|string>> = JSON.parse(JSON.stringify(this.aDataGrid));
        for(let i:number=0;i<aDataGridCopy.length;i++){
            let aCurrentRow:Array<number|string> = aDataGridCopy[i];
            for(let j:number=0;j<aCurrentRow.length;j++){
                if(aCurrentRow[j]=='@'){
                    aCurrentRow[j] = this.oCurrentShapeLibData.nID;
                }
            }
        }
        return aDataGridCopy;
    }
    public getCurrentShapeLibData():IshapeLibraryData{
        return this.oCurrentShapeLibData;
    }

    public checkGameOver(aFallData:Array<IfallData>):Boolean{
        console.log('checkGameOver');
        //this.drawGridToConsole();
        /*
        let bGameOver = false;
        this.drawGridToConsole();
        //console.log(aFallData);
        if(aFallData[0].nFallDist<2){
            bGameOver = true;
        }*/

        /*
        let bGameOver = false;

        for(let i:number=0;i<this.aDataGrid.length;i++){
            let aCurrentRow:Array<any> = this.aDataGrid[i];
            for(let j:number=0;j<aCurrentRow.length;j++){
                if(i < 3 && aCurrentRow[j] !="X" ){
                    bGameOver = true;
                }
            }
        }
        return bGameOver;*/

        return this.bFallingShapeStuckInSpawnArea;
    }

    public addNextShape(){
        //console.log('model : addNextShape');

        //console.log(this.aCurrentDropList);
        this.bFallingShapeStuckInSpawnArea = false;

        if(this.aCurrentDropList.length > 0){
            let oShapeDropListData:IshapeDropListData = this.aCurrentDropList[0];
     
            
            let oShapeLibData:IshapeLibraryData = this.aShapeLibrary[oShapeDropListData.nShape];
            //console.log('shape being dropped:');
            //console.log(oShapeLibData);
            //console.log('shape rotaton');
            //console.log(oShapeDropListData.nRotation );
            oShapeDropListData.nRotation = oShapeDropListData.nRotation%(oShapeLibData.aRotations.length);
            //console.log('%' + oShapeDropListData.nRotation );

            let aChosenRotation:Array<Array<number>> = oShapeLibData.aRotations[oShapeDropListData.nRotation];

            //console.log(aChosenRotation);

            this.oCurrentShapeDropListData = oShapeDropListData;
            this.oCurrentShapeLibData = oShapeLibData;
            this.oCurrentShapeLibData.nID = oShapeDropListData.nShape;

            //initially create shape in the spawn area of our gridData
            //firstly ensure that the start column will actually allow our shape to be positioned on the grid

            let nShapeTileWidth:number = oShapeLibData.aRotations[oShapeDropListData.nRotation][0].length;
            let nShapeTileHeight:number = oShapeLibData.aRotations[oShapeDropListData.nRotation].length;
            
            //console.log('shapeTileWidth: ' + nShapeTileWidth);
            //console.log('nShapeTileHeight: ' + nShapeTileHeight);
            //console.log('oShapeDropListData.nColumn: ' + oShapeDropListData.nColumn);

            //if our symbol has been positioned too far to the right, nudge it back into place (align it to the right of the grid)

            //console.log( this.oData.generic.aGridTileDimensions[0]);
            //console.log( (oShapeDropListData.nColumn + nShapeTileWidth));
            if((oShapeDropListData.nColumn + nShapeTileWidth) > this.oData.generic.aGridTileDimensions[0]){
                oShapeDropListData.nColumn = this.oData.generic.aGridTileDimensions[0] - nShapeTileWidth;
                //console.log('oShapeDropListData.nColumn adjusted: ' + oShapeDropListData.nColumn);
            }

            //Add our initial shape data to the start grid
            for(let i:number=0;i<aChosenRotation.length;i++){
                let aRow = aChosenRotation[i];
                for(let j:number=0;j<aRow.length;j++){
                    let nTile:number = aRow[j];
                    //console.log(nTile);
                    if(nTile == 1){
                        this.aDataGrid[i][j+oShapeDropListData.nColumn] = '@';
                    }
                }
            }
            
            //this.drawGridToConsole();
            this.aCurrentDropList.shift();
            return true
        }else{
            //console.log('OUT OF SHAPES');
            return false
        }

    }


    private devDataGrid(){
        //this.aDataGrid[8][1] = 2;
    }

    public getNewFallingShapeData():Array<IfallData>{//#endregion
        
        //console.log('getFallingShapeData');

        //for falling blocks we generate a list of how far each block needs to fall so view can then determine they're new X,Y Positions

        let aFallData:Array<IfallData>=[];

        let nTotalYTiles = this.oData.generic.aGridTileDimensions[1] + this.oData.generic.nGridSpawnAreaHeight;

        let nCurrentShapeHeight:number = this.oCurrentShapeLibData.aRotations[this.oCurrentShapeDropListData.nRotation].length;
        let nMaxFallingDist = nTotalYTiles - nCurrentShapeHeight;
        
        for(let i:number=0;i<this.aDataGrid.length;i++){
            let aCurrentRow:Array<any> = this.aDataGrid[i];
            for(let j:number=0;j<aCurrentRow.length;j++){
                if(aCurrentRow[j] == '@'){
                    //console.log('found new falling cell at : ' + j + " " + i);
                    aCurrentRow[j] = 'X';//reset our data here while we're parsing
                    let oFallingTileData:IfallData ={
                        nFallDist:0,
                        nTileX:j,
                        nTileY:i
                    }
                    aFallData.push(oFallingTileData);
                    //found a falling object at 
                    //so how far can this guy fall before hitting another shape / the floor?
                    for(let k:number=0;k<nTotalYTiles;k++){
                        //checking cell
                        let nCellXToCheck:number = j;
                        let nCellYToCheck:number = i + k;
                        if(nCellYToCheck<nTotalYTiles){
                            // console.log('checking ' + nCellXToCheck + " " + nCellYToCheck);
                            //console.log(this.aDataGrid[nCellYToCheck][nCellXToCheck]);
                            if((this.aDataGrid[nCellYToCheck][nCellXToCheck]!='@') && (this.aDataGrid[nCellYToCheck][nCellXToCheck]!='X') ){
                                //console.log('Found non X at : ' + nCellXToCheck + " " + nCellYToCheck);
                                //console.log(this.aDataGrid[nCellYToCheck][nCellXToCheck]);
                                if(k-1<nMaxFallingDist){
                                    nMaxFallingDist = k-1;
                                }
                            }
                        }
                    }
                }
            }
        }

        //console.log('nMaxFallingDist');
        //console.log(nMaxFallingDist);

        let nCellsStillInSpawnArea = 0;

        for(let i:number=0;i<aFallData.length;i++){
            let oCurrentFallData:IfallData = aFallData[i];
            oCurrentFallData.nFallDist = nMaxFallingDist;

            //reset our grid data here while we're parsing
            this.aDataGrid[oCurrentFallData.nTileY+oCurrentFallData.nFallDist][oCurrentFallData.nTileX] = this.oCurrentShapeLibData.nID;
            if(oCurrentFallData.nTileY+oCurrentFallData.nFallDist < 4){
                //alert('g o');
                nCellsStillInSpawnArea++;
            }
        }

        if(nCellsStillInSpawnArea == aFallData.length){
            this.bFallingShapeStuckInSpawnArea = true;
        }

        //console.log('fall data');
        //console.log(aFallData);

        //this.drawGridToConsole();
        return aFallData;
    }


    public checkGridForWins():Array<number>{
        //console.log('checkGridForWins..');
        //this.drawGridToConsole();

        //iterate through our data grid, if we find any completed rows, generte new fallData for the view, and update this data grid accordingly

        let aCompleteRows:Array<number> = [];

        for(let i:number=0;i<this.aDataGrid.length;i++){
            let aCurrentRow:Array<any> = this.aDataGrid[i];
            let nFullRowCount = 0;
            for(let j:number=0;j<aCurrentRow.length;j++){
                if(aCurrentRow[j]!='X'){
                    nFullRowCount++;
                }
            }
            if(nFullRowCount == aCurrentRow.length){
                console.log('Full Row at: ' + i);
                aCompleteRows.push(i);
            }
        }

        return aCompleteRows;
    }

    public getFallDataAfterRowsRemoved():Array<IfallData>{
        //console.log('getFallDataAfterRowsRemoved');
        let aFallData:Array<IfallData>=[];
        let aCompleteRows = this.checkGridForWins();

        //work from bottom up, in the event we hit a completed row we increment a drop count and apply that to any cells we hit with a block in thereafter

        //console.log(aCompleteRows);

        aCompleteRows.reverse();
        //console.log(aCompleteRows);

        let bIncDropCount:Boolean = false;
        let nDropCount:number = 0;

        for(let i=this.aDataGrid.length-1;i>0;i--){
            bIncDropCount = false;
            if(i == aCompleteRows[0]){
                //we've hit a row that we need to remove
                //console.log('removing data for row: ' + i);
                aCompleteRows.shift();
                bIncDropCount = true;
            }

            if(bIncDropCount){
                //console.log('Row ' + i + ' is being removed');
                nDropCount++; 
            }else{
                //console.log('Row ' + i + ' is not being removed, but its contents need to drop ' + nDropCount);
                let aCurrentRow:Array<any> = this.aDataGrid[i];
                for(let j:number=0;j<aCurrentRow.length;j++){
                    if(aCurrentRow[j]!='X'){
                        //console.log('found a block that needs to come down at x:' + j + ' y:' + i + ' by ' + nDropCount);
                        let oFallingTileData:IfallData ={
                            nFallDist:nDropCount,
                            nTileX:j,
                            nTileY:i
                        }
                        aFallData.push(oFallingTileData);
                    }
                }
            }
        }

        //regenerate our grid data minus the removed rows
        aCompleteRows = this.checkGridForWins();
        let nTotalRowsRemoved = aCompleteRows.length;
        let aNewGridData = [];
        let aDataGridCopy:Array<Array<number|string>> = JSON.parse(JSON.stringify(this.aDataGrid));

        for(let i:number=0;i<this.aDataGrid.length;i++){
            if(i != aCompleteRows[0]){
                aNewGridData.push(aDataGridCopy[i]);
            }else{
                aCompleteRows.shift();
            }
        }

        for(let i:number=0;i<nTotalRowsRemoved;i++){
            let aEmptyRow = [];
            for(let j:number=0;j<this.oData.generic.aGridTileDimensions[0];j++){
                aEmptyRow.push('X');
            }
            aNewGridData.unshift(aEmptyRow);
        }
        
        //console.log('new grid data');

        this.aDataGrid = aNewGridData;

        //console.log(this.aDataGrid);

        //console.log(aFallData);
        return aFallData;
    }






    private drawGridToConsole(){
        //console.log('Grid:');
        for(let i:number=0;i<this.aDataGrid.length;i++){
            let aCurrentRow:Array<any> = this.aDataGrid[i];
            var sBuild:string = ' ';
            for(let j:number=0;j<aCurrentRow.length;j++){
                sBuild+=aCurrentRow[j];
            }
            sBuild += '  ' + i;
            console.log(sBuild);
        }
    }



}
