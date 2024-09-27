import BallInfo from '../ball/BallInfo'
import Data from '../data/Data'
import HeartManager from './HeartManager'
import TimeManager from './TimeManager'
import UIManager from './UIManager'

const { ccclass, property } = cc._decorator

@ccclass
export default class BallManager extends cc.Component {
  @property(cc.Prefab)
  ballPrefab: cc.Prefab = null

  caughtBallsThisRound: cc.Node[] = []

  start() {}

  // update (dt) {}

  createBalls() {
    for (let i = 0; i < 90; i++) {
      this.instantiateBall()
    }
  }

  instantiateBall() {
    let ballNode = cc.instantiate(this.ballPrefab)
    ballNode.parent = this.node
    ballNode.x = Math.random() * 900 - 450
    ballNode.y = Math.random() * 450 - 225

    const ballData = Data.ballDataInThisGame
    const amountPercent = ballData.reduce(
      (prev, curr) => prev + curr.percent,
      0
    )
    let randomNum = Math.random() * amountPercent
    for (let i = 0; i < ballData.length; i++) {
      randomNum -= ballData[i].percent
      if (randomNum <= 0) {
        let ballInfo = ballNode.getComponent(BallInfo)

        ballNode.getChildByName('image').getComponent(cc.Sprite).spriteFrame =
          ballData[i].spriteFrame

        ballInfo.ballName = ballData[i].ballName
        ballInfo.type = ballData[i].type
        ballInfo.score = ballData[i].score
        ballInfo.heal = ballData[i].heal
        ballInfo.rarity = false
        if (randomNum > -ballData[i].percent * ballData[i].rarityPercent) {
          ballInfo.rarity = true
          ballInfo.score *= ballData[i].rarityMultiplier
          ballInfo.heal *= ballData[i].rarityMultiplier
          ballNode.scale = 1.5
        }
        ballNode.getChildByName('score').getComponent(cc.RichText).string =
          `<outline color=#000000 width=2>+${ballInfo.score}</outline>`.toString()
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

  resetBallData() {
    Data.ballDataInThisGame = Data.ballData.map((item) => ({ ...item }))
  }

  moveBallToCaughtBallListUI(index: number, callback: () => void) {
    if (index >= this.caughtBallsThisRound.length) {
      this.caughtBallsThisRound = []
      callback()
      return
    }

    let ball = this.caughtBallsThisRound[index]
    let ballInfo = ball.getComponent(BallInfo)

    if (ballInfo.ballName == 'timeBall') {
      this.settleTimeBall(ball)
    } else if (ballInfo.type == 'food') {
      this.settleFoodBall(ball)
      this.settleNormalBall(ball)
    } else {
      this.settleNormalBall(ball)
    }

    this.scheduleOnce(() => {
      this.moveBallToCaughtBallListUI(index + 1, callback)
    }, 0.2)
  }

  settleTimeBall(ball: cc.Node) {
    TimeManager.Instance.addRemainTime(1)
    this.node.getComponent(UIManager).playTimerUIAddTimeAnimation()
    ball.removeFromParent(true)
  }

  settleFoodBall(ball: cc.Node) {
    HeartManager.Instance.addCurrentHeart(ball.getComponent(BallInfo).heal)
    this.node.getComponent(UIManager).updateHeartUI()
    this.node.getComponent(UIManager).playHeartUIHealAnim()
  }

  settleNormalBall(ball: cc.Node) {
    ball.angle = 0
    ball.getComponent(cc.RigidBody).type = cc.RigidBodyType.Static
    if (ball.getComponent(BallInfo).rarity)
      ball.getComponent(cc.Animation).play('Ball_Rarity')

    ball.parent = this.node.getComponent(UIManager).caughtBallList
  }
}
