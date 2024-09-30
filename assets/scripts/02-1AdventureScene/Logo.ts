import SoundManager from '../manager/SoundManager'

const { ccclass, property } = cc._decorator

@ccclass
export default class Logo extends cc.Component {
  start() {
    this.schedule(() => {
      this.node.getComponent(cc.Animation).play()
    }, Math.random() * 3 + 3)
  }

  // update (dt) {}

  fail() {
    SoundManager.Instance.playEffectSound('tap')
    this.node.getComponent(cc.RigidBody).type = cc.RigidBodyType.Dynamic

    this.scheduleOnce(() => {
      this.node.destroy()
    }, 3)
  }
}
