import SoundManager from '../manager/SoundManager'
import UIManager from '../manager/UIManager'
import FSMState from '../utility/FSMState'
import GameControl from './GameControl'

const { ccclass, property } = cc._decorator

@ccclass
export default class GameState_GameOver extends FSMState {
  uiManager: UIManager
  gameControl: GameControl
  onEnter() {
    super.onEnter()
    this.uiManager = this.component.getComponent(UIManager)

    this.uiManager.showGameOverUI()
    SoundManager.Instance.stopBgm()
    SoundManager.Instance.playEffectSound('gameOver')

    this.component.scheduleOnce(() => {
      this.uiManager.showGameOverSettleUI()
      SoundManager.Instance.playEffectSound('settleCoin')
    }, 2)
  }

  onUpdate(dt: any): void {
    super.onUpdate(dt)
  }

  onExit() {
    super.onExit()
  }
}
