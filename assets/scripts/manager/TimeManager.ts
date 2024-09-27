const { ccclass, property } = cc._decorator

@ccclass
export default class TimeManager {
  private static _instance: TimeManager = null
  public static get Instance(): TimeManager {
    if (this._instance == null) {
      this._instance = new TimeManager()
    }
    return this._instance
  }

  roundTime: number = 5
  timer: number = 0
  timerId: number = 0
  remainTime: number = this.roundTime - this.timer

  initTime() {
    this.remainTime = this.roundTime
  }

  startTimer() {
    // this.timer += 0.05
    // this.remainTime = this.roundTime - this.timer
    this.remainTime -= 0.05
    if (this.remainTime <= 0) this.remainTime = 0
    this.timerId = setTimeout(() => {
      this.startTimer()
    }, 50)
  }
  stopTimer() {
    // this.timer = 0
    // this.remainTime = this.roundTime
    clearTimeout(this.timerId)
  }
  getRemainTime() {
    return this.remainTime
  }

  addRemainTime(time: number) {
    this.remainTime += time
  }
}
