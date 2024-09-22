import FSMState from '../utility/FSMState'

const { ccclass, property } = cc._decorator

@ccclass
export default class CatcherState_Disabled extends FSMState {
  onEnter(): void {
    super.onEnter()
  }
  onUpdate(dt: any): void {
    super.onUpdate(dt)
  }
  onExit(): void {
    super.onExit()
  }
}
