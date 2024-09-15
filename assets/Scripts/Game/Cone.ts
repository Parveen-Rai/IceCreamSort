import { _decorator, Component, Node, Vec3, ParticleSystem2D } from 'cc';
import { Scoops } from './Scoops';
import { eventTarget, GAME_EVENTS, ICE_CREAM_LENGTH, SCOOP_HEIGHT, SCOOPS, TWEEN } from '../Data/Constants';
const { ccclass, property } = _decorator;

@ccclass('Cone')
export class Cone extends Component {

    @property({ type: Node })
    scoopParent: Node = null;

    @property({ type: ParticleSystem2D })
    finishParticle: ParticleSystem2D

    private scoopArr: Scoops[] = [];

    public get scoopLength(): number {
        return this.scoopArr.length
    }

    private coneId: number = 0;

    private isSelected: boolean = false;

    private canSelected: boolean = true;

    protected onEnable(): void {
        eventTarget.on(GAME_EVENTS.ON_SELECTED, this.onConeSelected, this)
    }


    onConeSelected(data) {
        if (this.coneId != data) return
        if (!this.isSelected) {
            let topScoop = this.scoopArr.length - 1;
            if (this.scoopArr[topScoop]) {
                TWEEN.moveTo(this.scoopArr[topScoop].node, 0.2, new Vec3(0, SCOOP_HEIGHT / 2 * ICE_CREAM_LENGTH, 0),"elasticOut")
            }
            this.isSelected = true
        }
    }

    /**
     * set up at the start of every level
     * @param _scoop 
     * @param _coneId 
     */
    initializeIceCream(_scoop: Scoops[], _coneId: number) {
        _scoop.forEach(element => {
            this.addScoop(element,false);
        })
        this.coneId = _coneId;
    }


    private addToCone(_scoop: Scoops,canAnimate) {
        _scoop.node.parent = this.scoopParent;
        const HALF_SCOOP_HEIGHT = SCOOP_HEIGHT / 2;
        if(canAnimate){
            _scoop.node.position = new Vec3(0, SCOOP_HEIGHT / 2 * ICE_CREAM_LENGTH, 0)
            TWEEN.moveTo(_scoop.node,0.1,new Vec3(0, HALF_SCOOP_HEIGHT * this.scoopArr.length),"quartIn",(()=>{
                TWEEN.squash(_scoop.node,0.1);
            }));
        }else{
            _scoop.node.position = new Vec3(0, HALF_SCOOP_HEIGHT * this.scoopArr.length)
        }
       
        this.scoopArr.push(_scoop);
    }

    /**
     *when scoop is clicked
     * @returns 
     */
    onClick() {
        if (this.canSelected)
            eventTarget.emit(GAME_EVENTS.ON_CLICKED, this.coneId);
    }

    /**
     * Adding new scoop to ice cream
     * @param _scoop 
     */
    addScoop(_scoop: Scoops, canAnimate = true) {
        if (this.scoopLength <= ICE_CREAM_LENGTH) {
            this.addToCone(_scoop,canAnimate)
            if (this.checkWin()) {
                this.finishParticle.resetSystem();
                this.canSelected = false;
                eventTarget.emit(GAME_EVENTS.ON_SCOOP_COMPLETED);
            }
        } else {
            console.error("Invalid node or ice cream length exceeded");
        }
    }

    /**
     * Check for win
     * @returns boolean
     */
    checkWin(): boolean {
        if (this.scoopArr.length === ICE_CREAM_LENGTH){
            const _scoopType = this.scoopArr[0].ScoopType;
            return this.scoopArr.every(scoop => scoop.ScoopType === _scoopType);
        }
        return false
       
    }

    /**
     * remove Scoop from iceCream
     * @returns Scoops
     */
    removeScoop(): Scoops | null {
        if (this.scoopArr.length == 0) return null
        let _scoop: Scoops = this.scoopArr.pop();
        this.isSelected = false;
        if (!_scoop) {
            console.error("there is no scoop in cone")
            return null;
        }
        return _scoop;

    }


    /**
     * Verify if scoop can be added to the array 
     * @param _scoopType 
     * @returns boolean
     */
    canAdd(_scoopType: SCOOPS): boolean {
        if (this.scoopArr.length >= ICE_CREAM_LENGTH) {
            console.warn("Ice cream is full");
            return false;
        }

        if (this.scoopArr.length === 0) {
            return true;
        }

        let topScoop: Scoops = this.scoopArr[this.scoopArr.length - 1];

        if (topScoop.ScoopType === _scoopType) {
            return true;
        } else {
            console.error("Scoop types do not match");
            return false;
        }
    }

    /**
     * Removes the selection if Cone is Selected
     */
    removeSelection() {
        if (this.isSelected) {
            const topMostScoop = this.scoopArr.length - 1;
            TWEEN.moveTo(this.scoopArr[topMostScoop].node, 0.1, new Vec3(0, (SCOOP_HEIGHT / 2) * (this.scoopArr.length - 1)),"linear",(()=>{
                TWEEN.squash(this.scoopArr[topMostScoop].node,0.1)
            }))
            this.isSelected = false;
        }
    }


    /**
     * reset All the containers
     */
    resetContainers() {
        this.scoopParent.destroyAllChildren();
        this.scoopArr = [];
        this.isSelected = false;
        this.canSelected = true;
    }

    /**
     * get the top scoop
     * @returns 
     */
    getTopSoop() {
        if (this.scoopLength > 0) return this.scoopArr[this.scoopLength - 1]
        return null

    }

}


