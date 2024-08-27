import { _decorator, Component ,Animation,AnimationClip} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AnimBase')
export class AnimBase extends Component {

    @property({type:Animation})
     animation :Animation = null;

     private _callback:any

    play(isReverse = false, callback = null){
         this._callback = callback;
        let clip = this.animation.defaultClip;
        clip.wrapMode = isReverse?AnimationClip.WrapMode.Reverse:AnimationClip.WrapMode.Normal
        console.log("ISrEVERSE ",isReverse);
        console.log("WrapMode ", clip.wrapMode);
        this.animation.play(clip.name);
    }

    onAnimEnd(){
        if(this._callback)
            this._callback();
    }
}


