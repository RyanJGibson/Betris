
//Initial typescript/PIXI/webpack project setup lifted from: 
//https://goodgecko.co.uk/pixi-typescript-webpack.html



//This index file serves as our main game entry point / manager:
//For purposes of the Betris Demo, this class instantiates PIXI, loads in our config JSON and acts as a controller between our model (handling data) and view (handling rendering)
//We keep a finite state engine running to take care of the current game state



import * as PIXI from 'pixi.js';


import {IgameData, IfallData, IshapeLibraryData} from './interfaces';
import { ResizeHelper } from './utils/resizeHelper';
import {View} from './view';
import {Model} from './model';

type eStateEnums = '';

export class GameManager{

    

    //nb: set "strictPropertyInitialization" to false in ts config,

    private oContainerDiv:HTMLDivElement;
    private oDevUIDiv:HTMLDivElement;
    private oData:IgameData;
    private oResizeHelper:ResizeHelper;

    private oApp:PIXI.Application;
    private cMainContainer:PIXI.Container;// = new PIXI.Container();
    private oModel:Model;
    private oView:View;

    private nScore:number = 0;

    private eStateEnums = {
        sWait: "WAIT" as eStateEnums,
        sInitDrop: "INIT_DROP" as eStateEnums //check gameover state, add new shape and init drop anim
    };
    private sState:eStateEnums;


    //kick things off
    public constructor(){
        
        //expose to window so we can use our dev html UI
        window.Game = this;

        this.oDevUIDiv = document.getElementById('devUI') as HTMLDivElement;
        
        this.oApp = new PIXI.Application({ width: 400, height: 400, backgroundColor: 0x000000, view:<HTMLCanvasElement> document.getElementById("myCanvas") });	
        this.initLoadJSON();
    }


    //All public methods fired from our Dev UI:
    public Init(nOption:number){
        console.log('Init');
        console.log(nOption);

        this.sState = this.eStateEnums.sWait;
        this.oView.killAllTweens();

        this.oModel.createNewDataGrid();
        let aDataGrid:Array<Array<number|string>> = this.oModel.getDataGrid();
        this.oView.renderCells(aDataGrid);

        this.oModel.setDropList(nOption);
        this.sState = this.eStateEnums.sInitDrop;

        this.nScore = 0;
        this.oView.setScore(this.nScore);

        this.oDevUIDiv.style.display = 'none';
    }





    //Get our game data (normally we'd expect to run preloaders etc first, but we're using graphics API to draw everything in this demo)
    private initLoadJSON(){
		console.log('initLoadJSON');
        fetch('json/config.json')
			.then(oResponse => oResponse.json())
			.then(oData => this.onDataLoaded(oData));
    }
    
    //Once we have our data we can go ahead and instantiate the various parts of the demo
    private onDataLoaded(oData:IgameData){
        console.log('onDataloaded');
        console.log(oData);
        this.oData = oData;

        this.oContainerDiv = document.createElement('div');
        document.body.appendChild(this.oContainerDiv);
        this.oContainerDiv.setAttribute('id','stage');
        this.oContainerDiv.appendChild(this.oApp.view);
        this.oApp.view.width = this.oData.generic.aCanvasPixelDimensions[0];
        this.oApp.view.height = this.oData.generic.aCanvasPixelDimensions[1];
        
        this.cMainContainer = new PIXI.Container();
        this.oApp.stage.addChild(this.cMainContainer);
        this.oModel=new Model(this.oData);
        this.oView=new View(this.cMainContainer, this.oData);
        
        this.sState = this.eStateEnums.sWait;

        this.oApp.ticker.add(this.loop.bind(this));
        this.oResizeHelper = new ResizeHelper(this.oData, this.oContainerDiv);

        //auto kick things off - eventually want a button or something:
        //this.sState = this.eStateEnums.sInitDrop;

        //let oInfoDiv = document.createElement('div');

  
    }




    //Our main game loop - a 'finite state engine' responsible for coordinating the various operations
    private loop(){
        //console.log('loop');
        //console.log(this.sState);

        switch (this.sState){
            case this.eStateEnums.sWait:
            break;
            case this.eStateEnums.sInitDrop:
                this.initDrop();
            break;
        }
    }


    private initDrop(){
        console.log('initDrop');
        this.sState = this.eStateEnums.sWait;

        let bHaveShapes:Boolean = this.oModel.addNextShape();
        if(bHaveShapes){
            let aDataGrid:Array<Array<number|string>> = this.oModel.getDataGrid();
            this.oView.renderCells(aDataGrid);
            let aFallData:Array<IfallData> = this.oModel.getNewFallingShapeData();
            //check our fall data and ensure that the blocks can actually move down
            let bIsGameOver:Boolean  = this.oModel.checkGameOver(aFallData);
            if(bIsGameOver){
                console.log('game over');
                this.oDevUIDiv.style.display = 'block';
            }else{
                this.oView.animateFallingBlocks(aFallData, this.onNewDropComplete.bind(this));
            }
        }else{
            console.log('out of shapes');
            this.oDevUIDiv.style.display = 'block';
        }

    }

    private onNewDropComplete(){
        //check our grid to see if we have any wins
        let aDataGrid:Array<Array<number|string>> = this.oModel.getDataGrid();
        this.oView.renderCells(aDataGrid);

        let aWins:Array<number> = this.oModel.checkGridForWins();
        if(aWins.length > 0){
            console.log('We have a winner');
            this.nScore += aWins.length*10;
            this.oView.setScore(this.nScore);
            this.oView.animateRemoveWinningBlocks(aWins, this.onWinningBlocksRemoved.bind(this));
        }else{
            this.sState = this.eStateEnums.sInitDrop;
        }
        //this.sState = this.eStateEnums.sInitDrop;
    }

    private onWinningBlocksRemoved(){
        console.log('onWinningBlocksRemoved');
        let aFallData:Array<IfallData> = this.oModel.getFallDataAfterRowsRemoved();
        if(aFallData.length > 0){
            console.log('animate the cascade');
            this.oView.animateFallingBlocks(aFallData, this.onCascadeComplete.bind(this));
        }else{
            //nothing to cascade - crack on with next drop
            this.sState = this.eStateEnums.sInitDrop;
        }
    }

    private onCascadeComplete(){
        console.log('onCascadeComplete');
        this.sState = this.eStateEnums.sInitDrop;
    }



}


declare global {
    interface Window { Game: any; }
}

window.onload = function () {
    new GameManager();
}



