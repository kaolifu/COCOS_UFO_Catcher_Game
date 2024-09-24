const {ccclass, property} = cc._decorator;

@ccclass
export default class StartManager extends cc.Component {
    // onLoad () {}

    start () {

    }

    // update (dt) {}

    onAdventureBtnClick(){
        cc.director.loadScene("02-1AdventureScene");
    }
}
