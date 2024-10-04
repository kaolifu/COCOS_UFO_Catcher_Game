import ShopItemManager from '../manager/ShopItemManager'
import SoundManager from '../manager/SoundManager'

const { ccclass, property } = cc._decorator

@ccclass
export default class ShopItemToggle extends cc.Component {
  id: string
  itemName: string
  type: string
  icon: cc.SpriteFrame
  price: number
  desc: string

  // onLoad () {}

  start() {}

  // update (dt) {}

  onShopItemToggleClick(event: cc.Event.EventTouch) {
    ShopItemManager.Instance.setCurrentShopItemId(this.id)

    SoundManager.Instance.playEffectSound('tap')
  }
}
