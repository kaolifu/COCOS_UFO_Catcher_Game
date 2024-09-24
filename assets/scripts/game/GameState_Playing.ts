import CatcherControl from '../catcher/CatcherControl'
import BallManager from '../manager/BallManager'
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
      this.component.node.getComponent(GameControl).changeToRoundOverState()
    }
  }
  onExit(): void {
    super.onExit()
  }
}
