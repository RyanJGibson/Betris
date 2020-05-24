import { IgameData } from '../interfaces';

export class ResizeHelper{

    private oData:IgameData;
    private oContainerDiv:HTMLDivElement;

    public constructor(oData:IgameData, oContainerDiv:HTMLDivElement){
        console.log('New ResizeHelper');
        this.oData = oData;
        this.oContainerDiv = oContainerDiv;
        window.addEventListener('resize', this.onResize.bind(this), true);
        this.onResize();
    }

    //stick our demo in the middle of the screen - if either screen dimension is too small then shrink the container div down whilst maintaining aspect ratio
    private onResize(){

        //start by setting game to width and height to the desired values specified in our config
        let nContainerDivWidth = this.oData.generic.aCanvasPixelDimensions[0];
        let nContainerDivHeight = this.oData.generic.aCanvasPixelDimensions[1];

        //Check that our window isn't now too small to display our game at full size
        if(window.innerWidth < nContainerDivWidth || window.innerHeight < nContainerDivHeight){
            let nGameAspectRatio:number = this.oData.generic.aCanvasPixelDimensions[0] / this.oData.generic.aCanvasPixelDimensions[1];
            let nWindowAspectRatio = window.innerWidth / window.innerHeight;
            //console.log(nGameAspectRatio + " " + nWindowAspectRatio);
            if(nGameAspectRatio < nWindowAspectRatio){
                //the game is relatively thinner than the window.  Set the game height to match window height, and adjust game width accordingly
                nContainerDivHeight = window.innerHeight;
                nContainerDivWidth = nContainerDivHeight*nGameAspectRatio;
            }else{
                //the game is relatively taller than the window.  Set the game width to match window width, and adjust game height accordingly
                nContainerDivWidth = window.innerWidth;
                nContainerDivHeight = nContainerDivWidth/nGameAspectRatio;
            }
        }

        this.oContainerDiv.style.width = nContainerDivWidth.toString();
        this.oContainerDiv.style.height = nContainerDivHeight.toString();
        
        //finally - adjust our margins so the demo appears pleasingly in the center of the screen
        this.oContainerDiv.style.marginLeft = ((window.innerWidth - nContainerDivWidth)/2).toString();
        this.oContainerDiv.style.marginTop = ((window.innerHeight - nContainerDivHeight)/2).toString();

    }


}
