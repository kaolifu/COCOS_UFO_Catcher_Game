const {ccclass, property} = cc._decorator;

@ccclass
export default class AdventureManager extends cc.Component {
    // onLoad () {}

    start () {

    }

    // update (dt) {}
    onStartGameBtnClick(){
        cc.director.loadScene("03GameScene");
    }

}
