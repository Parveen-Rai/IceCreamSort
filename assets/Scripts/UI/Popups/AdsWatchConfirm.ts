import { _decorator, Component, Node } from 'cc';
import { PopupBase } from '../../Utils/PopupBase';
import { POPUPS } from '../../Utils/PopUpManager';
import { POPUP } from '../../Data/Constants';
const { ccclass, property } = _decorator;

@ccclass('AdsWatchConfirm')
export class AdsWatchConfirm extends PopupBase {

    callback:any = null;

    onShow(data?: any): void {
        this.callback = data;
    }

    onHide(): void {
        
    }

    onClickNo(){
        POPUP.hide(POPUPS.AD_WATCHED_CONFIRM);
        this.callback = null
    }

    onClickWatchAd(){
        if(this.callback){
            this.callback();
        }
        POPUP.hide(POPUPS.AD_WATCHED_CONFIRM);
    }
}


