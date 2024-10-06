import BallInfo from '../ball/BallInfo'
import CatcherControl from '../catcher/CatcherControl'
import Data from '../data/Data'
import HeartManager from './HeartManager'
import ShieldManager from './ShieldManager'
import SoundManager from './SoundManager'
import TimeManager from './TimeManager'
import UIManager from './UIManager'

const { ccclass, property } = cc._decorator

@ccclass
export default class BallManager extends cc.Component {
  @property(cc.Prefab)
  ballPrefab: cc.Prefab = null

  caughtBallsThisRound: cc.Node[] = []
  caughtBombBallsThisRound: cc.Node[] = []
  bombBallTimer: number = null
  bombAnimTimer: number = null
  caughtAnimalBallsThisRound: cc.Node[] = []
  animalBallTimer: number = null

  uiManager: UIManager = null

  start() {
    this.uiManager = this.getComponent(UIManager)
  }

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
        ballInfo.rarityMultiplier = ballData[i].rarityMultiplier
        if (randomNum > -ballData[i].percent * ballData[i].rarityPercent) {
          ballInfo.rarity = true
          ballInfo.score *= ballData[i].rarityMultiplier
          ballInfo.heal *= ballData[i].rarityMultiplier
          ballNode.scale = 1.5
        }
        this.uiManager.updateBallScoreUI(ballNode, ballInfo.score)
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

    console.log(ballInfo.ballName)

    if (ballInfo.ballName == 'timeBall') {
      this.settleTimeBall(ball)
    } else if (ballInfo.ballName == 'bombBall') {
      this.settleBombBall(ball)
    } else if (ballInfo.type == 'food') {
      this.settleFoodBall(ball)
      this.settleNormalBall(ball)
    } else if (ballInfo.type == 'animal') {
      this.settleAnimalBall(ball)
      this.settleNormalBall(ball)
    } else if (ballInfo.ballName == 'heartBall') {
      this.settleHeartBall(ball)
    } else if (ballInfo.ballName == 'shieldBall') {
      this.settleShieldBall(ball)
    } else {
      this.settleNormalBall(ball)
    }

    this.scheduleOnce(() => {
      this.moveBallToCaughtBallListUI(index + 1, callback)
    }, 0.2)
  }

  settleBombBall(ball: cc.Node) {
    this.caughtBombBallsThisRound.push(ball)

    this.caughtBombBallsThisRound.forEach((bombBall) => {
      bombBall.active = false
    })
    SoundManager.Instance.playEffectSound('caughtBall')

    if (this.bombBallTimer || this.bombAnimTimer) {
      clearTimeout(this.bombBallTimer)
      clearTimeout(this.bombAnimTimer)
    }

    this.bombBallTimer = setTimeout(() => {
      ShieldManager.Instance.CurrentShield > 0
        ? null
        : this.explodeRandomBalls()

      this.uiManager.showBombUI()
      SoundManager.Instance.playEffectSound('warning*2')
      this.bombBallTimer = null
    }, 1000)

    this.bombAnimTimer = setTimeout(() => {
      if (ShieldManager.Instance.CurrentShield > 0) {
        this.uiManager.playShieldUIAnim(() => {
          ShieldManager.Instance.subShield()
          this.uiManager.updateShieldUI()
        })
        SoundManager.Instance.playEffectSound('protected', false, 1)
        return
      }

      HeartManager.Instance.subCurrentHeart(
        this.caughtBombBallsThisRound.length
      )
      console.log(this.caughtBombBallsThisRound.length)
      this.caughtBombBallsThisRound.forEach((bombBall) => {
        bombBall.destroy()
      })
      this.uiManager.updateHeartUI()
      this.uiManager.playHeartUIShakeAnim()
      SoundManager.Instance.playEffectSound('explode')
      this.caughtBombBallsThisRound = []
      this.bombBallTimer = null
    }, 2000)
  }

  explodeRandomBalls() {
    let leftBalls = this.uiManager.caughtBallList.children.filter(
      (item) => item.opacity > 0
    )
    let explodeCount = Math.min(2, leftBalls.length)
    for (let i = 0; i < explodeCount; i++) {
      let ramdomNum = Math.floor(Math.random() * leftBalls.length)
      leftBalls[ramdomNum].getComponent(cc.Animation).play('Ball_Explode2')

      this.scheduleOnce(() => {
        leftBalls[ramdomNum].destroy()
      }, 2)
    }
  }

  settleTimeBall(ball: cc.Node) {
    TimeManager.Instance.addRemainTime(1)
    this.uiManager.playTimerUIAddTimeAnimation()
    ball.destroy()

    SoundManager.Instance.playEffectSound('caughtTime')
  }

  settleFoodBall(ball: cc.Node) {
    HeartManager.Instance.addCurrentHeart(ball.getComponent(BallInfo).heal)
    this.node.getComponent(UIManager).updateHeartUI()
    this.node.getComponent(UIManager).playHeartUIHealAnim()

    SoundManager.Instance.playEffectSound('heal')
  }

  settleAnimalBall(ball: cc.Node) {
    this.caughtAnimalBallsThisRound.push(ball)
    if (this.animalBallTimer) {
      clearTimeout(this.animalBallTimer)
    }

    this.animalBallTimer = setTimeout(() => {
      this.cloneAnimalBall()
      this.animalBallTimer = null
    }, 1000)
  }

  cloneAnimalBall() {
    this.node.getComponent(CatcherControl).playAnimalAnim()

    this.scheduleOnce(() => {
      SoundManager.Instance.playEffectSound('chicken')

      let animalBalls = this.caughtAnimalBallsThisRound
      for (let ball of animalBalls) {
        let ballClone = cc.instantiate(ball)
        ballClone.parent = this.node

        let originalInfo = ball.getComponent(BallInfo)
        let clonedInfo = ballClone.getComponent(BallInfo)

        if (originalInfo && clonedInfo) {
          clonedInfo.ballName = originalInfo.ballName
          clonedInfo.type = originalInfo.type
          clonedInfo.score = originalInfo.score
          clonedInfo.heal = originalInfo.heal
          clonedInfo.rarity = originalInfo.rarity
          clonedInfo.spirteFrame = originalInfo.spirteFrame // 确保使用正确的属性名
        }

        ballClone.getComponent(cc.RigidBody).type = cc.RigidBodyType.Dynamic
        ballClone.scale = 1
        ballClone.x = -130
        ballClone.y = 300
        ballClone.getComponent(cc.RigidBody).linearVelocity = cc.v2(
          Math.random() * 1000,
          Math.random() * 500
        )
      }
      this.caughtAnimalBallsThisRound = []
    }, 0.5)
  }

  settleHeartBall(ball: cc.Node) {
    HeartManager.Instance.addMaxHeart(1)
    this.uiManager.updateHeartUI()

    ball.destroy()
    SoundManager.Instance.playEffectSound('heartUp')
  }
  settleShieldBall(ball: cc.Node) {
    ShieldManager.Instance.addShield()
    this.uiManager.updateShieldUI()

    ball.destroy()
    SoundManager.Instance.playEffectSound('protected')
  }

  settleNormalBall(ball: cc.Node) {
    ball.angle = 0
    ball.getComponent(cc.RigidBody).type = cc.RigidBodyType.Static
    if (ball.getComponent(BallInfo).rarity)
      ball.getComponent(cc.Animation).play('Ball_Rarity')

    ball.parent = this.uiManager.caughtBallList

    SoundManager.Instance.playEffectSound('caughtBall')
  }
}
