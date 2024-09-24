import FSMState from '../utility/FSMState'
import CatcherControl from './CatcherControl'

const { ccclass, property } = cc._decorator

@ccclass
export default class CatcherState_MoveY extends FSMState {
  catcherControl: CatcherControl

  onEnter(): void {
    super.onEnter()
    this.catcherControl = this.component as CatcherControl

    this.playCatchAnimation()
  }
  onUpdate(dt: any): void {
    super.onUpdate(dt)
  }
  onExit(): void {
    super.onExit()
  }

  playCatchAnimation() {
    let anim = this.catcherControl.catcher.getComponent(cc.Animation)
    anim.play('Catcher_Catch')
    anim.on('finished', () => {
      this.catcherControl.changeToSettleState()
      anim.off('finished')
    })
  }
}
