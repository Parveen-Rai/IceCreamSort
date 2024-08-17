import { _decorator, Component, Sprite, SpriteFrame } from 'cc';
import { SCOOPS } from '../Data/Constants';
const { ccclass, property } = _decorator;

@ccclass('Scoops')
export class Scoops extends Component {

    @property({type:SpriteFrame})
    iceCreamSpriteFrames : SpriteFrame[] = [];

    @property({type:Sprite})
    scoopSprite :Sprite = null
    
   
    private _scoopType:SCOOPS = SCOOPS.RED;

    public get ScoopType() : SCOOPS {
        return this._scoopType;
    }
    


    // setting Up scoop properties for the first time
    initializeScoop(_scType:SCOOPS){
        if(this.iceCreamSpriteFrames[_scType]){
            this._scoopType = _scType;
            this.scoopSprite.spriteFrame = this.iceCreamSpriteFrames[_scType];
        }else{
            console.error("Invalid scoop type or sprite frame not set.")
        }
       
    }
}


