const { ccclass, property } = cc._decorator

@ccclass
export default class NewClass extends cc.Component {
  start() {
    let anim = this.getComponent(cc.Animation)
    anim.playAdditive('Adventure_Snail')
    anim.playAdditive('Adventure_SnailMove')
  }

  // update (dt) {}
}
