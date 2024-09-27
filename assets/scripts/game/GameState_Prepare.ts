import CatcherControl from '../catcher/CatcherControl'
import BallManager from '../manager/BallManager'
import CoinManager from '../manager/CoinManager'
import HeartManager from '../manager/HeartManager'
import SkillManager from '../manager/SkillManager'
import StageManager from '../manager/StageManager'
import TimeManager from '../manager/TimeManager'
import UIManager from '../manager/UIManager'
import FSMState from '../utility/FSMState'

const { ccclass, property } = cc._decorator

@ccclass
export default class GameState_Prepare extends FSMState {
  onEnter(): void {
    super.onEnter()
    let uiManager = this.component.getComponent(UIManager)

    this.component.getComponent(CatcherControl).changeToDisabledState()

    uiManager.showSkillSelectUI()

    uiManager.clearSkillList()
    let randomResults = SkillManager.Instance.getThreeRandomSkillIds()
    for (let id of randomResults) {
      uiManager.instantiateSkillUI(id)
    }

    uiManager.updateHeartUI(
      HeartManager.Instance.CurrentHeart,
      HeartManager.Instance.MaxHeart
    )
    uiManager.updateCoinUI(CoinManager.Instance.Coin)

    TimeManager.Instance.initTime()
    uiManager.updateTimerUI(TimeManager.Instance.roundTime)

    StageManager.Instance.NextStage()
    let currentStage = StageManager.Instance.getStage()
    uiManager.updateStageUI(currentStage)

    uiManager.updateCoinCostUI(CoinManager.Instance.CoinCost)

    this.component.getComponent(BallManager).resetBallData()
  }
  onUpdate(dt: any): void {
    super.onUpdate(dt)
  }
  onExit(): void {
    super.onExit()
  }
}
