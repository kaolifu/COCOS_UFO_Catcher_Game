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

  roundTime: number = 15
  timerId: number = null
  remainTime: number = this.roundTime

  initTime() {
    this.remainTime = this.roundTime
    this.timerId = null
    this.stopTimer()
    console.log(this.timerId, this.remainTime)
  }

  startTimer() {
    if (this.timerId != null) {
      this.stopTimer() // 确保不会有残留的计时器在运行
    }

    this.timerId = setInterval(() => {
      this.remainTime -= 0.05
      console.log(this.timerId, this.remainTime)
      if (this.remainTime <= 0) {
        this.remainTime = 0
      }
    }, 50)
  }
  stopTimer() {
    if (this.timerId != null) {
      clearInterval(this.timerId) // 使用 clearInterval 代替 clearTimeout
      this.timerId = null
    }
    this.remainTime = this.roundTime // 确保时间为0
    console.log(this.timerId, this.remainTime)
  }
  getRemainTime() {
    return this.remainTime
  }

  addRemainTime(time: number) {
    this.remainTime += time
  }
}
