import { _decorator} from 'cc';
import { ScreenBase } from '../../Utils/ScreenBase';
import { eventTarget, GAME_EVENTS} from '../../Data/Constants';
const { ccclass, property } = _decorator;

@ccclass('GameScreen')
export class GameScreen extends ScreenBase {

    onShow(data: any): void {
        eventTarget.emit(GAME_EVENTS.ON_GAME_START,0);
    }

    onHide(): void {
        
    }
}


