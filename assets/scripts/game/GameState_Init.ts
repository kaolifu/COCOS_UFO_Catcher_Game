import CoinManager from '../manager/CoinManager'
import HeartManager from '../manager/HeartManager'
import ShieldManager from '../manager/ShieldManager'
import SkillManager from '../manager/SkillManager'
import StageManager from '../manager/StageManager'
import TimeManager from '../manager/TimeManager'
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
    ShieldManager.Instance.resetShield()
    CoinManager.Instance.resetCoin()
    StageManager.Instance.resetStage()
    SkillManager.Instance.resetSkillsInThisGame()

    this.component.changeToPrepareState()
  }
}
