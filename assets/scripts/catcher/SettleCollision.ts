import BallManager from '../manager/BallManager'
import UIManager from '../manager/UIManager'

const { ccclass, property } = cc._decorator

@ccclass
export default class SettleCollision extends cc.Component {
  gameManager: cc.Node
  onLoad() {
    this.gameManager = cc.find('Canvas/GameManager')
  }
  start() {}
  onCollisionEnter(other: any, self: any) {
    if (other.tag == 99) {
      this.gameManager
        .getComponent(BallManager)
        .caughtBallsThisRound.push(other.node)
    }
  }
}
