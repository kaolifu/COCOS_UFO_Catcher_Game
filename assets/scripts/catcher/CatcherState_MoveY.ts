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
    this.catcherControl.catcher.getComponent(cc.Animation).play('Catcher_Catch')
  }
}
