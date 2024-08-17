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

export enum GAME_STATE{
    INIT,
    PLAYING,
    GAME_OVER
}

export const SCOOP_HEIGHT = 142.8;

export const ICE_CREAM_LENGTH = 3;


// Global instances 

export {screenManagerInstance as SCREEN} from "../Utils/ScreenManager"