const { ccclass, property } = cc._decorator

@ccclass
export default class ShieldManager {
  private static _instance: ShieldManager = null
  public static get Instance(): ShieldManager {
    if (this._instance == null) {
      this._instance = new ShieldManager()
    }
    return this._instance
  }

  private currentShield: number = 0
  public get CurrentShield(): number {
    return this.currentShield
  }
  public set CurrentShield(value: number) {
    this.currentShield = value
  }
  public addShield() {
    this.currentShield++
  }
  public subShield() {
    this.currentShield--
  }
  public resetShield() {
    this.currentShield = 0
  }
}
