import FSMState from './FSMState'

const { ccclass, property } = cc._decorator

@ccclass
export default class FSMManager {
  StateList: FSMState[] = []
  CurrentStateID: number = -1

  changeState(stateID: number) {
    if (this.CurrentStateID != -1) {
      this.StateList[this.CurrentStateID].onExit()
    }
    this.CurrentStateID = stateID
    this.StateList[this.CurrentStateID].onEnter()
  }

  onUpdate(dt) {
    if (this.CurrentStateID != -1) {
      this.StateList[this.CurrentStateID].onUpdate(dt)
    }
  }
}
