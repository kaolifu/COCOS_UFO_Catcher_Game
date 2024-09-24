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

  private _coin: number = 0
  public get Coin(): number {
    return this._coin
  }
  public addCoin(coin: number) {
    this._coin += coin
  }
  public subCoin(coin: number) {
    this._coin -= coin
  }
}
