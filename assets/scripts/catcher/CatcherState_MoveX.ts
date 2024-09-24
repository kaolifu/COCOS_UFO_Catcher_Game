import Data from '../data/Data'
import FSMState from '../utility/FSMState'
import CatcherControl from './CatcherControl'
import CatcherFork from './CatcherFork'

const { ccclass, property } = cc._decorator

@ccclass
export default class CatcherState_MoveX extends FSMState {
  catcherControl: CatcherControl

  moveParts: cc.Node[] = []
  horizontal: number = 0
  speed: number = 300

  onEnter(): void {
    super.onEnter()

    this.catcherControl = this.component as CatcherControl

    this.addPartsToMove()

    this.listenHanlder()
    this.listenButton()
  }
  onUpdate(dt: any): void {
    super.onUpdate(dt)
    this.checkWallDectected()
    if (this.horizontal != 0) {
      this.moveCatcher(dt)
    }
  }
  onExit(): void {
    super.onExit()

    this.stopAllListen()
  }

  addPartsToMove() {
    this.moveParts = []
    this.moveParts.push(
      this.catcherControl.catcherBar,
      this.catcherControl.catcherBody,
      this.catcherControl.catcherForkLeft,
      this.catcherControl.catcherForkRight,
      this.catcherControl.settleCollision
    )
  }

  listenHanlder() {
    this.catcherControl.handler.on(cc.Node.EventType.TOUCH_MOVE, (e) => {
      let deltaX = e.getDelta().x
      this.horizontal = deltaX > 0 ? 1 : deltaX < 0 ? -1 : 0
    })
    this.catcherControl.handler.on(cc.Node.EventType.TOUCH_END, (e) => {
      this.horizontal = 0
    })
    this.catcherControl.handler.on(cc.Node.EventType.TOUCH_CANCEL, (e) => {
      this.horizontal = 0
    })
  }

  listenButton() {
    this.catcherControl.button.on(cc.Node.EventType.TOUCH_START, () => {
      this.catcherControl.changeToMoveYState()
    })
  }

  checkWallDectected() {
    if (
      this.horizontal > 0 &&
      this.catcherControl.catcherForkRight.getComponent(CatcherFork)
        .isWallDectected
    ) {
      this.horizontal = 0
    } else if (
      this.horizontal < 0 &&
      this.catcherControl.catcherForkLeft.getComponent(CatcherFork)
        .isWallDectected
    ) {
      this.horizontal = 0
    }
  }

  moveCatcher(dt) {
    this.moveParts.forEach((part) => {
      part.x += this.horizontal * this.speed * dt
    })
  }

  stopAllListen() {
    this.catcherControl.handler.off(cc.Node.EventType.TOUCH_MOVE)
    this.catcherControl.handler.off(cc.Node.EventType.TOUCH_END)
    this.catcherControl.handler.off(cc.Node.EventType.TOUCH_CANCEL)
    this.catcherControl.button.off(cc.Node.EventType.TOUCH_START)
  }
}
