import { _decorator} from 'cc';
import { ScreenBase } from '../../Utils/ScreenBase';
import { POPUP, SCREEN } from '../../Data/Constants';
import { SCREENS } from '../../Utils/ScreenManager';
import { native } from 'cc';
import { PopupBase } from '../../Utils/PopupBase';
import { POPUPS } from '../../Utils/PopUpManager';
const { ccclass, property } = _decorator;

@ccclass('MainMenuScreen')
export class MainMenuScreen extends ScreenBase {
    
    onShow(data: any): void {

    }


    onHide(): void {
        
    }

    onClickPlay(){
        SCREEN.showScreen(SCREENS.GAME_SCREEN);
    }

    onClickSocial(){

    }

    onClickSettings(){
        POPUP.showPopup(POPUPS.SETTINGS);
    }

    onClickShare(){
        // to share game with friends
    }

    onPurchaseAdRemove(){
        // start the purchase 
    }
}


