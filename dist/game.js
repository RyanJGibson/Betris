(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("PIXI"));
	else if(typeof define === 'function' && define.amd)
		define("betris", ["PIXI"], factory);
	else if(typeof exports === 'object')
		exports["betris"] = factory(require("PIXI"));
	else
		root["betris"] = factory(root["PIXI"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

//Initial typescript/PIXI/webpack project setup lifted from: 
//https://goodgecko.co.uk/pixi-typescript-webpack.html
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
//This index file serves as our main game entry point / manager:
//For purposes of the Betris Demo, this class instantiates PIXI, loads in our config JSON and acts as a controller between our model (handling data) and view (handling rendering)
//We keep a finite state engine running to take care of the current game state
//Work log:
/*
20.01.20: Received initial brief around 4pm. Spent evening mulling over best approach / bit of planning
21.01.20: Initial Bitbucket / TS project setup.  Defined data structures / intial data loading & parsing.
22.05.20: Bit of code cleanpup.  Resolved "strictPropertyInitialization" ts issue. Initial work on view rendering.  Resizing shenanigans. Began work on model to attach shapes to data grid.
23.05.20: started rendering our view based on data.  Got our drop tweens and cell vanishing tweens in. 'Cascading' drop logic in.  Broken back of it.
*/
var PIXI = __importStar(__webpack_require__(2));
var resizeHelper_1 = __webpack_require__(3);
var view_1 = __webpack_require__(4);
var model_1 = __webpack_require__(5);
var GameManager = /** @class */ (function () {
    //kick things off
    function GameManager() {
        this.nScore = 0;
        this.eStateEnums = {
            sWait: "WAIT",
            sInitDrop: "INIT_DROP" //check gameover state, add new shape and init drop anim
        };
        //expose to window so we can use our dev html UI
        window.Game = this;
        this.oDevUIDiv = document.getElementById('devUI');
        this.oApp = new PIXI.Application({ width: 400, height: 400, backgroundColor: 0x000000, view: document.getElementById("myCanvas") });
        this.initLoadJSON();
    }
    //All public methods fired from our Dev UI:
    GameManager.prototype.Init = function (nOption) {
        console.log('Init');
        console.log(nOption);
        this.sState = this.eStateEnums.sWait;
        this.oView.killAllTweens();
        this.oModel.createNewDataGrid();
        var aDataGrid = this.oModel.getDataGrid();
        this.oView.renderCells(aDataGrid);
        this.oModel.setDropList(nOption);
        this.sState = this.eStateEnums.sInitDrop;
        this.nScore = 0;
        this.oView.setScore(this.nScore);
        this.oDevUIDiv.style.display = 'none';
    };
    //Get our game data (normally we'd expect to run preloaders etc first, but we're using graphics API to draw everything in this demo)
    GameManager.prototype.initLoadJSON = function () {
        var _this = this;
        console.log('initLoadJSON');
        fetch('json/config.json')
            .then(function (oResponse) { return oResponse.json(); })
            .then(function (oData) { return _this.onDataLoaded(oData); });
    };
    //Once we have our data we can go ahead and instantiate the various parts of the demo
    GameManager.prototype.onDataLoaded = function (oData) {
        console.log('onDataloaded');
        console.log(oData);
        this.oData = oData;
        this.oContainerDiv = document.createElement('div');
        document.body.appendChild(this.oContainerDiv);
        this.oContainerDiv.setAttribute('id', 'stage');
        this.oContainerDiv.appendChild(this.oApp.view);
        this.oApp.view.width = this.oData.generic.aCanvasPixelDimensions[0];
        this.oApp.view.height = this.oData.generic.aCanvasPixelDimensions[1];
        this.cMainContainer = new PIXI.Container();
        this.oApp.stage.addChild(this.cMainContainer);
        this.oModel = new model_1.Model(this.oData);
        this.oView = new view_1.View(this.cMainContainer, this.oData);
        this.sState = this.eStateEnums.sWait;
        this.oApp.ticker.add(this.loop.bind(this));
        this.oResizeHelper = new resizeHelper_1.ResizeHelper(this.oData, this.oContainerDiv);
        //auto kick things off - eventually want a button or something:
        //this.sState = this.eStateEnums.sInitDrop;
        //let oInfoDiv = document.createElement('div');
    };
    //Our main game loop - a 'finite state engine' responsible for coordinating the various operations
    GameManager.prototype.loop = function () {
        //console.log('loop');
        //console.log(this.sState);
        switch (this.sState) {
            case this.eStateEnums.sWait:
                break;
            case this.eStateEnums.sInitDrop:
                this.initDrop();
                break;
        }
    };
    GameManager.prototype.initDrop = function () {
        console.log('initDrop');
        this.sState = this.eStateEnums.sWait;
        var bHaveShapes = this.oModel.addNextShape();
        if (bHaveShapes) {
            var aDataGrid = this.oModel.getDataGrid();
            this.oView.renderCells(aDataGrid);
            var aFallData = this.oModel.getNewFallingShapeData();
            //check our fall data and ensure that the blocks can actually move down
            var bIsGameOver = this.oModel.checkGameOver(aFallData);
            if (bIsGameOver) {
                console.log('game over');
                this.oDevUIDiv.style.display = 'block';
            }
            else {
                this.oView.animateFallingBlocks(aFallData, this.onNewDropComplete.bind(this));
            }
        }
        else {
            console.log('out of shapes');
            this.oDevUIDiv.style.display = 'block';
        }
    };
    GameManager.prototype.onNewDropComplete = function () {
        //check our grid to see if we have any wins
        var aDataGrid = this.oModel.getDataGrid();
        this.oView.renderCells(aDataGrid);
        var aWins = this.oModel.checkGridForWins();
        if (aWins.length > 0) {
            console.log('We have a winner');
            this.nScore += aWins.length * 10;
            this.oView.setScore(this.nScore);
            this.oView.animateRemoveWinningBlocks(aWins, this.onWinningBlocksRemoved.bind(this));
        }
        else {
            this.sState = this.eStateEnums.sInitDrop;
        }
        //this.sState = this.eStateEnums.sInitDrop;
    };
    GameManager.prototype.onWinningBlocksRemoved = function () {
        console.log('onWinningBlocksRemoved');
        var aFallData = this.oModel.getFallDataAfterRowsRemoved();
        if (aFallData.length > 0) {
            console.log('animate the cascade');
            this.oView.animateFallingBlocks(aFallData, this.onCascadeComplete.bind(this));
        }
        else {
            //nothing to cascade - crack on with next drop
            this.sState = this.eStateEnums.sInitDrop;
        }
    };
    GameManager.prototype.onCascadeComplete = function () {
        console.log('onCascadeComplete');
        this.sState = this.eStateEnums.sInitDrop;
    };
    return GameManager;
}());
exports.GameManager = GameManager;
window.onload = function () {
    new GameManager();
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ResizeHelper = void 0;
var ResizeHelper = /** @class */ (function () {
    function ResizeHelper(oData, oContainerDiv) {
        console.log('New ResizeHelper');
        this.oData = oData;
        this.oContainerDiv = oContainerDiv;
        window.addEventListener('resize', this.onResize.bind(this), true);
        this.onResize();
    }
    //stick our demo in the middle of the screen - if either screen dimension is too small then shrink the container div down whilst maintaining aspect ratio
    ResizeHelper.prototype.onResize = function () {
        //start by setting game to width and height to the desired values specified in our config
        var nContainerDivWidth = this.oData.generic.aCanvasPixelDimensions[0];
        var nContainerDivHeight = this.oData.generic.aCanvasPixelDimensions[1];
        //Check that our window isn't now too small to display our game at full size
        if (window.innerWidth < nContainerDivWidth || window.innerHeight < nContainerDivHeight) {
            var nGameAspectRatio = this.oData.generic.aCanvasPixelDimensions[0] / this.oData.generic.aCanvasPixelDimensions[1];
            var nWindowAspectRatio = window.innerWidth / window.innerHeight;
            //console.log(nGameAspectRatio + " " + nWindowAspectRatio);
            if (nGameAspectRatio < nWindowAspectRatio) {
                //the game is relatively thinner than the window.  Set the game height to match window height, and adjust game width accordingly
                nContainerDivHeight = window.innerHeight;
                nContainerDivWidth = nContainerDivHeight * nGameAspectRatio;
            }
            else {
                //the game is relatively taller than the window.  Set the game width to match window width, and adjust game height accordingly
                nContainerDivWidth = window.innerWidth;
                nContainerDivHeight = nContainerDivWidth / nGameAspectRatio;
            }
        }
        this.oContainerDiv.style.width = nContainerDivWidth.toString();
        this.oContainerDiv.style.height = nContainerDivHeight.toString();
        //finally - adjust our margins so the demo appears pleasingly in the center of the screen
        this.oContainerDiv.style.marginLeft = ((window.innerWidth - nContainerDivWidth) / 2).toString();
        this.oContainerDiv.style.marginTop = ((window.innerHeight - nContainerDivHeight) / 2).toString();
    };
    return ResizeHelper;
}());
exports.ResizeHelper = ResizeHelper;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.View = exports.Cell = void 0;
var Cell = /** @class */ (function () {
    function Cell() {
    }
    return Cell;
}());
exports.Cell = Cell;
var View = /** @class */ (function () {
    function View(cMainContainer, oData) {
        console.log('New View');
        this.cMainContainer = cMainContainer;
        this.oData = oData;
        this.createGrid();
        this.createScoreField();
    }
    //clears the grid and rerenders all our tiles based on whatever data is passed
    View.prototype.renderCells = function (aDataGrid) {
        //let oCurrentShapeLibData:IshapeLibraryData
        //console.log('View: renderCells');
        //console.log(aDataGrid);
        this.aViewGrid = [];
        this.cCellContainer.removeChildren();
        for (var i = 0; i < aDataGrid.length; i++) {
            var aCurrentDataRow = aDataGrid[i];
            var aViewRow = [];
            for (var j = 0; j < aCurrentDataRow.length; j++) {
                if (aCurrentDataRow[j] != 'X') {
                    //console.log(aCurrentDataRow[j]);
                    aViewRow.push(this.createNewCell(aCurrentDataRow[j], j, i));
                }
                else {
                    aViewRow.push(null);
                }
            }
            this.aViewGrid.push(aViewRow);
        }
        //console.log(this.cCellContainer);
        //console.log(this.aViewGrid);
    };
    View.prototype.killAllTweens = function () {
        TweenMax.killAll();
    };
    View.prototype.createNewCell = function (nShapeID, nX, nY) {
        //console.log('createNewCell');
        var oContainer = new PIXI.Container();
        var graTest = new PIXI.Graphics();
        graTest.lineStyle(2, 0x000000);
        graTest.beginFill(this.oData.aShapeLibrary[Number(nShapeID)].nColour);
        graTest.drawRect(0, 0, this.oData.generic.aGridCellPixelDimensions[0], this.oData.generic.aGridCellPixelDimensions[1]);
        oContainer.addChild(graTest);
        var oCell = new Cell();
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
    };
    View.prototype.animateFallingBlocks = function (aFallData, onNewDropCompleteCallback) {
        console.log('animateFallingBlocks');
        //console.log(aFallData);
        var nComplete = 0;
        for (var i = 0; i < aFallData.length; i++) {
            var oCurrentFallData = aFallData[i];
            //console.log(oCurrentFallData);
            //console.log(this.aViewGrid[oCurrentFallData.nTileY][oCurrentFallData.nTileX]);
            var oCell = this.aViewGrid[oCurrentFallData.nTileY][oCurrentFallData.nTileX];
            //oCell.oContainer.alpha = 0.5;
            oCell.nDestTileY = oCell.nTileY + oCurrentFallData.nFallDist;
            var oTween = TweenMax.to(oCell.oContainer, oCurrentFallData.nFallDist / this.oData.generic.nDropSpeed, {
                //ease: eval("Elastic.easeOut.config(1.5, 0.5)"),
                ease: window.Power1.easeIn,
                //ease: 
                y: oCell.nDestTileY * this.oData.generic.aGridCellPixelDimensions[1],
                onComplete: function () {
                    nComplete++;
                    if (nComplete == aFallData.length) {
                        onNewDropCompleteCallback();
                    }
                }.bind(this)
            });
        }
    };
    View.prototype.animateRemoveWinningBlocks = function (aRowsToRemove, onWinnersRemovedCompleteCallback) {
        console.log('animateRemoveWinningBlocks');
        //console.log( this.aViewGrid);
        var nComplete = 0;
        var nTotalAnims = aRowsToRemove.length * this.oData.generic.aGridTileDimensions[0];
        var nAnimCount = 0;
        for (var i = 0; i < aRowsToRemove.length; i++) {
            for (var j = 0; j < this.oData.generic.aGridTileDimensions[0]; j++) {
                //console.log('removing: y:' + aRowsToRemove[i] + " x:" + j);
                var oCell = this.aViewGrid[aRowsToRemove[i]][j];
                var oTween = TweenMax.to(oCell.oContainer, 0.25, {
                    //ease: eval("Elastic.easeOut.config(1.5, 0.5)"),
                    alpha: 0,
                    delay: (nAnimCount / 30) + 0.1,
                    onComplete: function () {
                        nComplete++;
                        //console.log(nComplete);
                        if (nComplete == nTotalAnims) {
                            onWinnersRemovedCompleteCallback();
                        }
                    }.bind(this)
                });
                nAnimCount++;
                //onWinnersRemovedCompleteCallback
            }
        }
    };
    View.prototype.createGrid = function () {
        console.log('createGrid');
        console.log(this.oData);
        this.cGridContainer = new PIXI.Container();
        this.cMainContainer.addChild(this.cGridContainer);
        for (var i = 0; i < this.oData.generic.aGridTileDimensions[0]; i++) {
            for (var j = 0; j < this.oData.generic.aGridTileDimensions[1] + this.oData.generic.nGridSpawnAreaHeight; j++) {
                var gGridRect = new PIXI.Graphics();
                gGridRect.lineStyle(2, this.oData.generic.nGridLineColour);
                gGridRect.beginFill(this.oData.generic.nGridCellColour);
                gGridRect.drawRect(0, 0, this.oData.generic.aGridCellPixelDimensions[0], this.oData.generic.aGridCellPixelDimensions[1]);
                gGridRect.x = this.oData.generic.aGridCellPixelDimensions[0] * i;
                gGridRect.y = this.oData.generic.aGridCellPixelDimensions[1] * j;
                this.cGridContainer.addChild(gGridRect);
                if (j < this.oData.generic.nGridSpawnAreaHeight) {
                    gGridRect.alpha = 0.5;
                }
            }
        }
        var nGridWidthPixels = this.oData.generic.aGridTileDimensions[0] * this.oData.generic.aGridCellPixelDimensions[0];
        var nGridHeightPixels = (this.oData.generic.aGridTileDimensions[1] + this.oData.generic.nGridSpawnAreaHeight) * this.oData.generic.aGridCellPixelDimensions[1];
        this.cGridContainer.x = (this.oData.generic.aCanvasPixelDimensions[0] - nGridWidthPixels) / 2;
        this.cGridContainer.position.y = (this.oData.generic.aCanvasPixelDimensions[1] - nGridHeightPixels) / 2;
        this.cCellContainer = new PIXI.Container();
        this.cCellContainer.x = this.cGridContainer.x;
        this.cCellContainer.y = this.cGridContainer.y;
        this.cMainContainer.addChild(this.cCellContainer);
    };
    View.prototype.createScoreField = function () {
        this.tScoreField = new PIXI.Text('Score: 0', { fontFamily: 'Arial', fontSize: 14, fill: 0xffffff, align: 'center' });
        this.cMainContainer.addChild(this.tScoreField);
        this.tScoreField.position.x = 10;
        this.tScoreField.position.y = this.oData.generic.aCanvasPixelDimensions[1] - 30;
    };
    View.prototype.setScore = function (nScore) {
        this.tScoreField.text = 'Score: ' + nScore;
    };
    return View;
}());
exports.View = View;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
var Model = /** @class */ (function () {
    function Model(oData) {
        this.bFallingShapeStuckInSpawnArea = false;
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
    Model.prototype.setDropList = function (nListIndex) {
        console.log('setDropList:  ' + nListIndex);
        //console.log(this.oData.aDropLists);
        this.aCurrentDropList = [];
        if (nListIndex > -1) {
            this.aCurrentDropList = JSON.parse(JSON.stringify(this.oData.aDropLists[nListIndex]));
        }
        else {
            console.log('creating random drop list');
            for (var i = 0; i < 200; i++) {
                var oShape = {
                    nColumn: 0,
                    nShape: parseInt((Math.random() * 5).toString()),
                    nRotation: parseInt((Math.random() * 4).toString()),
                };
                var oShapeLibData = this.aShapeLibrary[oShape.nShape];
                //normalise our rotation
                oShape.nRotation = oShape.nRotation % (oShapeLibData.aRotations.length);
                //set our random column
                var nShapeTileWidth = oShapeLibData.aRotations[oShape.nRotation][0].length;
                oShape.nColumn = parseInt((Math.random() * (this.oData.generic.aGridTileDimensions[0] - nShapeTileWidth + 1)).toString()),
                    this.aCurrentDropList.push(oShape);
            }
        }
        //console.log(this.aCurrentDropList);
    };
    Model.prototype.createNewDataGrid = function () {
        this.aDataGrid = [];
        for (var i = 0; i < this.oData.generic.aGridTileDimensions[1] + this.oData.generic.nGridSpawnAreaHeight; i++) {
            var aRow = [];
            for (var j = 0; j < this.oData.generic.aGridTileDimensions[0]; j++) {
                aRow.push('X');
            }
            this.aDataGrid.push(aRow);
        }
        //console.log(this.aDataGrid);
        this.devDataGrid();
        //this.drawGridToConsole();
    };
    Model.prototype.getDataGrid = function () {
        var aDataGridCopy = JSON.parse(JSON.stringify(this.aDataGrid));
        for (var i = 0; i < aDataGridCopy.length; i++) {
            var aCurrentRow = aDataGridCopy[i];
            for (var j = 0; j < aCurrentRow.length; j++) {
                if (aCurrentRow[j] == '@') {
                    aCurrentRow[j] = this.oCurrentShapeLibData.nID;
                }
            }
        }
        return aDataGridCopy;
    };
    Model.prototype.getCurrentShapeLibData = function () {
        return this.oCurrentShapeLibData;
    };
    Model.prototype.checkGameOver = function (aFallData) {
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
    };
    Model.prototype.addNextShape = function () {
        //console.log('model : addNextShape');
        //console.log(this.aCurrentDropList);
        this.bFallingShapeStuckInSpawnArea = false;
        if (this.aCurrentDropList.length > 0) {
            var oShapeDropListData = this.aCurrentDropList[0];
            var oShapeLibData = this.aShapeLibrary[oShapeDropListData.nShape];
            //console.log('shape being dropped:');
            //console.log(oShapeLibData);
            //console.log('shape rotaton');
            //console.log(oShapeDropListData.nRotation );
            oShapeDropListData.nRotation = oShapeDropListData.nRotation % (oShapeLibData.aRotations.length);
            //console.log('%' + oShapeDropListData.nRotation );
            var aChosenRotation = oShapeLibData.aRotations[oShapeDropListData.nRotation];
            //console.log(aChosenRotation);
            this.oCurrentShapeDropListData = oShapeDropListData;
            this.oCurrentShapeLibData = oShapeLibData;
            this.oCurrentShapeLibData.nID = oShapeDropListData.nShape;
            //initially create shape in the spawn area of our gridData
            //firstly ensure that the start column will actually allow our shape to be positioned on the grid
            var nShapeTileWidth = oShapeLibData.aRotations[oShapeDropListData.nRotation][0].length;
            var nShapeTileHeight = oShapeLibData.aRotations[oShapeDropListData.nRotation].length;
            //console.log('shapeTileWidth: ' + nShapeTileWidth);
            //console.log('nShapeTileHeight: ' + nShapeTileHeight);
            //console.log('oShapeDropListData.nColumn: ' + oShapeDropListData.nColumn);
            //if our symbol has been positioned too far to the right, nudge it back into place (align it to the right of the grid)
            //console.log( this.oData.generic.aGridTileDimensions[0]);
            //console.log( (oShapeDropListData.nColumn + nShapeTileWidth));
            if ((oShapeDropListData.nColumn + nShapeTileWidth) > this.oData.generic.aGridTileDimensions[0]) {
                oShapeDropListData.nColumn = this.oData.generic.aGridTileDimensions[0] - nShapeTileWidth;
                //console.log('oShapeDropListData.nColumn adjusted: ' + oShapeDropListData.nColumn);
            }
            //Add our initial shape data to the start grid
            for (var i = 0; i < aChosenRotation.length; i++) {
                var aRow = aChosenRotation[i];
                for (var j = 0; j < aRow.length; j++) {
                    var nTile = aRow[j];
                    //console.log(nTile);
                    if (nTile == 1) {
                        this.aDataGrid[i][j + oShapeDropListData.nColumn] = '@';
                    }
                }
            }
            //this.drawGridToConsole();
            this.aCurrentDropList.shift();
            return true;
        }
        else {
            //console.log('OUT OF SHAPES');
            return false;
        }
    };
    Model.prototype.devDataGrid = function () {
        //this.aDataGrid[8][1] = 2;
    };
    Model.prototype.getNewFallingShapeData = function () {
        //console.log('getFallingShapeData');
        //for falling blocks we generate a list of how far each block needs to fall so view can then determine they're new X,Y Positions
        var aFallData = [];
        var nTotalYTiles = this.oData.generic.aGridTileDimensions[1] + this.oData.generic.nGridSpawnAreaHeight;
        var nCurrentShapeHeight = this.oCurrentShapeLibData.aRotations[this.oCurrentShapeDropListData.nRotation].length;
        var nMaxFallingDist = nTotalYTiles - nCurrentShapeHeight;
        for (var i = 0; i < this.aDataGrid.length; i++) {
            var aCurrentRow = this.aDataGrid[i];
            for (var j = 0; j < aCurrentRow.length; j++) {
                if (aCurrentRow[j] == '@') {
                    //console.log('found new falling cell at : ' + j + " " + i);
                    aCurrentRow[j] = 'X'; //reset our data here while we're parsing
                    var oFallingTileData = {
                        nFallDist: 0,
                        nTileX: j,
                        nTileY: i
                    };
                    aFallData.push(oFallingTileData);
                    //found a falling object at 
                    //so how far can this guy fall before hitting another shape / the floor?
                    for (var k = 0; k < nTotalYTiles; k++) {
                        //checking cell
                        var nCellXToCheck = j;
                        var nCellYToCheck = i + k;
                        if (nCellYToCheck < nTotalYTiles) {
                            // console.log('checking ' + nCellXToCheck + " " + nCellYToCheck);
                            //console.log(this.aDataGrid[nCellYToCheck][nCellXToCheck]);
                            if ((this.aDataGrid[nCellYToCheck][nCellXToCheck] != '@') && (this.aDataGrid[nCellYToCheck][nCellXToCheck] != 'X')) {
                                //console.log('Found non X at : ' + nCellXToCheck + " " + nCellYToCheck);
                                //console.log(this.aDataGrid[nCellYToCheck][nCellXToCheck]);
                                if (k - 1 < nMaxFallingDist) {
                                    nMaxFallingDist = k - 1;
                                }
                            }
                        }
                    }
                }
            }
        }
        //console.log('nMaxFallingDist');
        //console.log(nMaxFallingDist);
        var nCellsStillInSpawnArea = 0;
        for (var i = 0; i < aFallData.length; i++) {
            var oCurrentFallData = aFallData[i];
            oCurrentFallData.nFallDist = nMaxFallingDist;
            //reset our grid data here while we're parsing
            this.aDataGrid[oCurrentFallData.nTileY + oCurrentFallData.nFallDist][oCurrentFallData.nTileX] = this.oCurrentShapeLibData.nID;
            if (oCurrentFallData.nTileY + oCurrentFallData.nFallDist < 4) {
                //alert('g o');
                nCellsStillInSpawnArea++;
            }
        }
        if (nCellsStillInSpawnArea == aFallData.length) {
            this.bFallingShapeStuckInSpawnArea = true;
        }
        //console.log('fall data');
        //console.log(aFallData);
        //this.drawGridToConsole();
        return aFallData;
    };
    Model.prototype.checkGridForWins = function () {
        //console.log('checkGridForWins..');
        //this.drawGridToConsole();
        //iterate through our data grid, if we find any completed rows, generte new fallData for the view, and update this data grid accordingly
        var aCompleteRows = [];
        for (var i = 0; i < this.aDataGrid.length; i++) {
            var aCurrentRow = this.aDataGrid[i];
            var nFullRowCount = 0;
            for (var j = 0; j < aCurrentRow.length; j++) {
                if (aCurrentRow[j] != 'X') {
                    nFullRowCount++;
                }
            }
            if (nFullRowCount == aCurrentRow.length) {
                console.log('Full Row at: ' + i);
                aCompleteRows.push(i);
            }
        }
        return aCompleteRows;
    };
    Model.prototype.getFallDataAfterRowsRemoved = function () {
        //console.log('getFallDataAfterRowsRemoved');
        var aFallData = [];
        var aCompleteRows = this.checkGridForWins();
        //work from bottom up, in the event we hit a completed row we increment a drop count and apply that to any cells we hit with a block in thereafter
        //console.log(aCompleteRows);
        aCompleteRows.reverse();
        //console.log(aCompleteRows);
        var bIncDropCount = false;
        var nDropCount = 0;
        for (var i = this.aDataGrid.length - 1; i > 0; i--) {
            bIncDropCount = false;
            if (i == aCompleteRows[0]) {
                //we've hit a row that we need to remove
                //console.log('removing data for row: ' + i);
                aCompleteRows.shift();
                bIncDropCount = true;
            }
            if (bIncDropCount) {
                //console.log('Row ' + i + ' is being removed');
                nDropCount++;
            }
            else {
                //console.log('Row ' + i + ' is not being removed, but its contents need to drop ' + nDropCount);
                var aCurrentRow = this.aDataGrid[i];
                for (var j = 0; j < aCurrentRow.length; j++) {
                    if (aCurrentRow[j] != 'X') {
                        //console.log('found a block that needs to come down at x:' + j + ' y:' + i + ' by ' + nDropCount);
                        var oFallingTileData = {
                            nFallDist: nDropCount,
                            nTileX: j,
                            nTileY: i
                        };
                        aFallData.push(oFallingTileData);
                    }
                }
            }
        }
        //regenerate our grid data minus the removed rows
        aCompleteRows = this.checkGridForWins();
        var nTotalRowsRemoved = aCompleteRows.length;
        var aNewGridData = [];
        var aDataGridCopy = JSON.parse(JSON.stringify(this.aDataGrid));
        for (var i = 0; i < this.aDataGrid.length; i++) {
            if (i != aCompleteRows[0]) {
                aNewGridData.push(aDataGridCopy[i]);
            }
            else {
                aCompleteRows.shift();
            }
        }
        for (var i = 0; i < nTotalRowsRemoved; i++) {
            var aEmptyRow = [];
            for (var j = 0; j < this.oData.generic.aGridTileDimensions[0]; j++) {
                aEmptyRow.push('X');
            }
            aNewGridData.unshift(aEmptyRow);
        }
        //console.log('new grid data');
        this.aDataGrid = aNewGridData;
        //console.log(this.aDataGrid);
        //console.log(aFallData);
        return aFallData;
    };
    Model.prototype.drawGridToConsole = function () {
        //console.log('Grid:');
        for (var i = 0; i < this.aDataGrid.length; i++) {
            var aCurrentRow = this.aDataGrid[i];
            var sBuild = ' ';
            for (var j = 0; j < aCurrentRow.length; j++) {
                sBuild += aCurrentRow[j];
            }
            sBuild += '  ' + i;
            console.log(sBuild);
        }
    };
    return Model;
}());
exports.Model = Model;


/***/ })
/******/ ]);
});