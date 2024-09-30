import CatcherControl from '../catcher/CatcherControl'
import Data from '../data/Data'
import GameControl from '../game/GameControl'
import BallManager from './BallManager'
import HeartManager from './HeartManager'
import UIManager from './UIManager'

const { ccclass, property } = cc._decorator

@ccclass
export default class GameManager extends cc.Component {
  onLoad() {
    cc.director.getPhysicsManager().enabled = true
    cc.director.getCollisionManager().enabled = true
  }

  start() {
    this.initializeGame()
  }

  // update(dt) {}

  async initializeGame() {
    await Data.initialize()

    this.node.getComponent(GameControl).changeToInitState()
  }
}
