import Data, { ShopItemData } from '../data/Data'

const { ccclass, property } = cc._decorator

@ccclass
export default class ShopItemManager {
  private static _instance: ShopItemManager
  public static get Instance(): ShopItemManager {
    if (this._instance == null) {
      this._instance = new ShopItemManager()
    }
    return this._instance
  }

  private saveData = JSON.parse(cc.sys.localStorage.getItem('items')) || []
  private _holdShopItems: ShopItemData[] = this.saveData?.map((data) => {
    let item = Data.shopItemData.find((item) => item.id == data.id)
    item.currentLv = data.currentLv
    return item
  })

  public addHoldShopItem(id: string) {
    let result = this._holdShopItems.find((data) => data.id == id)
    if (result == null) {
      let item = Data.shopItemData.find((data) => data.id == id)
      item.currentLv++
      this._holdShopItems.push(item)
    } else {
      if (result.currentLv < result.maxLv) {
        result.currentLv++
      } else {
        console.log('已达到最高等级')
      }
    }
    let saveData = this._holdShopItems.map((data) => {
      return {
        id: data.id,
        currentLv: data.currentLv,
      }
    })
    cc.sys.localStorage.setItem('items', JSON.stringify(saveData))
  }
  public get HoldShopItems() {
    return this._holdShopItems
  }

  private currentShopItemId: string = null
  public setCurrentShopItemId(id: string) {
    this.currentShopItemId = id
  }
  public get CurrentShopItemId() {
    return this.currentShopItemId
  }
}
