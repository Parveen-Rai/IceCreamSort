import { _decorator, Component, Enum } from "cc";
import { ScreenBase } from "./ScreenBase";
const { ccclass, property } = _decorator;

let screenManagerInstance: ScreenManager = null;

export enum SCREENS{
    MAIN_MENU,
    GAME_SCREEN,
    NONE
}

@ccclass("ScreenManager")
export class ScreenManager extends Component {
    @property({
        type: ScreenBase,
        tooltip: "Drag all the screens corresponding to the SCREEN enum",
    })
    screens: ScreenBase[] = [];

    @property({ type: Enum(SCREENS) })
    initialScreen: SCREENS = SCREENS.MAIN_MENU;

    private currentScreen: SCREENS = SCREENS.MAIN_MENU;

    protected onLoad(): void {
        screenManagerInstance = this;
    }

    /**
     * show screen function
     * @param _screen 
     * @param data 
     * @param callback 
     */
    showScreen(
        _screen: SCREENS,
        data: any = null,
        callback: (() => void) | null = null
    ) {
        this.enableNewScreen(_screen, data, callback);
    }

    private enableNewScreen(
        _screen: SCREENS,
        data: any = null,
        callback: (() => void) | null = null
    ) {
        if (this.currentScreen == _screen) return;
        const nextScreen = this.screens[_screen];
        const currentScreen = this.screens[this.currentScreen];
        if (nextScreen && currentScreen) {
            currentScreen.onHide();
            currentScreen.node.active = false;
            nextScreen.node.active = true;
            nextScreen.onShow(data);
            callback?.();
            this.currentScreen = _screen;
        } else {
            console.error("Screen does not exist or is not properly set up.");
        }
    }
}

export { screenManagerInstance };
