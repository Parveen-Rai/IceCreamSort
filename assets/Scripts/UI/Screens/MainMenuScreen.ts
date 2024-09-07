import { _decorator} from 'cc';
import { ScreenBase } from '../../Utils/ScreenBase';
import { SCREEN } from '../../Data/Constants';
import { SCREENS } from '../../Utils/ScreenManager';
const { ccclass, property } = _decorator;

@ccclass('MainMenuScreen')
export class MainMenuScreen extends ScreenBase {
    
    onShow(data: any): void {
        

      

    }

    start(){
        // jsb.reflection.callStaticMethod(
        //     "com/cocos/game/AdManager", 
        //     "loadBannerView", 
        //     "(Ljava/lang/String;Ljava/lang/Boolean)V", 
        //     "ca-app-pub-8856913399600283/8416753168",
        //     "false"
        // );
    }

    onHide(): void {
        
    }

    onClickPlay(){
        SCREEN.showScreen(SCREENS.GAME_SCREEN);
    }
}


