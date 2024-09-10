import { _decorator} from 'cc';
import { ScreenBase } from '../../Utils/ScreenBase';
import { SCREEN } from '../../Data/Constants';
import { SCREENS } from '../../Utils/ScreenManager';
import { native } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MainMenuScreen')
export class MainMenuScreen extends ScreenBase {
    
    onShow(data: any): void {
        

      

    }

   

    start(){
        
    }

    onHide(): void {
        
    }

    onClickSettings(){
       
    }

    onClickPlay(){
        SCREEN.showScreen(SCREENS.GAME_SCREEN);
    }

    onClickLike(){
    }
}


