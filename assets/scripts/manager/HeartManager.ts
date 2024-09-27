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

  private maxHeart = 20
  public get MaxHeart(): number {
    return this.maxHeart
  }
  private currentHeart = 8
  public get CurrentHeart(): number {
    return this.currentHeart
  }

  public subCurrentHeart(damage: number) {
    this.currentHeart -= damage

    if (this.currentHeart < 0) {
      this.currentHeart = 0
    }
  }

  public addCurrentHeart(heal: number) {
    this.currentHeart += heal

    if (this.currentHeart > this.maxHeart) {
      this.currentHeart = this.maxHeart
    }
  }
}
