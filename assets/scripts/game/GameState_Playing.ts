import CatcherControl from '../catcher/CatcherControl'
import Data from '../data/Data'
import BallManager from '../manager/BallManager'
import SkillManager from '../manager/SkillManager'
import SoundManager from '../manager/SoundManager'
import TimeManager from '../manager/TimeManager'
import UIManager from '../manager/UIManager'
import FSMState from '../utility/FSMState'
import GameControl from './GameControl'

const { ccclass, property } = cc._decorator

@ccclass
export default class GameState_Playing extends FSMState {
  isPlaying: boolean = true

  onEnter(): void {
    super.onEnter()

    this.isPlaying = true

    let um = this.component.node.getComponent(UIManager)
    let bm = this.component.node.getComponent(BallManager)
    let ccontrol = this.component.node.getComponent(CatcherControl)

    let skillsInThisGame = SkillManager.Instance.SkillsInThisGame
    um.clearSkillInThisGameList()
    for (let skill of skillsInThisGame) {
      um.updateSkillInThisGameList(skill)
    }

    ccontrol.initCatcherPosition()
    bm.clearBallsInBox()

    SkillManager.Instance.applyAllSkillEffect()

    let currentBallData = Data.ballDataInThisGame.filter(
      (ballData) => ballData.percent > 0
    )
    console.log(currentBallData)

    um.showCountDownUI()
    SoundManager.Instance.playEffectSound('ready')
    um.countDownUI.getComponent(cc.Animation).once('finished', () => {

      um.hideCountDownUI()
      bm.createBalls()
      ccontrol.changeToMoveXState()

      TimeManager.Instance.startTimer()
    })
  }
  onUpdate(dt: any): void {
    super.onUpdate(dt)

    this.component.node
      .getComponent(UIManager)
      .updateTimerUI(TimeManager.Instance.getRemainTime())

    if (TimeManager.Instance.getRemainTime() <= 0 && this.isPlaying) {
      this.isPlaying = false

      TimeManager.Instance.stopTimer()
      this.component.node.getComponent(CatcherControl).changeToDisabledState()

      this.component.node.getComponent(UIManager).showTimeOutUI()
      SoundManager.Instance.playEffectSound('timeUp')

      this.component.scheduleOnce(() => {
        this.component.node.getComponent(UIManager).hideTimeOutUI()
        this.component.node.getComponent(GameControl).changeToRoundOverState()
      }, 3)
    }
  }
  onExit(): void {
    super.onExit()
  }
}
