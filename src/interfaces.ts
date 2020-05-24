interface IgameData {
    generic:{
        aCanvasPixelDimensions:Array<number>;
        aGridTileDimensions:Array<number>;
        nGridSpawnAreaHeight:number;
        aGridCellPixelDimensions:Array<number>;
        nDefaultDropList:number;
        nGridLineColour:number;
        nGridCellColour:number;
        nDropSpeed:number;
    },
    aDropLists:Array<Array<IshapeDropListData>>;
    aShapeLibrary:Array<IshapeLibraryData>;
}

interface IshapeDropListData{
    nShape:number,
    nRotation:number,
    nColumn:number,
}

interface IshapeLibraryData{
    nColour:number;
    aRotations:Array<Array<Array<number>>>,
    nID:number
}

interface IViewCell{
    nShapeID:number|string;
    nTileX:number;
    nTileY:number;
    nDestTileX:number;
    nDestTileY:number;
    oContainer:PIXI.Container;
}

interface IfallData{
    nTileX:number;
    nTileY:number;
    nFallDist:number;
}


export {
    IgameData,
    IshapeDropListData,
    IshapeLibraryData,
    IViewCell,
    IfallData
}