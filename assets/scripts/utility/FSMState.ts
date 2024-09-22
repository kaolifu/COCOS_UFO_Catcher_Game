import FSMManager from './FSMManager'

const { ccclass, property } = cc._decorator

@ccclass
export default class FSMState {
  stateID: number
  component: cc.Component
  fsmManager: FSMManager

  constructor(
    stateID: number,
    component: cc.Component,
    fsmManager: FSMManager
  ) {
    this.stateID = stateID
    this.component = component
    this.fsmManager = fsmManager
  }

  onEnter() {}
  onUpdate(dt) {}
  onExit() {}
}
