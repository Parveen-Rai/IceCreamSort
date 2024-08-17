import { _decorator, Component, instantiate, Prefab, Node, Layout } from 'cc';
import { GAME_STATE } from '../Data/Constants';
import { Scoops } from '../Game/Scoops';
import { Cone } from '../Game/Cone';
import { levels } from '../Data/Levels';
const { ccclass, property } = _decorator;

const totalNumbersOfCones = 14;
const SpacingBtwCones = 30

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


    protected start(): void {
        this.setUpCones();
        this.createLevel();
    }


    /**
     * Set up all the possible cones
     */
    setUpCones() {
        for (let i = 0; i < totalNumbersOfCones; i++) {
            let _cone = instantiate(this.conePrefab);
            _cone.setParent(this.node);
            this.coneArray.push(_cone.getComponent(Cone));
        }
    }



    /**
     * Setting up parents
     */
    SetUpParent() {
        this.coneParents.forEach(element => {
            const count = element.children.length;
            element.active = count > 0
            if(element.activeInHierarchy){
                const elementLeft = totalNumbersOfCones/2 - count;
                element.getComponent(Layout).spacingX = elementLeft > 0 ? SpacingBtwCones*elementLeft : SpacingBtwCones
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
            for(const element of data.container[i].initialScoops){
                let _scoop = instantiate(this.scoopPrefab);
                _scoop.getComponent(Scoops).initializeScoop(element)
                _cone.initializeIceCream(_scoop.getComponent(Scoops))
            }
        }
        this.SetUpParent();
    }
}


