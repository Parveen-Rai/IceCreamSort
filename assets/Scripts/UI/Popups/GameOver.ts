import { _decorator,Label} from 'cc';
import { PopupBase } from '../../Utils/PopupBase';
import { eventTarget, GAME_EVENTS,POPUP, SCREEN } from '../../Data/Constants';
import { POPUPS } from '../../Utils/PopUpManager';
import { SCREENS } from '../../Utils/ScreenManager';
const { ccclass, property } = _decorator;

@ccclass('GameOver')
export class GameOver extends PopupBase {


    @property({type:Label})
    completedLevelLabel:Label = null;

    levelCompleted:number = 0;

    onShow(data = null){
        this.levelCompleted = data
        this.completedLevelLabel.string = `LEVEL ${this.levelCompleted+1} COMPLETED `
    }

    onHide(){
        
    }

    closePopup(){
        POPUP.hide(POPUPS.GAME_OVER)
    }

    onClickMenu(){
        SCREEN.showScreen(SCREENS.MAIN_MENU);
        this.closePopup();
    }

    onRetryClick(){
        eventTarget.emit(GAME_EVENTS.ON_GAME_START,this.levelCompleted);
        this.closePopup();
    }

    onNextClick(){
        this.levelCompleted+=1;
        eventTarget.emit(GAME_EVENTS.ON_GAME_START,this.levelCompleted);
        this.closePopup();
    }
}


