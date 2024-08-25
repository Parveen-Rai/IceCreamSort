import { _decorator, Component} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PopupBase')
export abstract class PopupBase extends Component {
   
    onShow(data = null){

    }

    onHide(){
        
    }
}


