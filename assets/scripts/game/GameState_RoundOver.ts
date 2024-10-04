import BallInfo from '../ball/BallInfo'
import CatcherControl from '../catcher/CatcherControl'
import CoinManager from '../manager/CoinManager'
import HeartManager from '../manager/HeartManager'
import SoundManager from '../manager/SoundManager'
import UIManager from '../manager/UIManager'
import FSMState from '../utility/FSMState'
import GameControl from './GameControl'

const { ccclass, property } = cc._decorator

@ccclass
export default class GameState_RoundOver extends FSMState {
  uiManager: UIManager
  gameControl: GameControl
  onEnter(): void {
    super.onEnter()

    this.uiManager = this.component.getComponent(UIManager)
    this.gameControl = this.component.getComponent(GameControl)

    let caughtBalls: cc.Node[] = this.uiManager.caughtBallList.children
    this.stopAllBallsAnim(caughtBalls)

    if (caughtBalls.length == 0) {
      this.gameControl.changeToPrepareState()
      return
    }

    let rarityFruitsBallExists = caughtBalls.some((ball) => {
      let ballInfo = ball.getComponent(BallInfo)
      return ballInfo.type == 'fruit' && ballInfo.rarity == false
    })
    if (rarityFruitsBallExists == false) {
      this.playSettleAnimSquance(0, caughtBalls, () => {
        this.gameControl.changeToPrepareState()
        this.uiManager.clearCaughtBallListChildren()
      })
      return
    }

    this.playFruitsSettleAnimSquance(0, caughtBalls, () => {
      this.playSettleAnimSquance(0, caughtBalls, () => {
        this.gameControl.changeToPrepareState()
        this.uiManager.clearCaughtBallListChildren()
      })
    })
  }

  onUpdate(dt: any): void {
    super.onUpdate(dt)
  }
  onExit(): void {
    super.onExit()
  }

  playFruitsSettleAnimSquance(
    index: number,
    balls: cc.Node[],
    callback?: Function
  ): void {
    console.log(index, balls.length)
    if (index >= balls.length) {
      callback && callback()
      return
    }

    let ball = balls[index]
    let ballInfo = ball.getComponent(BallInfo)
    // 如果当前球的类型不是'fruit'或者稀有度为false，跳过检查
    if (ballInfo.type != 'fruit' || ballInfo.rarity != true) {
      this.playFruitsSettleAnimSquance(index + 1, balls, callback)
      return
    }
    let prevBall, nextBall
    let hasUpdated = false // 标志前后球是否被更新

    if (balls[index - 1]) {
      let prevBallInfo = balls[index - 1].getComponent(BallInfo)
      // 检查前一个球是否为fruit并且稀有度为false
      if (prevBallInfo.type == 'fruit' && prevBallInfo.rarity == false) {
        prevBall = balls[index - 1]
        prevBall.getComponent(cc.Animation).play('Ball_Expand')
        prevBallInfo.score *= prevBallInfo.rarityMultiplier // 更新分数
        prevBallInfo.rarity = true // 更新稀有度
        hasUpdated = true // 标记有更新
      }
    }
    if (balls[index + 1]) {
      let nextBallInfo = balls[index + 1].getComponent(BallInfo)
      // 检查后一个球是否为fruit并且稀有度为false
      if (nextBallInfo.type == 'fruit' && nextBallInfo.rarity == false) {
        nextBall = balls[index + 1]
        nextBall.getComponent(cc.Animation).play('Ball_Expand')
        nextBallInfo.score *= nextBallInfo.rarityMultiplier // 更新分数
        nextBallInfo.rarity = true // 更新稀有度
        hasUpdated = true // 标记有更新
      }
    }
    if (!hasUpdated) {
      this.playFruitsSettleAnimSquance(index + 1, balls, callback)
      return
    }

    ball.getComponent(cc.Animation).play('Ball_RarityFruitV2')
    SoundManager.Instance.playEffectSound('expand2')

    ball.getComponent(cc.Animation).once('finished', () => {
      if (index < balls.length) {
        this.playFruitsSettleAnimSquance(index + 1, balls, callback)
      }
    })
  }

  playSettleAnimSquance(
    index: number,
    balls: cc.Node[],
    callback?: Function
  ): void {
    if (index >= balls.length) {
      return
    }

    let ball = balls[index]
    ball.getComponent(cc.Animation).play('Ball_Settle')
    CoinManager.Instance.addCoin(ball.getComponent(BallInfo).score)
    this.uiManager.updateCoinUI(CoinManager.Instance.Coin)

    SoundManager.Instance.playEffectSound('settleCoin')

    this.component.scheduleOnce(() => {
      if (index < balls.length - 1) {
        this.playSettleAnimSquance(index + 1, balls, callback)
      }
    }, 0.2)

    ball.getComponent(cc.Animation).once('finished', () => {
      if (index === balls.length - 1) {
        callback && callback()
      }
    })
  }

  stopAllBallsAnim(balls: cc.Node[]): void {
    for (let ball of balls) {
      ball.getComponent(cc.Animation).setCurrentTime(0)
      ball.getComponent(cc.Animation).stop()
    }
  }
}
