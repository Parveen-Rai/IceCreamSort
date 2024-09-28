
import { AndroidJsBridge } from "../Utils/AndroidJsBridge";
import { TweenUtils } from "../Utils/TweenUtils";
import { EventTarget } from 'cc';
import { User } from "./User";
import { LocalStorageManager } from "./LocalStorageManager"

export enum SCOOPS {
    RED,
    GREEN,
    ORANGE,
    PEACH,
    PINK,
    PURPLE,
    GREEN_BLUE,
    LIGHT_GREEN,
    LIGHT_ORANGE,
}

export enum GAME_STATE {
    INIT,
    PLAYING,
    GAME_OVER,
    ABANDONED,
    NONE,
}

export const eventTarget = new EventTarget()

export const GAME_EVENTS = {
    ON_CLICKED: "ON_CLICKED",
    ON_SELECTED:"ON_SELECTED",
    ON_WIN: "ON_WIN",
    ON_LEVEL_COMPLETED: "ON_LEVEL_COMPLETED",
    ON_GAME_START:"ON_GAME_START",
    ON_SCOOP_COMPLETED:"ON_SCOOP_COMPLETED",
    ON_GAME_ABANDONED:"ON_GAME_ABANDONED",
    ON_ADD_NEW_CONE:"ON_ADD_NEW_CONE",
    ON_USER_UPDATED:"ON_USER_UPDATED"
}


export const TWEEN = new TweenUtils();

export const ANDROID_JS_BRIDGE = new AndroidJsBridge();

export const SCOOP_HEIGHT = 142.8;

export const ICE_CREAM_LENGTH = 4;

export const USER = new User();

export const LOCAL_STORAGE = new LocalStorageManager();


// Global instances 

export { screenManagerInstance as SCREEN } from "../Utils/ScreenManager"
export { popupManagerInstance as POPUP } from "../Utils/PopUpManager"
