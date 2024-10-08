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

    if (caughtBalls.length > 0) {
      let isBombExist = caughtBalls.some(
        (ball) => ball.getComponent(BallInfo).ballName == 'bombBall'
      )
      if (isBombExist) {
        // 做爆炸处理
        this.playBombWarnAnim(() => {
          let exploreBalls = this.calculateExploreBalls(caughtBalls)
          let shieldBalls = caughtBalls.filter((ball) => {
            return ball.getComponent(BallInfo).ballName == 'shieldBall'
          })
          this.playExploreAnimSquance(0, exploreBalls, shieldBalls, () => {
            let settleBalls = caughtBalls.filter((ball) => {
              return ball.opacity > 0
            })
            let isRarityFruitExist = settleBalls.some(
              (ball) =>
                ball.getComponent(BallInfo).rarity == true &&
                ball.getComponent(BallInfo).type == 'fruit'
            )
            if (isRarityFruitExist) {
              this.uiManager.showFruitsFeverUI()
              this.playFruitsSettleAnimSquance(0, settleBalls, () => {
                this.playSettleAnimSquance(0, settleBalls, () => {
                  this.uiManager.hideFruitsFeverUI()
                  this.uiManager.clearCaughtBallListChildren()
                  this.gameControl.changeToPrepareState()
                })
              })
            } else {
              this.playSettleAnimSquance(0, settleBalls, () => {
                this.uiManager.clearCaughtBallListChildren()
                this.gameControl.changeToPrepareState()
              })
            }
          })
        })
      } else {
        let isRarityFruitExist = caughtBalls.some(
          (ball) =>
            ball.getComponent(BallInfo).rarity == true &&
            ball.getComponent(BallInfo).type == 'fruit'
        )
        if (isRarityFruitExist) {
          this.uiManager.showFruitsFeverUI()
          this.playFruitsSettleAnimSquance(0, caughtBalls, () => {
            this.playSettleAnimSquance(0, caughtBalls, () => {
              this.uiManager.hideFruitsFeverUI()
              this.uiManager.clearCaughtBallListChildren()
              this.gameControl.changeToPrepareState()
            })
          })
        } else {
          this.playSettleAnimSquance(0, caughtBalls, () => {
            this.uiManager.clearCaughtBallListChildren()
            this.gameControl.changeToPrepareState()
          })
        }
        // 做结算处理
        this.playFruitsSettleAnimSquance(0, caughtBalls, () => {
          this.playSettleAnimSquance(0, caughtBalls, () => {
            this.uiManager.clearCaughtBallListChildren()
            this.gameControl.changeToPrepareState()
          })
        })
      }
    } else {
      this.gameControl.changeToPrepareState()
    }
  }
  onUpdate(dt: any): void {
    super.onUpdate(dt)
  }
  onExit(): void {
    super.onExit()
  }
  // playBombAnimSquance(index: number, balls, callback?: Function): void {
  //   // 从数组中找到连续的炸弹
  //   let leftBalls = balls
  //   if (index >= leftBalls.length) {
  //     // callback && callback()
  //     console.log('exit')
  //     return
  //   }
  //   let ball = leftBalls[index]
  //   let prevBall = leftBalls[index - 1]
  //   let nextBall = leftBalls[index + 1]
  //   // console.log(prevBall, nextBall)
  //   if (ball.getComponent(BallInfo).ballName == 'bombBall') {
  //     // console.log(index + 1 + ' 是')
  //     ball.getComponent(cc.Animation).play('Ball_Explode')
  //     prevBall
  //       ? prevBall.getComponent(cc.Animation).play('Ball_Explode2')
  //       : null
  //     nextBall
  //       ? nextBall.getComponent(cc.Animation).play('Ball_Explode2')
  //       : null
  //     this.playBombAnimSquance(index + 1, leftBalls)
  //   } else {
  //     // 本身不是炸弹，则跳过
  //     // console.log(index + 1 + ' 不是')
  //     this.playBombAnimSquance(index + 1, leftBalls)
  //     // }
  //   }
  // }

  // playBombAnim(balls: cc.Node[], callback?: Function): void {
  //   for (let i = 0; i < balls.length; i++) {
  //     if (balls[i].getComponent(BallInfo).ballName == 'bombBall') {
  //       balls[i].getComponent(cc.Animation).play('Ball_Explode')
  //       balls[i].getComponent(cc.Animation).on('finished', () => {
  //         // balls[i].getComponent(cc.Animation).off('finished')
  //         callback && callback()
  //       })
  //       // console.log(i + '是炸弹')
  //       if (
  //         balls[i - 1] &&
  //         balls[i - 1].getComponent(BallInfo).ballName != 'bombBall'
  //       ) {
  //         balls[i - 1].getComponent(cc.Animation).play('Ball_Explode2')
  //         // console.log(i - 1 + '被炸了')
  //       }
  //       if (
  //         balls[i + 1] &&
  //         balls[i + 1].getComponent(BallInfo).ballName != 'bombBall'
  //       ) {
  //         balls[i + 1].getComponent(cc.Animation).play('Ball_Explode2')
  //         // console.log(i + 1 + '被炸了')
  //       }
  //     }
  //   }
  // }

  playExploreAnimSquance(
    index: number,
    balls,
    shields,
    callback?: Function
  ): void {
    let exploreBalls = balls

    if (index >= exploreBalls.length) {
      callback && callback()
      return
    }

    let currentBalls = exploreBalls[index].filter((ball) => ball.opacity > 0)

    let completedAnimations = 0

    let isProtected = false
    if (shields.length > 0) {
      isProtected = true
      shields[0].getComponent(cc.Animation).play('Ball_Shield')
      shields.shift()
    }

    for (let i = 0; i < currentBalls.length; i++) {
      const ball = currentBalls[i]
      const ballInfo = ball.getComponent(BallInfo)
      const animation = ball.getComponent(cc.Animation)

      if (ballInfo.ballName == 'bombBall') {
        animation.play('Ball_Explode')
      } else {
        isProtected ? completedAnimations++ : animation.play('Ball_Explode2')
      }

      this.component.scheduleOnce(() => {
        isProtected ? null : HeartManager.Instance.subCurrentHeart(1)
        isProtected ? null : this.uiManager.playHeartUIShakeAnim()
        isProtected
          ? SoundManager.Instance.playEffectSound('protected', false, 0.5)
          : SoundManager.Instance.playEffectSound('explode', false, 0.2)
      }, 0.8)

      animation.once('finished', () => {
        completedAnimations++

        if (completedAnimations === currentBalls.length) {
          this.uiManager.updateHeartUI()
          if (HeartManager.Instance.CurrentHeart <= 0) {
            this.gameControl.changeToGameOverState()
            return
          }
          this.playExploreAnimSquance(index + 1, balls, shields, callback)
        }
      })
    }
  }

  calculateExploreBalls(balls: cc.Node[]) {
    const exploreBalls = []
    let temp: cc.Node[] = []
    for (let i = 0; i < balls.length; i++) {
      if (balls[i].getComponent(BallInfo).ballName == 'bombBall') {
        if (
          balls[i - 1] &&
          balls[i - 1].getComponent(BallInfo).ballName != 'bombBall'
        ) {
          temp.push(balls[i - 1])
        }
        temp.push(balls[i])
      } else if (temp.length > 0) {
        temp.push(balls[i])
        exploreBalls.push(temp)
        temp = []
      }
    }
    if (temp.length > 0) {
      exploreBalls.push(temp)
    }

    return exploreBalls
  }

  playBombWarnAnim(callback?: Function): void {
    this.uiManager.showBombWarnUI()

    SoundManager.Instance.playEffectSound('warning')

    this.uiManager.bombWarnUI
      .getComponent(cc.Animation)
      .once('finished', () => {
        this.uiManager.hideBombWarnUI()
        callback && callback()
      })
  }

  playFruitsSettleAnimSquance(
    index: number,
    settleBalls: cc.Node[],
    callback?: Function
  ): void {
    if (index >= settleBalls.length) {
      callback && callback()
      return
    }

    let ball = settleBalls[index]
    let ballInfo = ball.getComponent(BallInfo)
    if (ballInfo.type != 'fruit' || ballInfo.rarity == false) {
      this.playFruitsSettleAnimSquance(index + 1, settleBalls, callback)
      return
    }

    let expandBalls = []

    let prevBall = settleBalls[index - 1]
    if (prevBall) {
      let prevBallInfo = prevBall.getComponent(BallInfo)
      if (prevBallInfo.type == 'fruit' && prevBallInfo.rarity == false) {
        prevBallInfo.score *= prevBallInfo.rarityMultiplier
        this.component.node
          .getComponent(UIManager)
          .updateBallScoreUI(prevBall, prevBallInfo.score)
        expandBalls.push(prevBall)
      }
    }
    let nextBall = settleBalls[index + 1]
    if (nextBall) {
      let nextBallInfo = nextBall.getComponent(BallInfo)
      if (nextBallInfo.type == 'fruit' && nextBallInfo.rarity == false) {
        nextBallInfo.score *= nextBallInfo.rarityMultiplier
        nextBallInfo.rarity = true
        this.component.node
          .getComponent(UIManager)
          .updateBallScoreUI(nextBall, nextBallInfo.score)
        expandBalls.push(nextBall)
      }
    }
    if (expandBalls.length == 0) {
      this.playFruitsSettleAnimSquance(index + 1, settleBalls, callback)
      return
    }

    for (let expandBall of expandBalls) {
      expandBall.getComponent(cc.Animation).play('Ball_Expand')
    }
    ball.getComponent(cc.Animation).play('Ball_RarityFruitV2')
    SoundManager.Instance.playEffectSound('expand')

    this.component.scheduleOnce(() => {
      this.playFruitsSettleAnimSquance(index + 1, settleBalls, callback)
    }, 1.5)
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
