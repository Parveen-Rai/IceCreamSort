import { eventTarget, GAME_EVENTS } from "./Constants";

export class User {
    userData:IUSER  = {
        playerId: "",
        coins: 100,
        currentLevel: 0,
        isVIP: false,
        backgroundsBought: []
    }

    public set(data: Partial<IUSER>): void {
        for (const key in data) {
            if (data.hasOwnProperty(key) && this.hasOwnProperty(key)) {
                (this as any)[key] = data[key as keyof IUSER];
            }
        }
        eventTarget.emit(GAME_EVENTS.ON_USER_UPDATED);
    }
}


export interface IUSER {
    playerId: string,
    coins: number,
    currentLevel: number,
    isVIP: boolean,
    backgroundsBought: number[],
}
