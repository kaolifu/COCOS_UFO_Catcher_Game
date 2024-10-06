import SoundManager from '../manager/SoundManager'
import FSMState from '../utility/FSMState'
import CatcherControl from './CatcherControl'

const { ccclass, property } = cc._decorator

@ccclass
export default class CatcherState_MoveY extends FSMState {
  catcherControl: CatcherControl

  anim: cc.Animation
  soundId: number = null

  onEnter(): void {
    super.onEnter()
    this.catcherControl = this.component as CatcherControl
    this.anim = this.catcherControl.catcher.getComponent(cc.Animation)

    this.playCatchAnimation()
  }
  onUpdate(dt: any): void {
    super.onUpdate(dt)
  }
  onExit(): void {
    super.onExit()

    this.anim.stop('Catcher_Catch')
    SoundManager.Instance.stopEffectSound(this.soundId)
  }

  playCatchAnimation() {
    this.anim.play('Catcher_Catch')

    SoundManager.Instance.playEffectSound(
      'catcherMove',
      true,
      0.3,
      (id: number) => {
        this.soundId = id
      }
    )

    this.anim.off('finished') // 先移除任何之前的绑定

    this.anim.once('finished', () => {
      this.catcherControl.changeToSettleState()
      SoundManager.Instance.stopEffectSound(this.soundId)
    })
  }
}
