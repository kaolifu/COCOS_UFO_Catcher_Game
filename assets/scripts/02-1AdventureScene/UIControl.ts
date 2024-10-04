import Data from '../data/Data'
import CoinManager from '../manager/CoinManager'
import ShopItemManager from '../manager/ShopItemManager'
import SoundManager from '../manager/SoundManager'
import ShopItemToggle from './ShopItemToggle'

const { ccclass, property } = cc._decorator

@ccclass
export default class UIControl extends cc.Component {
  @property(cc.Prefab)
  shopItem: cc.Prefab = null
  @property(cc.Node)
  shopItemList: cc.Node = null
  @property(cc.Node)
  shopUI: cc.Node = null

  @property(cc.Node)
  totalCoinUI: cc.Node = null

  @property(cc.Node)
  startBtn: cc.Node = null

  @property(cc.Node)
  dialogNormal: cc.Node = null
  @property(cc.Node)
  dialogInShop: cc.Node = null

  currentTab: string = 'skill'
  isShopping: boolean = false

  start() {
    this.isShopping = false
  }

  update(dt) {
    this.startBtnControl()
    this.dialogControl()
  }

  instantiateShopItem() {
    let itemData = Data.shopItemData.filter(
      (item) => item.type === this.currentTab
    )
    for (let i = 0; i < itemData.length; i++) {
      let item = cc.instantiate(this.shopItem)
      item.parent = this.shopItemList

      let icon = item.getChildByName('icon').getComponent(cc.Sprite)
      icon.spriteFrame = itemData[i].icon

      let itemName = item.getChildByName('itemName').getComponent(cc.RichText)
      itemName.string = `<outline color=#000000 width=4>${itemData[i].itemName}</outline>`

      let itemDesc = item.getChildByName('itemDesc').getComponent(cc.RichText)
      itemDesc.string = `<outline color=#000000 width=4>${itemData[i].desc}</outline>`

      let itemPrice = item
        .getChildByName('cost')
        .getChildByName('content')
        .getComponent(cc.RichText)
      itemPrice.string = `<outline color=#000000 width=4>${itemData[i].price}</outline>`

      if (itemData[i].type === 'skill') {
        let currentLv = item
          .getChildByName('currentLv')
          .getChildByName('content')
          .getComponent(cc.RichText)

        let matchingItem = ShopItemManager.Instance.HoldShopItems.find(
          (shopItem) => shopItem.id === itemData[i].id
        )
        let level = matchingItem ? matchingItem.currentLv : 0

        currentLv.string = `<outline color=#000000 width=4>${level}</outline>`
      } else {
        item.getChildByName('currentLv').active = false
      }
      if (itemData[i].currentLv >= itemData[i].maxLv) {
        item.getChildByName('currentLv').active = false
        item.getChildByName('cost').active = false
        item.getChildByName('bought').active = true
      }

      let info = item.getComponent(ShopItemToggle)
      info.id = itemData[i].id
      info.type = itemData[i].type
      info.price = itemData[i].price
      info.desc = itemData[i].desc
      info.itemName = itemData[i].itemName
      info.icon = itemData[i].icon
    }
  }

  clearShopItemList() {
    this.shopItemList.removeAllChildren()
  }

  updateShopItemList() {
    this.shopItemList.children.forEach((item) => {
      let currentLv = item
        .getChildByName('currentLv')
        .getChildByName('content')
        .getComponent(cc.RichText)
      let id = item.getComponent(ShopItemToggle).id
      if (item.getComponent(ShopItemToggle).type === 'skill') {
        let matchingItem = ShopItemManager.Instance.HoldShopItems.find(
          (shopItem) => shopItem.id === id
        )
        let level = matchingItem ? matchingItem.currentLv : 0

        currentLv.string = `<outline color=#000000 width=4>${level}</outline>`
      } else {
        item.getChildByName('currentLv').active = false
      }

      let itemPrice = item
        .getChildByName('cost')
        .getChildByName('content')
        .getComponent(cc.RichText)
      let matchingItemPrice = Data.shopItemData.find((item) => item.id === id)
      itemPrice.string = `<outline color=#000000 width=4>${matchingItemPrice.price}</outline>`

      if (matchingItemPrice.currentLv >= matchingItemPrice.maxLv) {
        item.getChildByName('currentLv').active = false
        item.getChildByName('cost').active = false
        item.getChildByName('bought').active = true
      }
    })
  }

  updateTotalCoinUI() {
    this.totalCoinUI.active = true
    this.totalCoinUI.getChildByName('content').getComponent(cc.Label).string =
      CoinManager.Instance.TotalCoin.toString()
  }

  onShopBtnClick() {
    this.isShopping = !this.isShopping
    this.shopUI.active = !this.shopUI.active
    if (this.shopUI.active) {
      this.clearShopItemList()
      this.instantiateShopItem()
    }
    ShopItemManager.Instance.setCurrentShopItemId('1')

    SoundManager.Instance.playEffectSound('tap')
  }
  onCloseBtnClick() {
    this.isShopping = false
    this.shopUI.active = false
    SoundManager.Instance.playEffectSound('tap')
  }

  onShopTabClick(event: cc.Event) {
    this.currentTab = event.node.name

    this.clearShopItemList()
    this.instantiateShopItem()

    let currentItemId = this.shopItemList
      .getComponent(cc.ToggleContainer)
      .toggleItems.find((item) => item.isChecked === true)
      .getComponent(ShopItemToggle).id
    ShopItemManager.Instance.setCurrentShopItemId(currentItemId)

    SoundManager.Instance.playEffectSound('tap')
  }

  onBuyBtnClick() {
    let id = ShopItemManager.Instance.CurrentShopItemId
    let item = Data.shopItemData.find((item) => item.id === id)
    if (item.currentLv < item.maxLv) {
      CoinManager.Instance.subTotalCoin(item.price)
      ShopItemManager.Instance.addHoldShopItem(id)
      this.updateShopItemList()
      this.updateDialog('感谢购买！')
      this.updateTotalCoinUI()
      SoundManager.Instance.playEffectSound('credit')
    } else if (item.currentLv == item.maxLv) {
      this.updateDialog('已经卖完啦！老板！')
      SoundManager.Instance.playEffectSound('fail')
    }
  }

  startBtnControl() {
    if (this.isShopping) {
      this.startBtn.getComponent(cc.Button).interactable = false
    } else {
      this.startBtn.getComponent(cc.Button).interactable = true
    }
  }

  dialogControl() {
    if (this.isShopping == true) {
      this.dialogNormal.active = false
      this.dialogInShop.active = true
    } else {
      this.dialogNormal.active = true
      this.dialogInShop.active = false
    }
  }

  updateDialog(content: string) {
    this.dialogInShop
      .getChildByName('content')
      .getComponent(cc.RichText).string = content
  }
}
