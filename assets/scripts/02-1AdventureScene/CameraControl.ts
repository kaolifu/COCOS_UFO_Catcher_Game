const { ccclass, property } = cc._decorator

@ccclass
export default class CameraControl extends cc.Component {
  @property(cc.Camera)
  camera: cc.Camera = null
  // onLoad () {}

  start() {}

  // update (dt) {}

  moveCameraY(y: number, duration: number) {
    let action = cc.moveTo(duration, cc.v2(this.node.x, y))
    this.camera.node.runAction(action)
  }

  setCameraY(y: number) {
    this.camera.node.y = y
  }
}
