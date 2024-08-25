
import { TweenUtils } from "../Utils/TweenUtils";
import { EventTarget } from 'cc';

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
    GAME_OVER
}

export const eventTarget = new EventTarget()

export const GAME_EVENTS = {
    ON_CLICKED: "ON_CLICKED",
    ON_SELECTED:"ON_SELECTED",
    ON_WIN: "ON_WIN",
    ON_LEVEL_COMPLETED: "ON_LEVEL_COMPLETED",
    ON_GAME_START:"ON_GAME_START",
}


export const TWEEN = new TweenUtils();

export const SCOOP_HEIGHT = 142.8;

export const ICE_CREAM_LENGTH = 4;


// Global instances 

export { screenManagerInstance as SCREEN } from "../Utils/ScreenManager"
export { popupManagerInstance as POPUP } from "../Utils/PopUpManager"