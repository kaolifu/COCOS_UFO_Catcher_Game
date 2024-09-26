const { ccclass, property } = cc._decorator

@ccclass
export default class HeartManager {
  private static _instance: HeartManager = null
  public static get Instance(): HeartManager {
    if (this._instance == null) {
      this._instance = new HeartManager()
    }
    return this._instance
  }

  private maxHeart = 4
  public get MaxHeart(): number {
    return this.maxHeart
  }
  private currentHeart = 4
  public get CurrentHeart(): number {
    return this.currentHeart
  }

  public subCurrentHeart() {
    this.currentHeart--
  }
}
