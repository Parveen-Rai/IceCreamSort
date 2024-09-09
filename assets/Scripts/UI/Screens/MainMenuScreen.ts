import { _decorator} from 'cc';
import { ScreenBase } from '../../Utils/ScreenBase';
import { SCREEN } from '../../Data/Constants';
import { SCREENS } from '../../Utils/ScreenManager';
import { native } from 'cc';
const { ccclass, property } = _decorator;

declare global {
    interface Window {
        onRewardedAdCompleted: (params:any) => void;
    }
  }

  window.onRewardedAdCompleted = function(val){
    console.log("RewardCompleted" ,val);
}

@ccclass('MainMenuScreen')
export class MainMenuScreen extends ScreenBase {
    
    onShow(data: any): void {
        

      

    }

   

    start(){
        try {
            setTimeout(()=>{
                native.reflection.callStaticMethod(
                    "com/cocos/game/AdManager",
                    "loadBannerView",
                    "(Ljava/lang/String;Ljava/lang/String;)V",
                    "ca-app-pub-8856913399600283/8416753168",
                    "bottom"
                )
            },2000) 
        } catch (error) {
            console.log("Error in call banner ",error)
        }
       
       
      
    }

    onHide(): void {
        
    }

    onClickSettings(){
        try {
            native.reflection.callStaticMethod(
                "com/cocos/game/AdManager", 
                "loadInterstitialAd",
                "(Ljava/lang/String;)V",
                "ca-app-pub-8856913399600283/4409225396" 
            );
        } catch (error) {
            console.log("Error in call ",error)
        }
        
    }

    onClickPlay(){
        SCREEN.showScreen(SCREENS.GAME_SCREEN);
    }

    onClickLike(){
        try {
            native.reflection.callStaticMethod(
                "com/cocos/game/AdManager", 
                "loadRewardedAd",
                "(Ljava/lang/String;)V",
                "ca-app-pub-8856913399600283/3869598526" 
            );
        } catch (error) {
            console.log("Error in call ",error)
        }
    }
}


