import { _decorator, Component, instantiate, Prefab, Node, Layout } from 'cc';
import { eventTarget, GAME_EVENTS, GAME_STATE, POPUP } from '../Data/Constants';
import { Scoops } from '../Game/Scoops';
import { Cone } from '../Game/Cone';
import { levels } from '../Data/Levels';
import { POPUPS } from '../Utils/PopUpManager';
const { ccclass, property } = _decorator;

const TOTAL_NUMBERS_OF_CONES = 14;
const SPACING_BTW_CONES = 30

@ccclass('GameManager')
export class GameManager extends Component {


    @property({ type: Prefab })
    scoopPrefab: Prefab = null

    @property({ type: Prefab })
    conePrefab: Prefab = null

    @property({ type: Node })
    coneParents: Node[] = [];

    private coneArray: Cone[] = [];

    private currentState: GAME_STATE = GAME_STATE.INIT;

    private currentLevel: number = 0

    private levelCones: Cone[] = [];

    private selectedIceCream: number = -1;

    private completedConesCount:number = 0;



    protected onLoad(): void {
        this.registerEvents();
    }

    protected start(): void {
        this.setUpCones();
        this.createLevel();
    }

    private registerEvents() {
        eventTarget.on(GAME_EVENTS.ON_CLICKED, this.onClicked, this)
        eventTarget.on(GAME_EVENTS.ON_SCOOP_COMPLETED,this.onCheckForGameOver,this);
    }


    onCheckForGameOver() {
        this.completedConesCount++;
        if(this.completedConesCount >= 3){
            POPUP.showPopup(POPUPS.GAME_OVER);
        }
    }

    onClicked(data) {
        if (this.selectedIceCream < 0) {
            if (this.levelCones[data - 1].scoopLength > 0) {
                this.selectedIceCream = data;
                eventTarget.emit(GAME_EVENTS.ON_SELECTED, data);
            }
            return
        }
        if (this.selectedIceCream == data) {
            this.selectedIceCream = -1;
            this.levelCones[data - 1].removeSelection();
        } else {
            let _scoop = this.levelCones[this.selectedIceCream-1].getTopSoop();
            if (this.levelCones[data - 1].canAdd(_scoop.ScoopType)) {
                // add the ice scoop to respective cone 
                let _scoop = this.levelCones[this.selectedIceCream-1].removeScoop()
                this.levelCones[data-1].addScoop(_scoop);
                this.selectedIceCream = -1;
            } else {
                this.levelCones[this.selectedIceCream-1].removeSelection();
                this.selectedIceCream = data;
                eventTarget.emit(GAME_EVENTS.ON_SELECTED, data);
            }
        }
    }


    /**
     * Set up all the possible cones
     */
    setUpCones() {
        for (let i = 0; i < TOTAL_NUMBERS_OF_CONES; i++) {
            const _cone = instantiate(this.conePrefab);
            _cone.setParent(this.node);
            this.coneArray.push(_cone.getComponent(Cone));
        }
    }



    /**
     * Setting up parents
     */
    setUpParent() {
        this.coneParents.forEach(element => {
            const count = element.children.length;
            element.active = count > 0
            if (element.activeInHierarchy) {
                const elementLeft = TOTAL_NUMBERS_OF_CONES / 2 - count;
                element.getComponent(Layout).spacingX = elementLeft > 0 ? SPACING_BTW_CONES * elementLeft : SPACING_BTW_CONES
            }
        });
    }






    /**
     * Change game state
     * @param _state 
     * @returns 
     */
    changeState(_state: GAME_STATE) {
        if (_state === this.currentState) return
        switch (_state) {
            case GAME_STATE.INIT:
                // init satate work
                break;
            case GAME_STATE.PLAYING:
                // playing state work
                break
            case GAME_STATE.GAME_OVER:
                // game over state work
                break
            default:
                console.error("State not found")
                return
        }
        this.currentState = _state;
    }

    createLevel() {
        let data = levels[this.currentLevel];
        for (let i = 0; i < data.container.length; i++) {
            const _cone = this.coneArray[i];
            _cone.node.setParent(this.coneParents[data.container[i].parentId])
            _cone.node.active = true;
            this.levelCones.push(_cone);
            let intatiatedScoop = [];
            for (const element of data.container[i].initialScoops) {
                let object = instantiate(this.scoopPrefab);
                const _scoop = object.getComponent(Scoops);
                _scoop.initializeScoop(element)
                intatiatedScoop.push(_scoop);
            }
            _cone.getComponent(Cone).initializeIceCream(intatiatedScoop, data.container[i].id);
        }
        this.setUpParent();
    }

    resetAll() {
        this.levelCones.forEach(element => {
            element.node.destroyAllChildren();
            element.node.setParent(this.node);
        })
        this.levelCones = [];
    }
}


