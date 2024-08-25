import { _decorator} from 'cc';
import { ScreenBase } from '../../Utils/ScreenBase';
import { SCREEN } from '../../Data/Constants';
import { SCREENS } from '../../Utils/ScreenManager';
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
}


