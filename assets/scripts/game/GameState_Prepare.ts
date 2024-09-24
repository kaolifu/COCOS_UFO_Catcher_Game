import TimeManager from '../manager/TimeManager'
import UIManager from '../manager/UIManager'
import FSMState from '../utility/FSMState'

const { ccclass, property } = cc._decorator

@ccclass
export default class GameState_Prepare extends FSMState {
  onEnter(): void {
    super.onEnter()

    this.component.getComponent(UIManager).showSkillSelectUI()

    this.component
      .getComponent(UIManager)
      .updateTimerUI(TimeManager.Instance.roundTime)
  }
  onUpdate(dt: any): void {
    super.onUpdate(dt)
  }
  onExit(): void {
    super.onExit()
  }
}
