import { _decorator} from 'cc';
import { ScreenBase } from '../../Utils/ScreenBase';
import { eventTarget, GAME_EVENTS, LOCAL_STORAGE, POPUP, SCREEN, USER} from '../../Data/Constants';
import { SCREENS } from '../../Utils/ScreenManager';
import { POPUPS } from '../../Utils/PopUpManager';
const { ccclass, property } = _decorator;

@ccclass('GameScreen')
export class GameScreen extends ScreenBase {

    onShow(data: any): void {
        eventTarget.emit(GAME_EVENTS.ON_GAME_START,0);
    }

    onHide(): void {
        
    }

    onClickHome(){
        eventTarget.emit(GAME_EVENTS.ON_GAME_ABANDONED);
        SCREEN.showScreen(SCREENS.MAIN_MENU);
    }

    onClickRestart(){
        eventTarget.emit(GAME_EVENTS.ON_GAME_ABANDONED)
        eventTarget.emit(GAME_EVENTS.ON_GAME_START);
        //Restart Your game
    }

    onSettingsClick(){
        POPUP.showPopup(POPUPS.SETTINGS);
    }

    onPurchaseAdRemove(){
        // start the purchase 
    }

    onClickRewardedAd(){
        // start the rewarded ad
        eventTarget.emit(GAME_EVENTS.ON_ADD_NEW_CONE);
    }

    onSkipAd(){
        POPUP.showPopup(POPUPS.AD_WATCHED_CONFIRM,(()=>{
            eventTarget.emit(GAME_EVENTS.ON_GAME_ABANDONED)
            eventTarget.emit(GAME_EVENTS.ON_GAME_START,1);
        }));
    }


}


