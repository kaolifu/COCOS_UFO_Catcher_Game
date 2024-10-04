import SoundManager from '../manager/SoundManager'
import FSMState from '../utility/FSMState'
import CameraControl from './CameraControl'
import UIControl from './UIControl'

const { ccclass, property } = cc._decorator

@ccclass
export default class AdvState_ShopMenu extends FSMState {
  onEnter(): void {
    super.onEnter()

    this.component.node.getComponent(CameraControl).setCameraY(50)
    SoundManager.Instance.playBGM('adventureMenu')
    this.component.node.getComponent(UIControl).updateTotalCoinUI()
  }
  onUpdate(dt: any): void {
    super.onUpdate(dt)
  }
  onExit(): void {
    super.onExit()
  }
}
