import CatcherControl from '../catcher/CatcherControl'
import Data from '../data/Data'
import GameControl from '../game/GameControl'
import BallManager from './BallManager'
import HeartManager from './HeartManager'
import UIManager from './UIManager'

const { ccclass, property } = cc._decorator

@ccclass
export default class GameManager extends cc.Component {
  isStarted = false
  isGameOver = false
  onLoad() {
    cc.director.getPhysicsManager().enabled = true
    cc.director.getCollisionManager().enabled = true
    this.initializeGame()
  }

  start() {}

  update(dt) {
    if (
      HeartManager.Instance.CurrentHeart <= 0 &&
      this.isGameOver == false &&
      this.isStarted == true
    ) {
      this.isGameOver = true
      this.node.getComponent(GameControl).changeToGameOverState()
      this.node.getComponent(CatcherControl).changeToDisabledState()
    }
  }

  async initializeGame() {
    await Data.initialize()

    this.isGameOver = false
    this.isStarted = true
    this.node.getComponent(GameControl).changeToInitState()
  }
}
