import FSMState from '../utility/FSMState'
import AnimationControl from './AnimationControl'
import CameraControl from './CameraControl'

const { ccclass, property } = cc._decorator

@ccclass
export default class AdvState_StartMenu extends FSMState {
  onEnter(): void {
    super.onEnter()

    this.component.schedule(this.scheduleCallback, Math.random() * 2 + 1)
  }
  onUpdate(dt: any): void {
    super.onUpdate(dt)
  }
  onExit(): void {
    super.onExit()
    this.component.unschedule(this.scheduleCallback)

  }

  scheduleCallback = () => {
    this.component.node.getComponent(AnimationControl).createStar()
  }
}
