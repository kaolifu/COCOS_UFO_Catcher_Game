import BallInfo from '../ball/BallInfo'
import BallManager from './BallManager'

const { ccclass, property } = cc._decorator

@ccclass
export default class UIManager extends cc.Component {
  @property(cc.Node)
  caughtBallList: cc.Node = null
  @property(cc.Node)
  skillSelectUI: cc.Node = null
  @property(cc.Node)
  timerUI: cc.Node = null
  @property(cc.Node)
  countDownUI: cc.Node = null
  @property(cc.Node)
  bombWarnUI: cc.Node = null
  @property(cc.Node)
  CoinUI: cc.Node = null
  @property(cc.Node)
  TimeOutUI: cc.Node = null

  start() {}

  // update (dt) {}
  moveBallToCaughtBallListUI(index: number, callback: () => void) {
    let ballList = this.node.getComponent(BallManager).caughtBallsThisRound

    if (index >= ballList.length) {
      ballList = []
      callback()
      return
    }

    let ball = ballList[index]
    // ball.getComponent(cc.Animation).play('Ball_MoveToUI')
    // ball.getComponent(cc.Animation).on('finished', () => {
    ball.angle = 0
    ball.getComponent(cc.RigidBody).type = cc.RigidBodyType.Static
    if (ball.getComponent(BallInfo).rarity)
      ball.getComponent(cc.Animation).play('Ball_Rarity')

    ball.parent = this.caughtBallList
    this.scheduleOnce(() => {
      this.moveBallToCaughtBallListUI(index + 1, callback)
    }, 0.2)
    // })
  }

  showSkillSelectUI() {
    this.skillSelectUI.active = true
  }
  hideSkillSelectUI() {
    this.skillSelectUI.active = false
  }

  updateTimerUI(time: number) {
    this.timerUI.children[1].getComponent(cc.Label).string = time
      .toFixed(2)
      .toString()
  }

  showCountDownUI() {
    this.countDownUI.active = true
    this.countDownUI.getComponent(cc.Animation).play()
  }
  hideCountDownUI() {
    this.countDownUI.active = false
    this.countDownUI.getComponent(cc.Animation).stop()
  }
  showBombWarnUI() {
    this.bombWarnUI.active = true
    this.bombWarnUI.getComponent(cc.Animation).play()
  }
  hideBombWarnUI() {
    this.bombWarnUI.active = false
    this.bombWarnUI.getComponent(cc.Animation).stop()
  }

  clearCaughtBallListChildren() {
    this.caughtBallList.removeAllChildren()
  }

  updateCoinUI(coin: number) {
    this.CoinUI.children[1].getComponent(cc.Label).string = coin.toString()
  }

  showTimeOutUI() {
    this.TimeOutUI.active = true
    this.TimeOutUI.getComponent(cc.Animation).play()
  }

  hideTimeOutUI() {
    this.TimeOutUI.active = false
    this.TimeOutUI.getComponent(cc.Animation).stop()
  }
}
