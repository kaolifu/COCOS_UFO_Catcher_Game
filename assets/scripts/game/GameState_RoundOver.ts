import BallInfo from '../ball/BallInfo'
import CoinManager from '../manager/CoinManager'
import UIManager from '../manager/UIManager'
import FSMState from '../utility/FSMState'
import GameControl from './GameControl'

const { ccclass, property } = cc._decorator

@ccclass
export default class GameState_RoundOver extends FSMState {
  onEnter(): void {
    super.onEnter()

    let caughtBalls: cc.Node[] =
      this.component.getComponent(UIManager).caughtBallList.children

    if (caughtBalls.length > 0) {
      let isBombExist = caughtBalls.some(
        (ball) => ball.getComponent(BallInfo).ballName == 'bombBall'
      )
      if (isBombExist) {
        // 做爆炸处理
        this.playBombWarnAnim(() => {
          this.playBombAnim(caughtBalls, () => {
            this.playSettleAnimSquance(caughtBalls, () => {
              this.component
                .getComponent(UIManager)
                .clearCaughtBallListChildren()
              this.component.node
                .getComponent(GameControl)
                .changeToPrepareState()
            })
          })
        })
      } else {
        // 做结算处理
        this.playSettleAnimSquance(caughtBalls, () => {
          this.component.getComponent(UIManager).clearCaughtBallListChildren()
          this.component.node.getComponent(GameControl).changeToPrepareState()
        })
      }
    } else {
      this.component.getComponent(GameControl).changeToPrepareState()
    }
  }
  onUpdate(dt: any): void {
    super.onUpdate(dt)
  }
  onExit(): void {
    super.onExit()
  }
  playBombAnimSquance(
    index: number,
    balls: cc.Node[],
    callback?: Function
  ): void {
    // 从数组中找到连续的炸弹
    let leftBalls = balls
    if (index >= leftBalls.length) {
      // callback && callback()
      console.log('exit')
      return
    }
    let ball = leftBalls[index]
    let prevBall = leftBalls[index - 1]
    let nextBall = leftBalls[index + 1]

    // console.log(prevBall, nextBall)
    if (ball.getComponent(BallInfo).ballName == 'bombBall') {
      // console.log(index + 1 + ' 是')
      ball.getComponent(cc.Animation).play('Ball_Explode')
      prevBall
        ? prevBall.getComponent(cc.Animation).play('Ball_Explode2')
        : null
      nextBall
        ? nextBall.getComponent(cc.Animation).play('Ball_Explode2')
        : null
      this.playBombAnimSquance(index + 1, leftBalls)
    } else {
      // 本身不是炸弹，则跳过
      // console.log(index + 1 + ' 不是')
      this.playBombAnimSquance(index + 1, leftBalls)
      // }
    }
  }

  playBombAnim(balls: cc.Node[], callback?: Function): void {
    for (let i = 0; i < balls.length; i++) {
      if (balls[i].getComponent(BallInfo).ballName == 'bombBall') {
        balls[i].getComponent(cc.Animation).play('Ball_Explode')
        balls[i].getComponent(cc.Animation).on('finished', () => {
          balls[i].getComponent(cc.Animation).off('finished')
          callback && callback()
        })
        // console.log(i + '是炸弹')
        if (
          balls[i - 1] &&
          balls[i - 1].getComponent(BallInfo).ballName != 'bombBall'
        ) {
          balls[i - 1].getComponent(cc.Animation).play('Ball_Explode2')
          // console.log(i - 1 + '被炸了')
        }
        if (
          balls[i + 1] &&
          balls[i + 1].getComponent(BallInfo).ballName != 'bombBall'
        ) {
          balls[i + 1].getComponent(cc.Animation).play('Ball_Explode2')
          // console.log(i + 1 + '被炸了')
        }
      }
    }
  }

  playBombWarnAnim(callback?: Function): void {
    this.component.getComponent(UIManager).showBombWarnUI()
    this.component
      .getComponent(UIManager)
      .bombWarnUI.getComponent(cc.Animation)
      .on('finished', () => {
        this.component.getComponent(UIManager).hideBombWarnUI()
        callback && callback()
      })
  }

  playSettleAnimSquance(balls: cc.Node[], callback?: Function): void {
    let leftBalls = balls.filter((ball) => ball.opacity > 0)
    if (leftBalls.length == 0) {
      callback && callback()
      return
    }

    let ball = leftBalls[0]
    ball.getComponent(cc.Animation).play('Ball_Settle')
    CoinManager.Instance.addCoin(ball.getComponent(BallInfo).score)
    this.component
      .getComponent(UIManager)
      .updateCoinUI(CoinManager.Instance.Coin)

    ball.getComponent(cc.Animation).on('finished', () => {
      ball.getComponent(cc.Animation).off('finished')
      this.playSettleAnimSquance(balls, callback)
    })
  }
}
