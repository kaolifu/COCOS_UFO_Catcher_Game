import BallInfo from '../ball/BallInfo'
import Data from '../data/Data'

const { ccclass, property } = cc._decorator

@ccclass
export default class BallManager extends cc.Component {
  @property(cc.Prefab)
  ballPrefab: cc.Prefab = null

  caughtBallsThisRound: cc.Node[] = []

  start() {}

  // update (dt) {}

  createBalls() {
    for (let i = 0; i < 70; i++) {
      this.instantiateBall()
    }
  }

  instantiateBall() {
    let ballNode = cc.instantiate(this.ballPrefab)
    ballNode.parent = this.node
    ballNode.x = Math.random() * 900 - 450
    ballNode.y = Math.random() * 450 - 225

    const ballData = Data.ballData
    const amountPercent = ballData.reduce(
      (prev, curr) => prev + curr.percent,
      0
    )
    let randomNum = Math.random() * amountPercent
    for (let i = 0; i < ballData.length; i++) {
      randomNum -= ballData[i].percent
      if (randomNum <= 0) {
        ballNode.getChildByName('image').getComponent(cc.Sprite).spriteFrame =
          ballData[i].spriteFrame
        ballNode.getComponent(BallInfo).ballName = ballData[i].ballName
        ballNode.getComponent(BallInfo).score = ballData[i].score
        ballNode.getComponent(BallInfo).rarity = false
        if (randomNum > -ballData[i].percent * ballData[i].rarityPercent) {
          ballNode.getComponent(BallInfo).rarity = true
          ballNode.getComponent(BallInfo).score *= ballData[i].rarityMultiplier
          ballNode.scale = 1.5
        }
        break
      }
    }
  }

  clearBallsInBox() {
    this.node.removeAllChildren()
  }

  clearCaughtBallsThisRound() {
    this.caughtBallsThisRound = []
  }
}
