const { ccclass, property } = cc._decorator

@ccclass
export default class StageManager {
  private static _instance: StageManager = null
  public static get Instance(): StageManager {
    if (this._instance == null) {
      this._instance = new StageManager()
    }
    return this._instance
  }

  private stageLg: number = 1
  private stageSm: number = 0

  public getStage(): string {
    return `${this.stageLg} - ${this.stageSm}`
  }

  public NextStage(): void {
    this.stageSm++
    if (this.stageSm > 4) {
      this.stageLg++
      this.stageSm = 1
    }
  }

  public resetStage(): void {
    this.stageLg = 1
    this.stageSm = 0
  }

  public get StageLg(): number {
    return this.stageLg
  }
  public get StageSm(): number {
    return this.stageSm
  }
}
