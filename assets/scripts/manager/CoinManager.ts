import StageManager from './StageManager'

const { ccclass, property } = cc._decorator

@ccclass
export default class CoinManager {
  private static _instance: CoinManager = null
  public static get Instance(): CoinManager {
    if (this._instance == null) {
      this._instance = new CoinManager()
    }
    return this._instance
  }

  private _coin: number = 50
  public get Coin(): number {
    return this._coin
  }
  public get CoinCost(): number {
    return (
      (StageManager.Instance.StageLg - 1) * 100 +
      (StageManager.Instance.StageSm - 1) * 10
    )
  }
  public addCoin(coin: number) {
    this._coin += coin
  }
  public subCoin(coin: number) {
    this._coin -= coin
  }
  public resetCoin() {
    this._coin = 0
  }

  private _totalCoin: number =
    JSON.parse(cc.sys.localStorage.getItem('totalCoin')) || 0
    
  public get TotalCoin(): number {
    return this._totalCoin
  }
  public addTotalCoin(coin: number) {
    this._totalCoin += coin
    cc.sys.localStorage.setItem('totalCoin', JSON.stringify(this._totalCoin))
  }
  public subTotalCoin(coin: number) {
    this._totalCoin -= coin
    cc.sys.localStorage.setItem('totalCoin', JSON.stringify(this._totalCoin))
  }
}
