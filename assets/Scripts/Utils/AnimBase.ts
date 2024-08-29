import { _decorator, Component, Animation, AnimationClip } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AnimBase')
export class AnimBase extends Component {

    @property({ type: Animation })
    animation: Animation = null;

    private _callback: any


    private clips : AnimationClip[];

    play(isReverse = false, callback = null) {
        this.clips = this.animation.clips;
        this._callback = callback;
        if(!isReverse){
            this.animation.play(this.clips[0].name);
        }else{
            this.animation.play(this.clips[1].name);
        }
    }

    onAnimEnd() {
        if (this._callback)
            this._callback();
    }
}


