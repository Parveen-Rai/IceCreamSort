import { _decorator, Component } from 'cc';
import { PopupBase } from './PopupBase';
import { AnimBase } from './AnimBase';
const { ccclass, property } = _decorator;

let popupManagerInstance: PopUpManager = null

export enum POPUPS {
    GAME_OVER,
    LOADING,
    SETTINGS,
    NO_ADS,
    ERROR,
    INFO,
    TRANSITION,
}

@ccclass('PopUpManager')
export class PopUpManager extends Component {

    @property({ type: PopupBase })
    popups: PopupBase[] = [];

    private currentPopup:number = 0;

    private activePopupList: PopupBase[] = [];

    protected onLoad(): void {
        popupManagerInstance = this;
    }

    /**
     * Show Popup
     * @param popupType 
     * @param data 
     * @param callback 
     */
    showPopup(popupType: POPUPS, data: any = null, callback: (() => void) | null = null) {
        if (this.popups[popupType]) {
            let _cP = this.popups[popupType];
            _cP.node.active = true;
            _cP.onShow(data);
            let anim = _cP.getComponent(AnimBase);
            if (anim) {
                anim.play();
            }
            if (callback) {
                callback();
            }
            this.activePopupList.push(_cP);
            this.currentPopup = this.popups.indexOf(_cP);
        } else {
            console.error("Popup does not exist");
        }
    }

    /**
     * Hide popup
     * @param popupType 
     */
    hide(popupType:POPUPS){
        if(this.activePopupList.length > 0){
            let p =  this.activePopupList.splice(popupType);
            let anim = p[0].getComponent(AnimBase);
            if (anim) {
                anim.play(true, () => {
                    p[0].onHide();
                    p[0].node.active = false;
                });
            } else {
                p[0].onHide();
                p[0].node.active = false;
            }

        }
    }


    /**
     * Hide currently active popup
     */
    hideCurrentPopup() {
        if (this.activePopupList.length > 0) {
            let popup = this.activePopupList.pop();
            let anim = popup.getComponent(AnimBase);
            if (anim) {
                anim.play(true, () => {
                    popup.onHide();
                    popup.node.active = false;
                });
            } else {
                popup.onHide();
                popup.node.active = false;
            }

        } else {
            console.error("No popups to hide");
        }
    }


    /**
     * Hide all popups 
     */
    hideAllPopups() {
        while (this.activePopupList.length > 0) {
            this.hideCurrentPopup();
        }
    }
}

export { popupManagerInstance }


