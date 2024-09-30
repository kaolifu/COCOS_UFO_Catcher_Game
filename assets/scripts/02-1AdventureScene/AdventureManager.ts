import CoinManager from '../manager/CoinManager'
import SoundManager from '../manager/SoundManager'

const { ccclass, property } = cc._decorator

@ccclass
export default class AdventureManager extends cc.Component {
  @property(cc.Node)
  mask: cc.Node = null

  @property(cc.Node)
  totalCoinUI: cc.Node = null

  onLoad() {
    cc.director.getPhysicsManager().enabled = true
  }

  start() {
    SoundManager.Instance.playBGM('adventureMenu')
    this.updateTotalCoinUI()
  }

  // update (dt) {}
  onStartGameBtnClick() {
    this.mask.active = true
    SoundManager.Instance.playEffectSound('tap')

    this.scheduleOnce(() => {
      SoundManager.Instance.stopBgm()
      cc.director.loadScene('03GameScene')
    }, 0.5)
  }

  updateTotalCoinUI() {
    this.totalCoinUI.getChildByName('content').getComponent(cc.Label).string =
      CoinManager.Instance.TotalCoin.toString()
  }
}
