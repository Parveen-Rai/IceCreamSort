import { _decorator, Component ,Animation,AnimationClip} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AnimBase')
export class AnimBase extends Component {

    private anim :Animation = null;
    start(): void {
        this.anim = this.getComponent(Animation);
    }

    play(isReverse = false){
        let clip = this.anim.defaultClip;
        clip.wrapMode = isReverse?AnimationClip.WrapMode.Reverse:AnimationClip.WrapMode.Normal
        this.anim.play();
    }
}


