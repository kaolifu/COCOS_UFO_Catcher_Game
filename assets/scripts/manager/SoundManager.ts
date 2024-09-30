const { ccclass, property } = cc._decorator

@ccclass
export default class SoundManager extends cc.Component {
  private static _instance: SoundManager
  public static get Instance(): SoundManager {
    if (!this._instance) {
      this._instance = new SoundManager()
    }
    return this._instance
  }

  // onLoad () {}

  start() {}

  // update (dt) {}

  playEffectSound(
    name: string,
    loop: boolean = false,
    volume: number = 0.3,
    callback: (id: number) => void = null
  ) {
    cc.resources.load(`sound/${name}`, function (err, res: cc.AudioClip) {
      if (err) {
        cc.error(err)
      } else {
        const id = cc.audioEngine.play(res, loop, volume)
        if (callback) callback(id)
      }
    })
  }
  stopEffectSound(id: number) {
    cc.audioEngine.stopEffect(id)
  }

  playBGM(name: string, volume: number = 0.1) {
    cc.resources.load(`music/${name}`, function (err, res: cc.AudioClip) {
      if (err) {
        cc.error(err)
      } else {
        cc.audioEngine.setMusicVolume(volume)
        cc.audioEngine.playMusic(res, true)
      }
    })
  }

  stopBgm() {
    cc.audioEngine.stopMusic()
  }
}
