import { _decorator, Component, Node } from 'cc';
import { Scoops } from './Scoops';
import { ICE_CREAM_LENGTH, SCOOP_HEIGHT, SCOOPS } from '../Data/Constants';
const { ccclass, property } = _decorator;

@ccclass('Cone')
export class Cone extends Component {

    @property({ type: Node })
    scoopParent: Node = null;

    private scoopArr: Scoops[] = [];

    public get scoopLength(): number {
        return this.scoopArr.length
    }


    protected onLoad(): void {
        if (!this.scoopParent) {
            console.error("scoopParent is not assigned!");
        }
    }

   /**
    * set up at the start of every level
    * @param _scoop 
    */
    initializeIceCream(_scoop: Scoops) {
        this.addToCone(_scoop);
    }


    private addToCone(_scoop: Scoops) {
        _scoop.node.parent = this.scoopParent;
        const HALF_SCOOP_HEIGHT = SCOOP_HEIGHT / 2;
        _scoop.node.setPosition(0, HALF_SCOOP_HEIGHT * this.scoopArr.length);
        this.scoopArr.push(_scoop);
    }

    /**
     *when scoop is clicked
     * @returns 
     */
    selectCone() {
        if (this.scoopArr.length == 0) return
        //Scoop is Clicked perform scoop select action
    }

    /**
     * Adding new scoop to ice cream
     * @param _scoop 
     */
    addScoop(_scoop: Scoops) {
        if (this.scoopLength <= ICE_CREAM_LENGTH) {
            this.addToCone(_scoop)
        } else {
            console.error("Invalid node or ice cream length exceeded");
        }
    }

    /**
     * Check for win
     * @returns boolean
     */
    checkWin(): boolean {
        if (this.scoopArr.length === 0) return false;
        const _scoopType = this.scoopArr[0].ScoopType;
        return this.scoopArr.every(scoop => scoop.ScoopType === _scoopType);
    }

    /**
     * remove Scoop from iceCream
     * @returns Scoops
     */
    removeScoop():Scoops|null{
       if(this.scoopArr.length == 0) return null    
       let _scoop:Scoops = this.scoopArr.pop();
       if(_scoop){
        return _scoop
       }else{
        console.error("there is no scoop in cone")
       }
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
     * reset All the containers
     */
    resetContainers(){
        this.node.destroyAllChildren();
        this.scoopArr = [];
    }
    
}


