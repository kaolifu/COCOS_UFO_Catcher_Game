const { ccclass, property } = cc._decorator

@ccclass
export default class BallsControl extends cc.Component {
  private static _instance: BallsControl
  public static get Instance(): BallsControl {
    if (!this._instance) {
      this._instance = cc.find('BallsControl').getComponent(BallsControl)
    }
    return this._instance
  }

  @property(cc.Prefab)
  ball: cc.Prefab
  start() {}

  initializeBalls() {
    console.log('init')
    for (let i = 0; i < 10; i++) {
      let newBall = cc.instantiate(this.ball)
      newBall.parent = this.node
      newBall.x = Math.random() * 730 - 365
      newBall.y = Math.random() * 512 - 256
    }
  }
}
