import CatcherControl from '../catcher/CatcherControl'
import Data from '../data/Data'
import BallManager from '../manager/BallManager'
import SkillManager from '../manager/SkillManager'
import TimeManager from '../manager/TimeManager'
import UIManager from '../manager/UIManager'
import FSMState from '../utility/FSMState'
import GameControl from './GameControl'

const { ccclass, property } = cc._decorator

@ccclass
export default class GameState_Playing extends FSMState {
  onEnter(): void {
    super.onEnter()

    let um = this.component.node.getComponent(UIManager)
    let bm = this.component.node.getComponent(BallManager)
    let ccontrol = this.component.node.getComponent(CatcherControl)

    ccontrol.initCatcherPosition()
    bm.clearBallsInBox()

    SkillManager.Instance.applyAllSkillEffect()
    console.log(Data.ballDataInThisGame)
    console.log(Data.ballData)

    um.showCountDownUI()
    um.countDownUI.getComponent(cc.Animation).on('finished', () => {
      um.hideCountDownUI()
      bm.createBalls()
      ccontrol.changeToMoveXState()

      um.countDownUI.getComponent(cc.Animation).off('finished')

      TimeManager.Instance.startTimer()
    })
  }
  onUpdate(dt: any): void {
    super.onUpdate(dt)

    this.component.node
      .getComponent(UIManager)
      .updateTimerUI(TimeManager.Instance.getRemainTime())

    if (TimeManager.Instance.getRemainTime() <= 0) {
      TimeManager.Instance.stopTimer()
      this.component.node
        .getComponent(CatcherControl)
        .catcher.getComponent(cc.Animation)
        .stop()
      this.component.node.getComponent(CatcherControl).changeToDisabledState()

      this.component.node.getComponent(UIManager).showTimeOutUI()

      this.component.scheduleOnce(() => {
        this.component.node.getComponent(UIManager).hideTimeOutUI()
        this.component.node.getComponent(GameControl).changeToRoundOverState()
      }, 3)
    }
  }
  onExit(): void {
    super.onExit()
  }
}
