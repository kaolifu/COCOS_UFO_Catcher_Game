import FSMManager from '../utility/FSMManager'
import CatcherState_Disabled from './CatcherState_Disabled'
import CatcherState_MoveX from './CatcherState_MoveX'
import CatcherState_MoveY from './CatcherState_MoveY'
import CatcherState_Settle from './CatcherState_Settle'

const { ccclass, property } = cc._decorator

enum CatcherState {
  Disabled,
  MoveX,
  MoveY,
  Settle,
}

@ccclass
export default class CatcherControl extends cc.Component {
  //#region 挂载节点
  @property(cc.Node)
  catcher: cc.Node = null
  @property(cc.Node)
  catcherBar: cc.Node = null
  @property(cc.Node)
  catcherBody: cc.Node = null
  @property(cc.Node)
  catcherForkLeft: cc.Node = null
  @property(cc.Node)
  catcherForkRight: cc.Node = null
  @property(cc.Node)
  handler: cc.Node = null
  @property(cc.Node)
  button: cc.Node = null
  //#endregion

  fsmManager: FSMManager = null

  onLoad(): void {}
  start() {
    this.fsmManager = new FSMManager()

    let disableState = new CatcherState_Disabled(
      CatcherState.Disabled,
      this,
      this.fsmManager
    )
    let moveXState = new CatcherState_MoveX(
      CatcherState.MoveX,
      this,
      this.fsmManager
    )
    let moveYState = new CatcherState_MoveY(
      CatcherState.MoveY,
      this,
      this.fsmManager
    )
    let settleState = new CatcherState_Settle(
      CatcherState.Settle,
      this,
      this.fsmManager
    )

    this.fsmManager.StateList.push(
      disableState,
      moveXState,
      moveYState,
      settleState
    )

    this.fsmManager.changeState(CatcherState.Disabled)
  }

  update(dt) {
    this.fsmManager.onUpdate(dt)
  }

  changeToMoveXState() {
    this.fsmManager.changeState(CatcherState.MoveX)
  }
  changeToMoveYState() {
    this.fsmManager.changeState(CatcherState.MoveY)
  }
  changeToSettleState() {
    this.fsmManager.changeState(CatcherState.Settle)
  }
  changeToDisabledState() {
    this.fsmManager.changeState(CatcherState.Disabled)
  }
}
