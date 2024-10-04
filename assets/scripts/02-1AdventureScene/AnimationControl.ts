const { ccclass, property } = cc._decorator

@ccclass
export default class AnimationControl extends cc.Component {
  @property(cc.Node)
  bg: cc.Node = null
  @property(cc.Prefab)
  star: cc.Prefab = null

  // onLoad () {}

  start() {
  }

  // update (dt) {}

  createStar() {
    let star = cc.instantiate(this.star)
    star.parent = this.bg
    star.x = Math.random() * 500 - 100
    star.y = Math.random() * 400 + 800

    this.scheduleOnce(() => {
      star.destroy()
    }, 1)
  }
}
