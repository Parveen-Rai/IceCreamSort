import { _decorator} from 'cc';
import { PopupBase } from '../../Utils/PopupBase';
import { POPUP } from '../../Data/Constants';
const { ccclass, property } = _decorator;

@ccclass('GameOver')
export class GameOver extends PopupBase {
    onShow(data = null){

    }

    onHide(){
        
    }

    onClicHide(){
        POPUP.hideCurrentPopup();
    }
}


