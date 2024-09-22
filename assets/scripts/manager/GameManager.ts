import CatcherControl from '../catcher/CatcherControl'
import Data from '../data/Data'

const { ccclass, property } = cc._decorator

@ccclass
export default class GameManager extends cc.Component {
  onLoad() {
    cc.director.getPhysicsManager().enabled = true
  }

  start() {
    this.initializeGame()
  }

  // update (dt) {}

  async initializeGame() {
    await Data.initialize()

    cc.find('CatcherControl').getComponent(CatcherControl).changeToMoveXState()
  }
}
