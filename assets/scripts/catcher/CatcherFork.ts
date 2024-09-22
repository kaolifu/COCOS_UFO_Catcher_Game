const { ccclass, property } = cc._decorator

@ccclass
export default class CatcherFork extends cc.Component {
  isWallDectected: boolean = false

  start() {}

  update(dt) {}

  onBeginContact(
    contact: cc.PhysicsContact,
    self: cc.PhysicsCollider,
    other: cc.PhysicsCollider
  ) {
    if (other.tag == 11 && !this.isWallDectected) {
      this.isWallDectected = true
    }
  }

  onEndContact(
    contact: cc.PhysicsContact,
    self: cc.PhysicsCollider,
    other: cc.PhysicsCollider
  ) {
    if (this.isWallDectected) {
      this.isWallDectected = false
    }
  }
}
