import SkillManager from '../manager/SkillManager'
import SoundManager from '../manager/SoundManager'
import UIManager from '../manager/UIManager'
import FSMManager from '../utility/FSMManager'
import GameState_Playing from './GameState_Playing'
import GameState_Prepare from './GameState_Prepare'
import GameState_RoundOver from './GameState_RoundOver'

const { ccclass, property } = cc._decorator

enum GameState {
  PrePare,
  Playing,
  RoundOver,
}
@ccclass
export default class GameControl extends cc.Component {
  fsmManager: FSMManager = null
  // onLoad () {}

  start() {
    this.fsmManager = new FSMManager()

    let prepareState = new GameState_Prepare(
      GameState.PrePare,
      this,
      this.fsmManager
    )
    let playingState = new GameState_Playing(
      GameState.Playing,
      this,
      this.fsmManager
    )
    let roundOverState = new GameState_RoundOver(
      GameState.RoundOver,
      this,
      this.fsmManager
    )
    this.fsmManager.StateList.push(prepareState, playingState, roundOverState)

    // this.fsmManager.changeState(GameState.PrePare)
  }

  update(dt) {
    this.fsmManager.onUpdate(dt)
  }

  changeToPlayingState() {
    this.fsmManager.changeState(GameState.Playing)
  }
  changeToRoundOverState() {
    this.fsmManager.changeState(GameState.RoundOver)
  }
  changeToPrepareState() {
    this.fsmManager.changeState(GameState.PrePare)
  }

  onSkillConfirmBtnClick() {
    SkillManager.Instance.setSkillsInThisGame(
      SkillManager.Instance.CurrentSkillId
    )

    SoundManager.Instance.playEffectSound('credit')

    this.node.getComponent(UIManager).hideSkillSelectUI()
    this.changeToPlayingState()
  }
}
