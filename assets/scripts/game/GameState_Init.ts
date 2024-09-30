import CoinManager from '../manager/CoinManager'
import HeartManager from '../manager/HeartManager'
import SkillManager from '../manager/SkillManager'
import StageManager from '../manager/StageManager'
import FSMState from '../utility/FSMState'
import GameControl from './GameControl'

const { ccclass, property } = cc._decorator

@ccclass
export default class GameState_Init extends FSMState {
  component: GameControl
  onEnter() {
    super.onEnter()

    this.initData()
  }

  initData() {
    HeartManager.Instance.resetHeart()
    CoinManager.Instance.resetCoin()
    StageManager.Instance.resetStage()
    SkillManager.Instance.resetSkillsInThisGame()

    this.component.changeToPrepareState()
  }
}
