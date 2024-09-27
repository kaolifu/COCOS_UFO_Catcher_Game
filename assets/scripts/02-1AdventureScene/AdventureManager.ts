import SoundManager from "../manager/SoundManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class AdventureManager extends cc.Component {
    // onLoad () {}

    start () {
        SoundManager.Instance.playBGM('adventureMenu')
    }

    // update (dt) {}
    onStartGameBtnClick(){
        cc.director.loadScene("03GameScene");
    }

}
