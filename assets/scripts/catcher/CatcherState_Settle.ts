import BallManager from '../manager/BallManager'
import UIManager from '../manager/UIManager'
import FSMState from '../utility/FSMState'
import CatcherControl from './CatcherControl'

const { ccclass, property } = cc._decorator

@ccclass
export default class CatcherState_Settle extends FSMState {
  catcherControl: CatcherControl = this.component as CatcherControl

  timeoutId: number

  onEnter(): void {
    super.onEnter()

    this.catcherControl.settleCollision.active = true

    this.catcherControl.scheduleOnce(() => {
      this.catcherControl.settleCollision.active = false

      this.catcherControl.node
        .getComponent(UIManager)
        .moveBallToCaughtBallListUI(0, () => {
          this.catcherControl
            .getComponent(BallManager)
            .clearCaughtBallsThisRound()
          this.catcherControl.changeToMoveXState()
        })
    }, 0.1)
  }
  onUpdate(dt: any): void {
    super.onUpdate(dt)
  }
  onExit(): void {
    super.onExit()
  }
}
