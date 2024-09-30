import CoinManager from '../manager/CoinManager'
import SkillManager from '../manager/SkillManager'
import SoundManager from '../manager/SoundManager'
import UIManager from '../manager/UIManager'
import FSMManager from '../utility/FSMManager'
import GameState_GameOver from './GameState_GameOver'
import GameState_Init from './GameState_Init'
import GameState_Playing from './GameState_Playing'
import GameState_Prepare from './GameState_Prepare'
import GameState_RoundOver from './GameState_RoundOver'

const { ccclass, property } = cc._decorator

enum GameState {
  Init,
  PrePare,
  Playing,
  RoundOver,
  GameOver,
}
@ccclass
export default class GameControl extends cc.Component {
  fsmManager: FSMManager = null
  // onLoad () {}

  start() {
    this.fsmManager = new FSMManager()

    let InitState = new GameState_Init(GameState.Init, this, this.fsmManager)
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
    let gameOverState = new GameState_GameOver(
      GameState.GameOver,
      this,
      this.fsmManager
    )
    this.fsmManager.StateList.push(
      InitState,
      prepareState,
      playingState,
      roundOverState,
      gameOverState
    )

    // this.fsmManager.changeState(GameState.PrePare)
  }

  update(dt) {
    this.fsmManager.onUpdate(dt)
  }

  changeToInitState() {
    this.fsmManager.changeState(GameState.Init)
  }
  changeToPrepareState() {
    this.fsmManager.changeState(GameState.PrePare)
  }
  changeToPlayingState() {
    this.fsmManager.changeState(GameState.Playing)
  }
  changeToRoundOverState() {
    this.fsmManager.changeState(GameState.RoundOver)
  }
  changeToGameOverState() {
    this.fsmManager.changeState(GameState.GameOver)
  }

  onSkillConfirmBtnClick() {
    SkillManager.Instance.setSkillsInThisGame(
      SkillManager.Instance.CurrentSkillId
    )

    SoundManager.Instance.playEffectSound('credit')

    this.node.getComponent(UIManager).hideSkillSelectUI()
    this.changeToPlayingState()
  }

  onGameOverBtnClick() {
    cc.director.loadScene('02-1AdventureScene')
    SoundManager.Instance.playEffectSound('tap')
    CoinManager.Instance.addTotalCoin(CoinManager.Instance.Coin)
    CoinManager.Instance.resetCoin()
  }
}
